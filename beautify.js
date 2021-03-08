module.exports = app => {
  const prettier = require("prettier");
  app.get("/beautify", (req, res) => {
    res.json(prettier.format(req.query.q));
  });
  app.get("/beautify/help", (req, res) => {
    res.send(
      "A GET request simply beautifies the code given in the 'q' query using prettier's default options and parser, a POST request uses the options JSON key to apply options. Returns the string of beautified code."
    );
  });
  app.post("/beautify", (req, res) => {
    res.json(prettier.format(req.body.q, req.body.options));
  });
};
