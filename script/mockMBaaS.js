module.exports = applyServer;

function applyServer(app) {
    app.get("/mbaas/forms/:appId", _getForms);

}

function _getForms(req, res) {
    res.json({
        "forms": [{
            "formId": "527d4539639f521e0a000004",
            "name": "testFieldsForm",
            "description": "I am a form"
        }]
    });
}