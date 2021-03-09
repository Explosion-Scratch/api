module.exports = (app) => {
	const { http, https } = require('follow-redirects');
	app.get("/follow-redirect", (req, res) => {
		try{
			let url = new URL(req.query.q);
				const request = https.request({
				host: url.hostname,
				path: url.path,
			}, response => {
				res.json(response);
			});
			request.end();
		} catch(e){
			res.json("Error");
			res.status(500);
		}
	})
}