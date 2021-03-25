var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

module.exports = function (app) {
    /* Định nghĩa 1 restful API: bao gồm các method xử lý các yêu cầu nhập, xuất, sửa, xóa của người dùng */
    /* Xuất */
    app.get("/api/user/:id", function (req, res) {
        /* get data from database and response to client */
    });

    /* Nhập */
    app.post("/api/user", jsonParser, function (req, res) {
        /* create new and save to the database */
    })

    /* Nhập */
    // app.post("/api/loginjson", jsonParser, function (req, res) {
    //     username = req.params[0]
    //     passwd = req.params[1]
    // })

    /* Sửa */
    app.put("/api/user", jsonParser, function (req, res) {
        /* update user and save to the database */
    })

    /* Xóa */
    app.delete("/api/user/:id", function (req, res) {
        /* delete user from database */
    })
}