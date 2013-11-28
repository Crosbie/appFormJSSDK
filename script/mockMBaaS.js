module.exports = applyServer;

var allForms=require("./sampleData/getForm.json");

function applyServer(app) {
    app.get("/mbaas/forms/:appId", _getForms);
    app.get("/mbaas/forms/:appId/:formId",_getForm);
    app.post("/mbaas/forms",_postForms);
}

function _getForms(req, res) {
    var formsArr = [];
    for(var id in allForms){
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