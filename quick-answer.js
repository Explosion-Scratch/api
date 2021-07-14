module.exports = (app) => {
	const fetch = require("node-fetch");
	const cors = require('cors');
	let ids = [process.env.wolfram1, process.env.wolfram2, process.env.wolfram3, process.env.wolfram4, process.env.wolfram5];
	app.get("/quick-answer", cors(), async (req, res) => {
		id = ids[Math.floor(Math.random() * ids.length)]
		try {
			var data = await fetch('https://api.wolframalpha.com/v1/result?i='+escape(req.query.q)+'&appid='+id+'&format=plaintext');
			data = await data.text();
			res.json({error: data=='No short answer available' || data == 'Wolfram|Alpha did not understand your input', original: req.query.q, text: data, id_index: ids.indexOf(id)})
		} catch(e) {
			res.json("Err")
		}
	})
}