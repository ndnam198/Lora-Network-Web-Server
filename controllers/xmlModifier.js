var xmlParser = require('xml-js');
var fs = require('fs');
const formatXml = require("xml-formatter");
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
var xmlPath = __dirname + '/../data/nodeData.xml';

function modifyXml(jsonContent) {
    fs.writeFile(xmlPath, formatXml(xmlParser.js2xml(jsonContent, options), { collapseContent: true }), function (err, currentXml) {
        if (err) {
            console.log("err")
        } else {
            console.log("Xml file successfully updated.")
        }
    })
    return;
}

module.exports = {
    modifyNode: function (id, location, status, err) {
        var xml = fs.readFileSync(xmlPath, 'utf8');
        var currentXml = xmlParser.xml2js(xml, options);
        if (!currentXml || !currentXml.data.nodedata || !currentXml.data.nodedata.node || !Array.isArray(currentXml.data.nodedata.node))
            return;
        for (let i = 0; i < 3; i++) {
            if (currentXml.data.nodedata.node[i].nodeID._text == id) {
                /* if node has no error */
                if (currentXml.data.nodedata.node[i].error._text == null)
                    if (currentXml.data.nodedata.node[i].status._text != status && status != null)
                        currentXml.data.nodedata.node[i].status._text = status;
                if (currentXml.data.nodedata.node[i].location._text != location && location != null)
                    currentXml.data.nodedata.node[i].location._text = location;
                if (currentXml.data.nodedata.node[i].error._text != err && err != null)
                    currentXml.data.nodedata.node[i].error._text = err;
            }
        }
        modifyXml(currentXml);
        return 1;
    },

    modifyAll: function (status) {
        var xml = fs.readFileSync(xmlPath, 'utf8');
        var currentXml = xmlParser.xml2js(xml, options);
        if (!currentXml || !currentXml.data.nodedata || !currentXml.data.nodedata.node || !Array.isArray(currentXml.data.nodedata.node))
            return;
        for (let i = 0; i < 3; i++) {
            /* if node has no error */
            if (currentXml.data.nodedata.node[i].error._text == null)
                currentXml.data.nodedata.node[i].status._text = status;
        }
        modifyXml(currentXml);
        return 1;
    }
}