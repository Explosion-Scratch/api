module.exports = app => {
  const prettier = require("prettier");
	var {minify} = require("uglify-js");
  app.get("/beautify", (req, res) => {
		var code;
		try {
			code = prettier.format(req.query.q);
		} catch(e){
			code = e.message;
		}
		res.json(code);
  });
  app.get("/beautify/help", (req, res) => {
    res.send(
      "A GET request simply beautifies the code given in the 'q' query using prettier's default options and parser, a POST request uses the options JSON key to apply options. Returns the string of beautified code."
    );
  });
	app.post("/minify", (req, res) => {
		const code = minify(req.body.code || req.body.text || req.body.q || req.query.q, req.body.options || {
			compress: {},
			mangle: {
				properties: true,
			},
			toplevel: true,
			output: {
				beautify: req.query.beautify || req.body.beautify || false,
			}
		})
		res.json(code)
	})
  app.post("/beautify", (req, res) => {
		var code;
		try {
			code = prettier.format(req.body.q || req.body.code || req.body.text, req.body.options);
		} catch(e){
			code = e;
		}
		res.json(code);
  });
};
