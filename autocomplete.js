module.exports = (app) => {
	auto = require('google-autocomplete');
	app.get("/autocomplete", (req, res) => {
		auto.getAllSuggestions(req.query.q, function(err, suggestions) {
				res.json(suggestions)
		})
	})
}