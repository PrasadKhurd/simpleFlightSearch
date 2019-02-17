var express = require("express");
var bodyParser = require("body-parser");
var couchbase = require("couchbase");
var path = require("path");
var config = require("./config");
var app = express();
var cors = require('cors');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//enables cors 
app.use(cors({   
	'allowedHeaders': ['sessionId', 'Content-Type'],   
	'exposedHeaders': ['sessionId'],   
	'origin': '*',   
	'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',   
	'preflightContinue': false 
})); 

var cluster = new couchbase.Cluster(config.couchbase.server);
cluster.authenticate('root', 'simple');

module.exports.bucket = cluster.openBucket(config.couchbase.bucket);

app.use(express.static(path.join(__dirname, "public")));

var routes = require("./routes/routes.js")(app);

var server = app.listen(3001, function () {
    console.log("Listening on port %s...", server.address().port);
    console.log("Html: "+ __dirname);
});
