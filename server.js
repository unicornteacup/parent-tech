// load .env data into process.env
require('dotenv').config();

// Web server config
const PORT       = process.env.PORT || 8080;
const ENV        = process.env.ENV || "development";
const express    = require("express");
const bodyParser = require("body-parser");
const sass       = require("node-sass-middleware");
const app        = express();
const morgan     = require('morgan');

// PG database client/connection setup
const { Pool } = require('pg');
const dbParams = require('./lib/db.js');
const db = new Pool(dbParams);
db.connect();

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const companiesRoutes = require("./routes/companies");
const { Template } = require('ejs');
// const widgetsRoutes = require("./routes/widgets");

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
// app.use("/companies", companiesRoutes(db));
// app.use("/api/widgets", widgetsRoutes(db));
app.use( '/public', express.static( 'public' ) );
// Note: mount other resources here, using the same pattern above


// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).
app.get("/", (req, res) => {
  res.render("home");
});

app.get("/about", (req, res) => {
  console.log("getting about")
  res.render("about");
});

app.get("/directory", (req, res) => {
  console.log("getting directory")
  res.render("directory");
});

app.get("/joinus", (req, res) => {
  console.log("join us")
  res.render("joinus");
});

// app.get("/meetus", (req, res) => {
//   console.log("meet us")
//   res.render("meetus");
// });

app.get("/meetus", (req, res) => {
  db.query(`SELECT * FROM companies;`)
    .then(result => {
      const templateVars = {
        company : result.rows
      }
      console.log("companies=" + templateVars)
      // res.json({ companies });
      res.render("meetus", templateVars)
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
