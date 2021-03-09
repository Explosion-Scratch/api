module.exports = (app) => {
	var preview = require("link-preview-js").getLinkPreview
	app.get("/link-preview", async (req, res) => {
		try {
			res.json(await preview(req.query.q))
		} catch(e){
			res.json("Invalid link");
			res.status(500);
		}
	})
}