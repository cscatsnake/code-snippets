const User = require('../models/userModel.js');

const snippetsController = {};

// need to grab userId 

snippetsController.getSnippets = (req, res, next) => {
  // this user should be pulled from created user
  const userId = '6463e9cf6972b5c44ab69ff1';

  User.findOne({ _id: userId })
    .then((user) => {
      res.locals.allSnippets = user;
      return next();
    })
    .catch((err) => {
      console.log('Could not find user', err);
      next(err);
    });
};

snippetsController.createSnippet = (req, res, next) => {
  const { title, comments, storedCode, tags, language } = req.body;
  const snippet = { title, comments, storedCode, tags, language };
  const userId = '6463e9cf6972b5c44ab69ff1';
  
  User.findById(userId)
    .then((user) => {
      // Increment the lastId and assign it to the new snippet
      const newSnippetId = user.lastId + 1;
      user.lastId = newSnippetId;

      // Create the new snippet object with the assigned ID
      const newSnippet = {
        id: newSnippetId,
        ...snippet,
      };

      // Push the new snippet to the snippets array
      user.snippets.push(newSnippet);

      const [tags, languages] = recalcTagsAndLang(user);
      user.tags = tags;
      user.languages = languages;

      // Save the updated user document
      return user.save().then((updatedUser) => {
        res.locals.createdSnippet = newSnippet;
        next();
      });
    })
    .catch((error) => {
      console.error('Creating a snippet has failed:', error);
      next(error);
    });
};
 
snippetsController.updateSnippet = (req, res, next) => {
  const { id, title, comments, storedCode, tags, language } = req.body;
  const updatedSnippet = { id, title, comments, storedCode, tags, language };
  const userId = '6463e9cf6972b5c44ab69ff1';

  User.findOneAndUpdate(
    { _id: userId, 'snippets.id': updatedSnippet.id },
    {
      $set: { 'snippets.$': updatedSnippet },
    },
    { new: true }
  )
    .then((updatedUser) => {
      const [tags, languages] = recalcTagsAndLang(updatedUser);
      updatedUser.tags = tags;
      updatedUser.languages = languages;
      return updatedUser.save();
    })
    .then((savedUser) => {
      res.locals.updatedSnippet = updatedSnippet;
      next();
    })
    .catch((err) => {
      console.log('Updating the snippet has failed:', err);
      next(err);
    });
};

snippetsController.deleteSnippet = (req, res, next) => {
  const { id } = req.query;
  const userId = '6463e9cf6972b5c44ab69ff1';

  User.findOne({ _id: userId })
    .then((user) => {
      const deletedSnippet = user.snippets.find((snippet) => {
        return `${snippet.id}` === id;
      });

      // Remove the snippet from the user's snippets array
      user.snippets = user.snippets.filter((snippet) => `${snippet.id}` !== id);

      //recalculate the tags and languages.
      const [tags, languages] = recalcTagsAndLang(user);
      user.tags = tags;
      user.languages = languages;

      // Save the updated user document
      return user.save().then(() => {
        res.locals.deletedSnippet = deletedSnippet;
        next();
      });
    })
    .catch((error) => {
      console.error('Error deleting snippet:', error);
      next(error);
    });
};
// helper function to re-calculate taglist/language counts?
const recalcTagsAndLang = function (user) {
  const tagList = {};
  const languageList = {};

  for (const snippet of user.snippets) {
    if (Array.isArray(snippet.tags)) {
      for (const tag of snippet.tags) {
        if (!tagList[tag]) {
          tagList[tag] = [];
        }
        tagList[tag].push(snippet);
      }

      if (!languageList[snippet.language]) {
        languageList[snippet.language] = [];
      }
      languageList[snippet.language].push(snippet);
    }
  }
  //return something here.
  return [tagList, languageList];
};

module.exports = snippetsController;
