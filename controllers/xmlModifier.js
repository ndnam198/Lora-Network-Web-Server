var convert = require('xml-js');
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

module.exports = {
    modifyNode: function (id, location, status, err) {
        var xml = require('fs').readFileSync(__dirname + '/../data/nodeData.xml', 'utf8');
        var result = convert.xml2js(xml, options);
        if (!result || !result.data.nodedata || !result.data.nodedata.node || !Array.isArray(result.data.nodedata.node))
            return;
        else {
            for (let i = 0; i < 3; i++) {
                if (id == result.data.nodedata.node[i].nodeID._text) {
                    result.data.nodedata.node[i].location._text = location;
                    result.data.nodedata.node[i].status._text = status;
                    result.data.nodedata.node[i].error._text = err;
                    return 1;
                }
            }
            return;
        }
    }
}