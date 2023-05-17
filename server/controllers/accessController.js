const bcrypt = require('bcrypt');
const User = require('../models/userModel.js');

const saltRounds = 10;

const accessController = {};

accessController.createUser = async (req, res, next) => {
  console.log('----- INSIDE userController.createUser -----');
  const { username, password } = req.body;
  if (!username || !password)
    return next({
      log: 'Missing username or password in input field',
      status: 400,
      message: { err: 'An error occurred' },
    });
  
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password,salt);
    const newUser = new User.create({ username, password: hashedPassword });
    const user = await newUser.save();
    res.locals.user = user._id;
    return next();
  } catch (err) {
    return next({
      log: 'Error occurred in creating a user inside db.',
      status: 500,
      message: { err: 'An error occurred' },
    });
  }
};

accessController.verifyUser = async (req, res, next) => {
  console.log('----- INSIDE userController.verifyUser -----');
  const { username, password } = req.body;
  if (!username || !password)
    return next({
      log: 'Missing username or password in the input field',
      status: 400,
      message: { err: 'An error occurred' },
    });

  try {
    const data = User.findOne({username});
    if (data){
      const result = await bcrypt.compare(password, data.password);
      if (result) {
        res.locals.user = data._id;
        return next();
      }
    }  
  } catch (err) {
    return next({
      log: 'Error occurred in verifying a user inside db.',
      status: 500,
      message: { err: 'An error occurred' },
    });
  }
};


module.exports = accessController;