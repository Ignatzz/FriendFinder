var path = require("path");

module.exports = function(app) {
	   	//routes user to survey.html
	app.get("/survey", function(req, res) {
		res.sendFile(path.join(__dirname, "/../public/survey.html"));
	});
	// defaults to home.html
	app.use(function(req, res) {
		res.sendFile(path.join(__dirname, "/../public/home.html"));
	});
};