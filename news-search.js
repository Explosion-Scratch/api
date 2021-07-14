module.exports = (app) => {
	const fetch = require("node-fetch");
	app.get("/news-search", async (req, res) => {
		try {
			res.json(await (await fetch(`https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${req.query.q}&api-key=${process.env.nyt_api}`)).json())
		} catch(e){
			res.json("Internal server error");
			res.status(500);
		}
	})
}