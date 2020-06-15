// need to require express so the front end and back end can work together
const express = require("express");

//requiring path for filename paths
const path = require("path");

//requiring fs to read and write to files
const fs = require("fs");

//setting up express server and port to listen on
const app = express();
const port = 8080;

//const for path to the main directory to make path shorter and quicker
const mainDir = path.join(__dirname, "/public");

//Empty array for notes
let notes = [];

//Using the express app middleware to parse the data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

//setting up routes
//route to notes page
app.get("/notes", (req, res) => {
  res.sendFile(path.join(mainDir, "notes.html"));
});

app.get("/api/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/db/db.json"));
});

app.get("/api/notes/:id", (req, res) => {
  let savedNote = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
  res.json(savedNote[Number(req.params.id)]);
});

app.get("*", (req, res) => {
  res.sendFile(path.join(mainDir, "index.html"));
});

//functions for writing the note to the json file
