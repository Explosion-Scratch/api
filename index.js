const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
app.use(cors());
app.options('*', cors())
// You're welcome
/* const rateLimit = require("express-rate-limit");
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
	message: "To many requests, only 100 requests every 15 minutes"
});

app.use(limiter); */

app.get("/error", (req, res) => {
	throw new Error("This is a test error! =D")
})

app.set("json spaces", 2);
app.use(bodyParser.json({strict: false, type: "*/*"}));
app.use((req, res, next) => {
	var colors = require('colors');
	let body = {...req.body, ...req.query, ...req.params}
	req._ = body;
	console.log(`${req.method.toUpperCase().orange} ${req.path.blue}`)
	next();
})
console.log = () => {};

app.get("/", (req, res) => {
  res.send(
    "API list (use '/apiname/help' to get info regarding a specific one):<br><br>translate: Translate text.<br>google: Google search text and get a JSON response.<br>emoji: Emojify strings that contain stuff like ':heart:'. Supports multiple endpoints<br>beautify: Beautify code using prettier.<br>uuid: Generate uuids in bulk (up to 5000 a request)<br>markdown: Convert html or markdown to markdown or html.<br>randexp: Generate a string that matches a regular expression.<br>image-search: Searches google images for a query, also supports direct linking to the 1st search result.<br>dictionary: Searches for a word in the dictionary.<br>autocomplete: Autocompletes the 'q' param using google autocomplete engine.<br>diff: Calculates the difference between the 'one' and 'two' query strings.<br>link-preview: Gets information about a link.<br>follow-redirect: Follows redirects that req.query.q redirects to.<br>news-search: Searches news in New York Times.<br>ip: Gets information about the given IP or the sender's ip.<br>natural: Singularizes/plauralizes a word<br>"
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
require("./link-preview.js")(app);
require("./follow-redirect.js")(app);
require("./quick-answer.js")(app);
require("./news-search.js")(app);
require("./ip.js")(app);
require("./natural.js")(app);
require("./sound.js")(app);

app.listen(3000, () => {
  console.info("Port 3000 started.");
});
app.listen(5000, () => {
  console.info("Port 5000 started.");
});
process.on('unhandledRejection', error => {
  // Will print "unhandledRejection err is not defined"
  console.info('unhandledRejection', error.message);
});