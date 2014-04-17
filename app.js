var express = require("express");
var http = require("http");
var path = require("path");
var $ = require("mongous").Mongous;

var app = express();

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
// app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.urlencoded());
app.use(express.json());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

app.get("/", function(req, res) {
    res.render("test", { title: "MMO" });
});

app.post("/gamestarted", function(req, res) {
	console.log(req.body.name + " has started there game.");
});

app.get("/teststuff", function(req, res) {
	var min = parseInt(req.query.minVal);
	$("db.tests").find({ test: { $gte: min }}, function(data) {
		if(data.documents.length == 0) {
			res.send("No data found");
			return;
		}
		res.send(data.documents);
	});
	// res.send("YOU SHOULDNT SEE THIS");
});

http.createServer(app).listen(app.get('port'), function() {
    console.log("Server started on port " + app.get("port")); 
});