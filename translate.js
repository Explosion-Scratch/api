module.exports = app => {
  const tr = require("googletrans").default;
  app.get("/translate", async (req, res) => {
    let options = {};
    options = req.query;
    res.json(await tr(req.query.q, options));
  });
  app.get("/translate/help", (req, res) => {
    res.send(
      "Translation API. Get /translate uses ?q= as the text to translate, and other query params as options. Accepts:<br><br> 'to': The language to translate to, defaults to english.<br> 'from': The language to translate from.<br> 'tld': The translate domain name, e.g. if this was 'co.jp' it would use 'translate.google.co.jp'.<br><br> A POST request takes JSON (stringified) with the text (or q) key: the text to translate, and the options key: the options, like to: from, etc."
    );
  });
  app.post("/translate", async (req, res) => {
    let options = {};
    options = req.body.options || req.body;
    res.json(await tr(req.body.text || req.body.q, options));
  });
};
