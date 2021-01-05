const express = require("express");
const app = express();
const { v4: uuidv4 } = require("uuid");

let dbJSON = require("./db/db.json");

PORT = process.env.PORT || 3004;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const fs = require("fs");
const path = require("path");

// const note = {...req.body, id: uuidv4()}
//html routes

app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

//api routes
app.get("/api/notes", (req, res) => {
  console.log(dbJSON);
  res.json(dbJSON);
});

app.post("/api/notes", (req, res) => {
  // Validate request body
  if (!req.body.title) {
    return res.json({ error: "Missing required title" });
  }

  const note = { ...req.body, id: uuidv4() };

  dbJSON.push(note);

  fs.writeFile(
    path.join(__dirname, "./db/db.json"),
    JSON.stringify(dbJSON),
    (err) => {
      if (err) {
        return res.json({ error: "Error writing to file" });
      }

      return res.json(note);
    }
  );
});

app.delete("/api/notes/:id", (req, res) => {
  const id = req.params.id;

  dbJSON = dbJSON.filter((note) => note.id !== id);
  fs.writeFile(
    path.join(__dirname, "./db/db.json"),
    JSON.stringify(dbJSON),
    (err) => {
      if (err) {
        return res.json({ error: "Error writing to file" });
      }

      res.sendStatus(200);
    }
  );
});

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "/public" + "/index.html"));
});

app.listen(PORT, () => console.log("http://localhost:" + PORT));
