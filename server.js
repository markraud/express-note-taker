const express = require('express');
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');
const fs = require('fs');
let db = require('./db/db.json');

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
app.get('/', (req, res) => res.sendFile(path.join(__dirname, '/index.html')));
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, './public/notes.html')));

  // api Routes
app.get('/api/notes', (req, res) => res.sendFile(path.join(__dirname, './db/db.json')));

app.get('*', (req, res) => res.sendFile(path.join(__dirname, './public/index.html')));

app.post('/api/notes', (req, res) => {
  db.push(req.body);
  console.log(db);
  // fs.writeFile(db, file, (err) =>  err ? console.error(err) : console.log('Success!'))
});

// Listener
app.listen(PORT, () => console.log(`Server listening on: http://localhost:${PORT}`));


