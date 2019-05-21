// Dependencies
// =========================================

var express = require("express");
var path = require("path");


// Setup Express App
var app = express();
var PORT = 3000;

app.use(express.urlencoded({ extended: true}));
app.use(express.json());

require('./app/routing/apiRoutes.js');
require('./app/routing/htmlRoutes');




// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
  