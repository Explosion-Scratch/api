module.exports = app => {
  var showdown = require("showdown"),
    converter = new showdown.Converter();
  var TurndownService = require("turndown");
  var td = new TurndownService();

  app.get("/markdown/help", (req, res) => {
    res.send(
      "Converts markdown to html or html to markdown, accepts POST and GET requests.<br>Params:<br><br>'q' or 'text': The html or markdown to convert.<br>to: Either 'md' or 'html', to convert (defaults to 'html' if unspecified)"
    );
  });
  app.get("/markdown", (req, res) => {
    if (!req.query.q) {
      res.json("Error! No text to convert!");
      res.status(400);
      return;
    }
    let to = req.query.to || "html";
    if (!/(?:html|md)/.test(to)) {
      res.json("Error! Invalid to format");
      res.status(400);
      return;
    }
    res.json(
      to === "md" ? td.turndown(req.query.q) : converter.makeHtml(req.query.q)
    );
  });
  app.post("/markdown", (req, res) => {
    if (!(req.body.q || req.body.text)) {
      res.json("Error! No text to convert!");
      res.status(400);
      return;
    }
    let to = req.body.to || "html";
    if (!/(?:html|md)/.test(to)) {
      res.json("Error! Invalid to format");
      res.status(400);
      return;
    }
    res.json(
      to === "md"
        ? td.turndown(req.body.q || req.body.text)
        : converter.makeHtml(req.body.q || req.body.text)
    );
  });
};
