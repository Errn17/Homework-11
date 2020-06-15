// need to require express so the front end and back end can work together
const express = require("express");

//requiring path for filename paths
const path = require("path");

//requiring fs to read and write to files
const fs = require("fs");

//setting up express server and port to listen on
const app = express();
const port = 8080;

//Empty array for notes
let notes = [];

//Using the express app middleware to parse the data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
