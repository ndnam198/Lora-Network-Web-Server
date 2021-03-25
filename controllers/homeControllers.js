var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

/* All route functions that related to Home url */
module.exports = function (app) {
    
    /* Home page */
    app.get("/", function (req, res) {
        res.render('index');
    });

    /* After login */
    app.post("/login", urlencodedParser, function (req, res) {
        console.log(JSON.stringify(req))
        res.send("Welcome, " + req.body.username);
    });
}