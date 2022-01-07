module.exports = (app) => {
	const { http, https } = require('follow-redirects');
	app.get("/follow-redirect", (req, res) => {
		var url = require("url");
		if (!req.query.q) return res.status(500).send("Error")
		console.log(req.query)
		if (!/^(?:http|https)\:\/\/.+/.test(req.query.q)){
			res.json({error: "Invalid url"});
			return;
		}
		try{
			let pth = url.parse(req.query.q);
				const request = https.request({
				host: pth.hostname,
				path: pth.path,
			}, response => {
				res.json(response.responseUrl);
			});
			request.end();
		} catch(e){
			res.json("Error");
			res.status(500);
		}
	})
}