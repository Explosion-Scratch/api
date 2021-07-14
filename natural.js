module.exports = (app) => {
	var natural = require('natural');
	var nounInflector = new natural.NounInflector();
	app.all("/natural/pluralize", (req, res) => {
		if (!(req._.word || req._.q)){
			return res.json({error: "No word specified, use the word or q query or JSON field."})
		}
		res.json(nounInflector.pluralize(req._.word || req._.q))
	})
	app.all("/natural/singularize", (req, res) => {
		if (!(req._.word || req._.q)){
			return res.json({error: "No word specified, use the word or q query or JSON field."})
		}
		res.json(nounInflector.singularize(req._.word || req._.q))
	})
	app.all("/natural/nth", (req, res) => {
		req._.number = req._.q || req._.number || req._.num;
		if (!req._.number){
			return res.json({error: "No number specified, use the number or q query or JSON field."})
		}
		res.json(nounInflector.nth(parseInt(req._.number, 10)))
	})
}