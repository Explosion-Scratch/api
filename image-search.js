module.exports = app => {
  var gis = require("g-i-s");
  const fetch = require("node-fetch");
  app.get("/image-search/help", (req, res) => {
		res.send("Searches for an image on google images. <br><br>Paths:<br>/image-search: Search for the 'q' query on google images and return JSON for the results.<br>/image-search/quick: Sends the image itself for the 1st search result.")
	});
  app.get("/image-search", (req, res) => {
    gis(req.query.q, (err, results) => {
			if (!results || results.length < 1){
				res.json([{url: "https://source.unsplash.com/600x400/?puppy,kitten,cute+animal", width: 600, height: 400}]);
				return;
			}
      res.json(results);
    });
  });

  app.get("/image-search/quick", (req, res) => {
    gis(req.query.q, async (err, results) => {
			if (!results || results.length < 1){
				await fetch("https://zum-talent.ecore.com.sg/assets/frontend/image/no_result.jpeg")
        .then(r => r.buffer())
        .then(buf => {
          res.writeHead(200, {
            "Content-Type": "image/png",
            "Content-Length": buf.length
          });
          res.end(buf);
        });
				return;
			}
      if (results.length < 1) {
        res.send("Error! No results!");
        res.status(204);
        return;
      }
      await fetch(results[0].url)
        .then(r => r.buffer())
        .then(buf => {
          res.writeHead(200, {
            "Content-Type": "image/png",
            "Content-Length": buf.length
          });
          res.end(buf);
        });
    });
  });
};
