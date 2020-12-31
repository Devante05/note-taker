const express = require('express')
const app = express ();
PORT = process.env.PORT || 3004

app.use(express.static("public"));
app.use(express.urlencoded({extended: true}));

const fs = require('fs');
const path = require('path');
DB_PATH = path.join(__dirname, './Develop/db/db.json')

const setDB = new_db => fs.writeFileSync( DB_PATH , JSON.stringify( new_db ));
const getDB = () => JSON.parse(fs.readFileSync(DB_PATH, 'utf8'));

