var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false })
module.exports = function (app) {
    /* Định nghĩa 1 restful API: bao gồm các method xử lý các yêu cầu nhập, xuất, sửa, xóa của người dùng */
    /* User query for data */
    app.get("/api/control", function (req, res) {
        /* get data from database and response to client */
    });

    /* Receive user control data */
    app.post("/api/control", urlencodedParser, function (req, res) {
        /* create new and save to the database */
        console.log(req.body);

        if (req.body.source == "server") {
            /* TODO: Send data to gate way */
            /* TODO: Response control result on HTML site */
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