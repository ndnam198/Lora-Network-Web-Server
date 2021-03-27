const { text, query } = require("express");

var express = require("express");
var bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({ extended: false })
var app = express();
var port = 9000;
var reqIndex = 0;

/* import modules */
var apiController = require("./controllers/apiControllers");
var homeController = require("./controllers/homeControllers");

// Allow users to download files in public folder
app.use("/public", express.static(__dirname + "/public"));
// Set /view as root 
app.set('view engine', 'ejs');



/* custom middleware */
app.use("/", urlencodedParser, function (req, res, next) {
    console.log("\n");
    reqSummary = {
        "timeStamp": new Date(),
        "method": req.method,
        "sequenceID": ++reqIndex,
        "url": req.url,
        "bodyLength": Object.keys(req.body).length
    }
    console.log(reqSummary);
    next();
});

apiController(app);
homeController(app);

app.listen(port, function () {
    console.log("Server's listening on PORT: ", port);
});

