var Flight = require("../models/flight");

var appRouter = function(app) {

app.get("/api/getByNumberAndDate", function(req, res) {
	console.log(req.query.flightNumber + " + " + req.query.date);
    if(!req.query.flightNumber || !req.query.date) {
        return res.status(400).send({"status": "error", "message": "Flight number and date are required"});
    }
    Flight.getFlightByNumberAndDate(req.query.flightNumber, req.query.date,
function(error, result) {
        if(error) {
            return res.status(400).send(error);
        }
        res.send({results: result});
    });
});

app.get("/api/getByOriginDestinationAndDate", function(req, res) {
	console.log(req.query.origin + " + " + req.query.destination + " + " + req.query.date);
    if(!req.query.origin || !req.query.destination || !req.query.date) {
        return res.status(400).send({"status": "error", "message": "Flight origin, destination and date are required"});
    };
    Flight.getFlightByOriginDestinationAndDate(req.query.origin, req.query.destination, req.query.date,
function(error, result) {
        if(error) {
            return res.status(400).send(error);
        }
        res.send({results: result});
    });
});

app.get("/api/getAll", function(req, res) {
    Flight.getAll(function(error, result) {
        if(error) {
            return res.status(400).send(error);
        }
        res.send({results: result});
    });
});

app.get("/", (req,res) => {
    res.send("Invalid page");
})

};

module.exports = appRouter;
