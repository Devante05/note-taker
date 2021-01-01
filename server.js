const express = require('express')
const app = express ();
PORT = process.env.PORT || 3004

app.use(express.static("public"));
app.use(express.urlencoded({extended: true}));
app.use(express.json());


const fs = require('fs');
const path = require('path');
const DB_PATH = path.join(__dirname, './Develop/db/db.json')

const setDB = new_db => fs.writeFileSync( DB_PATH , JSON.stringify( new_db ));
const getDB = () => JSON.parse(fs.readFileSync(DB_PATH, 'utf8'));




app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "../Develop/public/notes.html"));
  });

  app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "../Develop/public/index.html"));
  });

  
  
  
var notesArr = require("./db/db.json");
  
app.post("/api/notes", function(req, res) {
    const db = getDB();

    if (notesArr.length <= 0) {
      notesArr.push(req.body.note);
      res.json(db);
    }})


// app.post("/api/notes", (req, res)) => {
//       notes.push(req.body);
//       res.json(true);
// }


app.listen(PORT, () => console.log("http://localhost:" + PORT));
