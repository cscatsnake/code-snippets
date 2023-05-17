const path = require('path');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');

const port = process.env.PORT || 3000;

const mongoURI =
  'mongodb+srv://njhuemmer:4cukkHd0TFTpUIPf@cluster0.a9u3lfj.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(mongoURI);

const snippetsRouter = require('./routes/snippets');
const accessRouter = require('./routes/access');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/snippets', snippetsRouter);
app.post('/login', accessRouter);
app.post('/signup', accessRouter);

app.use((req, res) => res.status(404).send('Invalid endpoint'));

app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}...`);
});
