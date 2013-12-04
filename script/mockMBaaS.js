module.exports = applyServer;

var allForms = require("./sampleData/getForm.json");

function applyServer(app) {
    app.get("/mbaas/forms/:appId", _getForms);
    app.get("/mbaas/forms/:appId/:formId", _getForm);
    app.post("/mbaas/forms", _postForms);
    app.post("/mbaas/forms/:formId/submitFormData", _postFormSubmission);
    app.post("/mbaas/:submissionId/:fieldId/:hashName/submitFormFile",_appFileSubmission);
}

function _getForms(req, res) {
    var formsArr = [];
    for (var id in allForms) {
        var form = allForms[id];
        formsArr.push({
            _id: id,
            name: form.name,
            description: form.description,
            lastUpdated: form.lastUpdated,
            lastUpdatedTimestamp: form.lastUpdatedTimestamp
        });
    }
    res.json({
        "forms": formsArr
    });
}

function _postForms(req, res) {
    res.json({
        "status": "ok",
        "body": req.body
    });
}

function _postFormSubmission(req, res) {
    var body = req.body;
    var rtn = {
        "submissionId": "123456",
        "ori": req.body
    };
    if (body.outOfDate) {
        rtn.updatedFormDefinition=allForms["527d4539639f521e0a000004"];
    }
    res.json(rtn);
}

function _getForm(req, res) {
    var formId = req.params.formId;
    if (allForms[formId]) {
        res.json(allForms[formId]);
    } else {
        res.status(404).end("Cannot find specified form");
    }
}

function _appFileSubmission(req,res){
    console.log(req.files);
    res.json({"status":"ok"});
}