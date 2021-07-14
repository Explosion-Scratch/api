// This JUST sends the request's IP back to the user, it does not track or store it.
module.exports = (app) => {
	var geoip = require('geoip-lite');
	app.get("/ip", (req, res) => {
		var ip = req.query.ip || req.query.q || req.headers['x-forwarded-for'] || 
     req.connection.remoteAddress || 
     req.socket.remoteAddress ||
     (req.connection.socket ? req.connection.socket.remoteAddress : null);
		if (!ip){
			res.json("No IP found. Use the 'ip' or'q' query to specify one, if left blank it should use your IP adress.");
		}
		res.json(geoip.lookup(ip));
	})
}