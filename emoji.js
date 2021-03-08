module.exports = app => {
  var emoji = require("node-emoji");
  app.get("/emoji/help", (req, res) => {
    res.send(
      "'Emojifies' a string given through the 'q' query. <br><br>Paths:<br>/emoji: Emojify a string, e.g. transform ':heart:' into '❤️'.<br>/emoji/strip: Strips all the emojis from a string.<br>/emoji/unemojify: Replaces '❤️' with ':heart:' in a given string. <br>/emoji/search: Searches for emojis using the string given."
    );
  });
  app.get("/emoji", (req, res) => {
    res.json(emoji.emojify(req.query.q));
  });
  app.get("/emoji/strip", (req, res) => {
    res.json(emoji.strip(req.query.q));
  });
  app.get("/emoji/unemojify", (req, res) => {
    res.json(emoji.unemojify(req.query.q));
  });
  app.get("/emoji/search", (req, res) => {
    res.json(emoji.search(req.query.q));
  });
};
