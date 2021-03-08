const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const trycatch = require('trycatch');
const app = express();

app.use(cors());

app.use(function(req, res, next){
   trycatch(function(){
           app.router(req, res, next);
       }, function(er){
					 res.send("Internal server errror")
           res.sendStatus(500);
       });
});
app.set("json spaces", 2);
app.use(bodyParser.json({strict: false, type: "*/*"}));

console.log = () => {};

app.get("/", (req, res) => {
	throw new Error("Test")
  res.send(
    "API list (use '/apiname/help' to get info regarding a specific one):<br><br>translate: Translate text.<br>google: Google search text and get a JSON response.<br>emoji: Emojify strings that contain stuff like ':heart:'. Supports multiple endpoints<br>beautify: Beautify code using prettier.<br>uuid: Generate uuids in bulk (up to 5000 a request)<br>markdown: Convert html or markdown to markdown or html.<br>randexp: Generate a string that matches a regular expression.<br>image-search: Searches google images for a query, also supports direct linking to the 1st search result."
  );
});
require("./google.js")(app);
require("./translate.js")(app);
require("./emoji.js")(app);
require("./beautify.js")(app);
require("./uuid.js")(app);
require("./markdown.js")(app);
require("./randexp.js")(app);
require("./image-search.js")(app);
require("./dictionary.js")(app);
require("./autocomplete.js")(app);
require("./diff.js")(app);

app.listen(3000, () => {
  console.info("server started");
});
