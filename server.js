// load .env data into process.env
require("dotenv").config();

// Web server config
const PORT = process.env.PORT || 8080;
const sassMiddleware = require("./lib/sass-middleware");
const express = require("express");
const app = express();
const morgan = require("morgan");
const cookieParser = require('cookie-parser');
const bodyParser = require("body-parser");

// Set Cookie Parser
app.use(cookieParser());
// Set bodyParser
app.use(bodyParser.urlencoded({ extended: true }));



const db = require('./db/database');

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan("dev"));

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.use(
  "/styles",
  sassMiddleware({
    source: __dirname + "/styles",
    destination: __dirname + "/public/styles",
    isSass: false, // false => scss, true => sass
  })
);

app.use(express.static("public"));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const usersRoutes = require("./routes/users");
const widgetsRoutes = require("./routes/widgets");
const wineRoutes = require('./routes/wineRoutes/wineRoutes');

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use("", usersRoutes(db));
app.use("", wineRoutes(db));
// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).


app.get("/", (req, res) => {
  if (!req.cookies.username) {
    res.cookie('userRole', false);
    res.cookie('username', 'Guest');
  }

  console.log(req.cookies.username);
  console.log(req.cookies.userRole);
  const templateVars = {
    user: req.cookies.username,
    userRole: req.cookies.admin
  };
  res.render("index", templateVars);
});



// To check if user is login
// app.get("/", (req, res) => {
//   console.log('REQ.QUERY:', req.query);
//   // console.log(req.cookies.user);
//   if (req.cookies.username) {
//     db.getUsers(req.cookies.username)
//       .then((user) => {
//         const params = {
//           user: req.cookies.username || 'Guest',
//         };
//         res.render('index', params);
//       })
//       .catch((e) => console.error(e));
//   } else {
//     const params  = {
//       name: 'Guest'
//     };
//     res.render('index', params);
//   }
// });


app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
