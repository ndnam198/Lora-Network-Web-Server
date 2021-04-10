var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false })
var convert = require('xml-js');
var modifier = require('./xmlModifier');
var options = {
    compact: true,
    trim: true,
    nativeType: true,
    ignoreDeclaration: true,
    ignoreInstruction: true,
    ignoreAttributes: true,
    ignoreComment: true,
    ignoreCdata: true,
    ignoreDoctype: true
};

/* All route functions that related to Home url */
module.exports = function (app) {

    /* Home page */
    app.get("/", function (req, res) {
        res.render('index');
        res.end();
    });

    app.get("/index", function (req, res) {
        res.render('index');
        res.end();
    });

    app.get("/status", function (req, res) {
        var xml = require('fs').readFileSync(__dirname + '/../data/nodeData.xml', 'utf8');
        var result = convert.xml2js(xml, options);
        if (!result || !result.data.nodedata || !result.data.nodedata.node || !Array.isArray(result.data.nodedata.node))
            return res.status(404);
        // ret = modifier.modifyNode('123', 'Trần Hưng Đạo', 'OFF', '');
        // console.log(ret);
        let nodeData = {};
        for (let i = 0; i < 3; i++) {
            nodeData[`node${i}_id`] = result.data.nodedata.node[i].nodeID._text;
            nodeData[`node${i}_location`] = result.data.nodedata.node[i].location._text;
            nodeData[`node${i}_status`] = result.data.nodedata.node[i].status._text.toUpperCase();
            nodeData[`node${i}_error`] = result.data.nodedata.node[i].error._text;
        }
        res.status(200).json(nodeData);
    });

    /* After login */
    app.post("/login", urlencodedParser, function (req, res) {
        if (!req.body) return res.sendStatus(400);
        console.log(req.body);
        var xml = require('fs').readFileSync(__dirname + '/../data/nodeData.xml', 'utf8');
        var result = convert.xml2js(xml, options);
        if (!result || !result.data.users || !result.data.users.user || !Array.isArray(result.data.users.user))
            return res.status(404);
        /* Return control page if username and password exist in database */
        for (let i = 0; i < result.data.users.user.length - 1; i++) {
            console.log(result.data.users.user[i].username);
            if (req.body.username == result.data.users.user[i].username._text) {
                res.status(200).json({ status: "ok" });
                res.end();
                return;
            }
        }
        console.log("Invalid login");
        res.sendStatus(404);
        res.end();
    });
}