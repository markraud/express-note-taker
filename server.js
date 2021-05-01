const express = require('express');
// const apiRoutes = require('./routes/apiRoutes');
// const htmlRoutes = require('./routes/htmlRoutes');
const fs = require('fs');
let db = require('./db/db.json');
const uuid = require('uuid');

const app = express();
const PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// // connect to both route files using app.use
// app.use('/api', apiRoutes);
// app.use('/', htmlRoutes);

const path = require('path');

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Routes

// api Route
app.get('/api/notes', (req, res) => res.sendFile(path.join(__dirname, './db/db.json')));

// html routes 
app.get('/', (req, res) => res.sendFile(path.join(__dirname, '/index.html')));
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, './public/notes.html')));
app.get('*', (req, res) => res.sendFile(path.join(__dirname, './public/index.html')));

//post to saves note into db.json
app.post('/api/notes', (req, res) => {
  let noteBody = req.body;
  noteBody.id = uuid.v4();  // use uuid to get a ID for every new note and add it to noteBody
  db.push(noteBody); 
  fs.writeFile('./db/db.json', JSON.stringify(db), 'utf8', (err) =>  err ? console.error(err) : console.log('Success!'));
  return res.json(noteBody);
});

// put app.delete here

// Listener
app.listen(PORT, () => console.log(`Server listening on: http://localhost:${PORT}`));


