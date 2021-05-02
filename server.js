const express = require('express');
const fs = require('fs');
const uuid = require('uuid');
// const apiRoutes = require('./routes/apiRoutes');
// const htmlRoutes = require('./routes/htmlRoutes');
// let db = require('./db/db.json');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// // connect to both route files using app.use
// app.use('/api', apiRoutes);
// app.use('/', htmlRoutes);

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
  fs.readFile('./db/db.json', 'utf8', (err, data) => {
    if (err) throw err;
    // console.log(noteBody);
    let notesFile = JSON.parse(data);
    noteBody.id = uuid.v4();
    notesFile.push(noteBody);
    fs.writeFile('./db/db.json', JSON.stringify(notesFile), 'utf8', (err, data) => {
      if (err) throw err;
      return res.json(noteBody);
    })
  })
});

// both of these app.posts have the same outcom
// app.post('/api/notes', (req, res) => {
//   let noteBody = req.body;
//   noteBody.id = uuid.v4();  // use uuid to get a ID for every new note and add it to noteBody
//   db.push(noteBody); 
//   fs.writeFile('./db/db.json', JSON.stringify(db), 'utf8', (err) =>  err ? console.error(err) : console.log('Success!'));
//   return res.json(noteBody);
// });

// delete route
app.delete('/api/notes/:id', (req, res) => {
  fs.readFile('./db/db.json', 'utf8', (err, data) => {
    // console.log(req.params.id);
    let notesFile = JSON.parse(data);
    console.log(notesFile);
    let newFile = notesFile.filter(item => {
      return item.id !== req.params.id
    })
    res.json(newFile);
    fs.writeFile('./db/db.json', JSON.stringify(newFile), 'utf8', (err) => {
      if (err) throw err;
    })
  });
});

// Listener
app.listen(PORT, () => console.log(`Server listening on: http://localhost:${PORT}`));


