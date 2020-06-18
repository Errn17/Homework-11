// need to require express so the front end and back end can work together
const express = require("express");

//requiring path for filename paths
const path = require("path");

//requiring fs to read and write to files
const fs = require("fs");

//setting up express server and port to listen on
const app = express();
const PORT = process.env.PORT || 8080;

//test
let savedNote = [];

//const for path to the main directory to make path shorter and quicker
const mainDir = path.join(__dirname, "/public");

//Using the express app middleware to parse the data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

//setting up routes
app.get("/", (req, res) => {
  res.json(path.join(mainDir, "index.html"));
});
//route to notes page using the GET method
app.get("/notes", (req, res) => {
  res.sendFile(path.join(mainDir, "notes.html"));
});

//route to the json note file
app.get("/api/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/db/db.json"));
});

//route to give each note a unique id
app.get("/api/notes/:id", (req, res) => {
  let savedNote = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
  res.json(savedNote[Number(req.params.id)]);
});

//route to the get started page
app.get("*", (req, res) => {
  res.sendFile(path.join(mainDir, "index.html"));
});

//function for writing and saving the note to the json file, using the POST method
app.post("/api/notes", (req, res) => {
  savedNote = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
  let newNote = req.body;
  let finishNote = savedNote.length.toString();
  newNote.id = finishNote;
  savedNote.push(newNote);

  fs.writeFileSync("./db/db.json", JSON.stringify(savedNote));
  console.log("New note has been saved. Note: ", newNote);
  res.json(savedNote);
});

//function for deleting notes using the DELETE method
app.delete("/api/notes/:id", (req, res) => {
  savedNote = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
  let noteID = req.params.id;
  let newID = 0;
  console.log(`Note has been deleted with ID ${noteID}`);
  savedNote = savedNote.filter((currNote) => {
    return currNote.id != noteID;
  });
  for (currNote of savedNote) {
    currNote.id = newID.toString();
    newID++;
  }

  fs.writeFileSync("./db/db.json", JSON.stringify(savedNote));
  res.json(savedNote);
});

//listening for port
app.listen(PORT, () => {
  console.log(`Listening on PORT http://localhost:${PORT}`);
});
