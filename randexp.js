module.exports = app => {
  const RandExp = require("randexp");
  app.get("/randexp/help", (req, res) => {
    res.send(
      "Generates a string to match the regex given. <br><br>Params:<br>'re' or 'regex': The regex to generate from.<br>flags: The flags to use"
    );
  });
  app.get("/randexp", (req, res) => {
    let re = new RandExp(
      req.query.re || req.query.regex,
      req.query.flags || ""
    );
    let limit = req.query.limit || 100;
    limit = limit > 1000 ? 1000 : limit;
    let ary = [];
    for (var i = 0; i < limit; i++) {
      ary.push(re.gen());
    }
    res.json(ary);
  });
};
