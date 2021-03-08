module.exports = (app) => {
	const CambDict = require("camb-dict");
	const dictionary = new CambDict.Dictionary();
	app.get("/dictionary", async (req, res) => {
		try{
			res.json(await dictionary.meaning(req.query.q))
		} catch(e){
			res.json("Word not found!");
			res.status(404);
		}
	})
}