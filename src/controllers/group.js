// const Task = require('../models/task.js');
var request = require("request");
var convert = require("xml-js");
const { response } = require('express');

// Create and Save a new task
exports.getAll = (req, res) => {
    let exportFormat = req.body.exportFormat
    console.log(exportFormat)
    var options = {
        method: 'POST',
        url: 'http://localhost:9000',
        headers:
        {
            'cache-control': 'no-cache',
            'Content-Type': 'text/xml'
        },
        body: '<ENVELOPE>' +
            '    <HEADER>' +
            '        <TALLYREQUEST>Export Data</TALLYREQUEST>' +
            '<ID>Trial Balance</ID>' +
            '    </HEADER>' +
            '    <BODY>' +
            '     <DATA>' +
            '             <SVSTKITEM>' +
            '                 <STATICVARIABLES>' +
            'Item 1' +
            '             </SVSTKITEM>' +
            '             </DATA>' +
            ' </BODY>' +
            '</ENVELOPE>'
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);

        console.log(body);

        return res.send(convert.xml2json(body))

    });
};
