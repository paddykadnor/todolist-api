// const Task = require('../models/task.js');
var request = require("request");
var convert = require("xml-js");
const { response } = require('express');
const group = require("../routes/group");

// Create and Save a new task
exports.getAll = (req, res) => {
    let exportFormat = req.body.exportFormat
    var options = {
        method: 'POST',
        url: 'http://localhost:9000',
        headers:
        {
            'cache-control': 'no-cache',
            'Content-Type': 'text/xml'
        },
        body:
            '<ENVELOPE>' +

            '<HEADER>' +

            '<VERSION>1</VERSION>' +

            '<TALLYREQUEST>Export</TALLYREQUEST>' +

            '<TYPE>Data</TYPE>' +

            '<ID>XMLStockGroups</ID>' +

            '</HEADER>' +

            '<BODY>' +

            '<DESC>' +

            '<STATICVARIABLES>' +

            '<SVEXPORTFORMAT>$$SysName:XML</SVEXPORTFORMAT>' +
            '<SVCURRENTCOMPANY>Test Company</SVCURRENTCOMPANY>' +


            '</STATICVARIABLES>' +
            '<TDL>  <TDLMESSAGE>' +
            '<REPORT NAME="XMLStockGroups" ISMODIFY="No" ISFIXED="No" ISINITIALIZE="No" ISOPTION="No" ISINTERNAL="No">' +
            '<USE>List Of Accounts</USE>' +
            '<DELETE>Set : AccountType       : if $$IsEmpty:##AccountType then $$SysName:Ledgers else ##AccountType</DELETE>' +
            '<ADD>Set : AccountType       : "Stock Groups"</ADD>' +
            '<FORMS>XMLStockGroups</FORMS>' +
            '<SET>SVCurrentCompany   : SVCurrentCompany</SET>' +
            '</REPORT>' +
            '<FORM NAME="XMLStockGroups" ISMODIFY="No" ISFIXED="No" ISINITIALIZE="No" ISOPTION="No" ISINTERNAL="No">' +
            '<USE>List Of Accounts</USE>' +
            '</FORM>' +
            '</TDLMESSAGE>' +
            '</TDL>' +

            '</DESC>' +

            '</BODY>' +

            '</ENVELOPE>'
        // '<ENVELOPE>' +
        //     '          <HEADER>' +
        //     '               <TALLYREQUEST>Export Data</TALLYREQUEST>' +
        //     '           </HEADER>' +
        //     '           <BODY>' +
        //     '           <EXPORTDATA>' +
        //     '           <REQUESTDESC>' +
        //     '           <REPORTNAME>Group</REPORTNAME>	' +
        //     '           <STATICVARIABLES>' +
        //     '                 <EXPLODEFLAG>Yes</EXPLODEFLAG>' +
        //     '               <SVEXPORTFORMAT>$$SysName:XML</SVEXPORTFORMAT>' +
        //     '               <ACCOUNTTYPE>$$SysName:Groups</ACCOUNTTYPE> '+
        //     '           </STATICVARIABLES>' +
        //     '           </REQUESTDESC>' +
        //     '           </EXPORTDATA>' +
        //     '           </BODY>' +
        //     '      </ENVELOPE>'
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);

        console.log(body);

        return res.send(body)

    });
};



// Create and Save a new task
exports.create = (req, res) => {
    const groupName = req.body.groupName
    const json = {
        "ENVELOPE": {
            "HEADER": {
                "TALLYREQUEST": {
                    "_text": "Import Data"
                }
            },
            "BODY": {
                "IMPORTDATA": {
                    "REQUESTDESC": {
                        "REPORTNAME": {
                            "_text": "All Masters"
                        }
                    },
                    "REQUESTDATA": {
                        "TALLYMESSAGE": {
                            "_attributes": {
                                "xmlns:UDF": "TallyUDF"
                            },
                            "GROUP": {
                                "_attributes": {
                                    "NAME": groupName,
                                    "ACTION": "Create"
                                },
                                "NAME.LIST": {
                                    "NAME": {
                                        "_text": groupName
                                    }
                                },
                                "PARENT": {
                                    "_text": "Sundry Debtors"
                                },
                                "ISSUBLEDGER": {
                                    "_text": "No"
                                },
                                "ISBILLWISEON": {
                                    "_text": "No"
                                },
                                "ISCOSTCENTRESON": {
                                    "_text": "No"
                                }
                            }
                        }
                    }
                }
            }
        }
    }


    var conversion = { compact: true, ignoreComment: true, spaces: 4 };
    xml = convert.json2xml(json, conversion);
    var options = {
        method: 'POST',
        url: 'http://localhost:9000',
        headers:
        {
            'cache-control': 'no-cache',
            'Content-Type': 'text/xml'
        },
        body: xml
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);

        res.send(body)
    })
};



// Create and Save a new task
exports.delete = (req, res) => {
    const groupName = req.body.groupName
    console.log(groupName)
    const json = {
        "ENVELOPE": {
            "HEADER": {
                "TALLYREQUEST": {
                    "_text": "Import Data"
                }
            },
            "BODY": {
                "IMPORTDATA": {
                    "REQUESTDESC": {
                        "REPORTNAME": {
                            "_text": "All Masters"
                        }
                    },
                    "REQUESTDATA": {
                        "TALLYMESSAGE": {
                            "_attributes": {
                                "xmlns:UDF": "TallyUDF"
                            },
                            "GROUP": {
                                "_attributes": {
                                    "NAME": groupName,
                                    "ACTION": "Delete"
                                },
                                "NAME.LIST": {
                                    "NAME": {
                                        "_text": groupName
                                    }
                                },
                                "PARENT": {
                                    "_text": "Sundry Debtors"
                                },
                                "ISSUBLEDGER": {
                                    "_text": "No"
                                },
                                "ISBILLWISEON": {
                                    "_text": "No"
                                },
                                "ISCOSTCENTRESON": {
                                    "_text": "No"
                                }
                            }
                        }
                    }
                }
            }
        }
    }


    var conversion = { compact: true, ignoreComment: true, spaces: 4 };
    xml = convert.json2xml(json, conversion);
    var options = {
        method: 'POST',
        url: 'http://localhost:9000',
        headers:
        {
            'cache-control': 'no-cache',
            'Content-Type': 'text/xml'
        },
        body: xml
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);

        res.send(body)
    })
};






