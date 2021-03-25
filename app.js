/* Express modules getting started: https://expressjs.com/en/starter/installing.html */
const { text, query } = require("express");
var express = require("express");
var mysql = require("mysql");
var app = express();

var port = 9000;

var apiController = require("./controllers/apiControllers");
var homeController = require("./controllers/homeControllers");

var reqIndex = 0;
/**
 * Allow users to download files in public folder
 */
app.use("/assets", express.static(__dirname + "/public"));
app.set('view engine', 'ejs');

/* custom middleware */
app.use("/", function (req, res, next) {
    console.log("\n");
    console.log(new Date());
    console.log(`Request number [${++reqIndex}]:`);

    /* Truy xuất tới cơ sở dữ liệu */
    // var connection = mysql.createConnection({
    //     host: "localhost",
    //     user: "ndnam198",
    //     password: "123456",
    //     database: "testdb"
    // });
    
    // connection.connect(function(err) {
    //     if (err) {
    //       console.error('error connecting: ' + err.stack);
    //       return;
    //     }
    //     console.log('Connected to XAMPP sql server as id ' + connection.threadId);
    // });
    
    // connection.query('SELECT * FROM tbl_loranode', function (error, results, fields) {
    //     if (error) throw error;
    //     console.log('Queried data: ', results);
    //   });

    // connection.end();
    next();
});

apiController(app);
homeController(app);

app.listen(port, function () {
    console.log("Server's listening on PORT: ", port);
});

