const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
app.use(cors());

const dBURI = 'mongodb+srv://george:pRUK5z7wuFRSoxJ1@hiraku.hgijy.mongodb.net/hirakuskies?retryWrites=true&w=majority';

mongoose.connect(dBURI)
  .then((result) => app.listen(5000))
  .catch((err) => console.error('MongoDB connection error:', err));

// Define the model for the existing collection without a schema
const String = mongoose.model('String', new mongoose.Schema({}, { strict: false }), 'string');

app.get('/string', (req, res) => {
  const newString = new String({
    text: 'This is a blog post'
  });
  newString.save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => { console.log(err); });
});

app.get('/allblogs', (req, res) => {
  String.find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => { console.log(err); });
});

app.use('/', (req, res) => {
  res.send('Server is up and running');
});
