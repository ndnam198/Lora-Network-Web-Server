var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false })

/* All route functions that related to Home url */
module.exports = function (app) {

    /* Home page */
    app.get("/", function (req, res) {
        res.render('index');
        res.end();
    });

    /* After login */
    app.post("/login", urlencodedParser, function (req, res) {
        if (!req.body) return res.sendStatus(400);
        console.log(req.body);
        /* TODO: check username and password in databse */
        if (req.body.username == "abc") {
            console.log("bingo");
            res.render('control');
        }
        else {
            console.log("wrong login info");
            res.sendStatus(404);
        }
        res.end();
        /* Return control page if username and password exist in database */
    });
}