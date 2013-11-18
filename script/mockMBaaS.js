module.exports = applyServer;

var allForms=require("./sampleData/getForm.json");

function applyServer(app) {
    app.get("/mbaas/forms/:appId", _getForms);
    app.get("/mbaas/forms/:appId/:formId",_getForm);
    app.post("/mbaas/forms",_postForms);
}

function _getForms(req, res) {
    res.json({
        "forms": [{
            "_id": "527d4539639f521e0a000004",
            "name": "testFieldsForm",
            "description": "I am a form",
            "lastUpdated":"2013-11-08T20:10:33.819Z"
        }]
    });
}
function _postForms(req, res) {
    res.json({
        "status":"ok",
        "body": req.body
    });
}

function _getForm(req,res){
    var formId=req.params.formId;
    if (allForms[formId]){
        res.json(allForms[formId]);
    }else{
        res.status(404).end("Cannot find specified form");
    }
}