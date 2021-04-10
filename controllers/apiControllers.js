var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false })
var modifier = require('./xmlModifier');

module.exports = function (app) {
    /* Định nghĩa 1 restful API: bao gồm các method xử lý các yêu cầu nhập, xuất, sửa, xóa của người dùng */
    /* User query for data */
    app.get("/control", function (req, res) {
        var node1 = "on"
        res.render('control');
        res.end();
    });

    /* Receive user control data */
    app.post("/control/single", urlencodedParser, function (req, res) {
        console.log(req.body);
        if (req.body.source == "browser" && req.body.type == "control") {
            res.status(200);
            /* TODO: Send data to gate way */
            
            /* Write new data to database */
            modifier.modifyNode(req.body.nodeID, null, req.body.status, null);
        }
    });

    app.post("/control/all", urlencodedParser, function (req, res) {
        console.log(req.body);
        if (req.body.source == "browser" && req.body.type == "control") {

            /* TODO: Send data to gate way */
            /* Write new data to database */
            modifier.modifyAll(req.body.status);
            res.status(200);
        }
    });

    /* User want to input some new data */
    app.put("/api/control", function (req, res) {
        /* update user and save to the database */
    });

    /* User deletes some unwanted data */
    app.delete("/api/control", function (req, res) {
        /* delete user from database */
    });

  
}