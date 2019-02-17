var uuid = require("uuid");
var db = require("../app").bucket;
var config = require("../config");
var N1qlQuery = require('couchbase').N1qlQuery;

function Flight() { };

Flight.getFlightByNumberAndDate = function(flightNumber, date, callback){
var statement = "select flightNumber, carrier, origin, departure, " + 
"destination, arrival, aircraft, distance, travelTime, status " + 
"from `" + config.couchbase.bucket + "` as flights " + 
"where flightNumber = $1 " + 
"and date_format_str(departure, '1111-11-11') = $2";
var query = N1qlQuery.fromString(statement);
db.query(query, [flightNumber, date], function(error, result) {
	console.log(flightNumber + " " + date);
if(error) {
return callback(error, null);
}
callback(null, result);
});
};

Flight.getFlightByOriginDestinationAndDate = function(origin, destination, date, callback){
var statement = "select flightNumber, carrier, origin, departure, " + 
"destination, arrival, aircraft, distance, travelTime, status " + 
"from `" + config.couchbase.bucket + "` as flights " + 
"where origin = $1 " + 
"and destination = $2" +
"and date_format_str(departure, '1111-11-11') = $3";
var query = N1qlQuery.fromString(statement);
db.query(query, [origin, destination, date], function(error, result) {
	console.log(origin + " " + destination + " " + date);
if(error) {
return callback(error, null);
}
callback(null, result);
});
}

Flight.getAll = function(callback)
{
var statement = "select flightNumber, carrier, origin, departure, " + 
"destination, arrival, aircraft, distance, travelTime, status " + 
"from `" + config.couchbase.bucket + "` as flights";
var query = N1qlQuery.fromString(statement)
.consistency(N1qlQuery.Consistency.REQUEST_PLUS);;
db.query(query, function(error, result) {
if(error) {
return callback(error, null);
}
callback(null, result);
});
}

module.exports = Flight;
