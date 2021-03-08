module.exports = app => {
  const uuid = require("uuid");
  app.get("/uuid", (req, res) => {
    let limit = req.query.limit || 100;
    if (limit > 5000) limit = 5000;
    let ary = [];
    for (var i = 0; i < limit; i++) {
      ary.push(uuid.v4());
    }
    res.json(ary);
  });
  app.get("/uuid/validate", (req, res) => {
    res.json(uuid.validate(req.query.q));
  });
};
