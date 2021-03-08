module.exports = app => {
  var google = require("google-it");
  app.get("/google", async (req, res) => {
    res.json(await google({ query: req.query.q }));
  });
  app.get("/google/help", (req, res) => {
    res.send("Googles the q query in the get request given.");
  });
};
