appForm.models = (function(module) {

    module.submission = {
        newInstance: newInstance,
        fromLocal: fromLocal
    };

    //implmenetation
    var _submissions = {}; //cache in mem for single reference usage.
    var Model = appForm.models.Model;
    var statusMachine = {
        "new": ["draft", "pending"],
        "draft": ["pending", "draft"],
        "pending": ["submitted", "error"],
        "submitted": [],
        "error": []
    };

    function newInstance(form) {
        return new Submission(form);
    }

    function fromLocal(localId, cb) {
        if (_submissions[localId]) { //already loaded
            cb(null, _submissions[localId]);
        } else { //load from storage
            var obj = new Submission();
            obj.setLocalId(localId);
            obj.loadLocal(function(err, submission) {
                if (err) {
                    cb(err);
                } else {
                    submission.reloadForm(function(err, res) {
                        if (err) {
                            cb(err);
                        } else {
                            cb(null, submission);
                        }
                    });
                }
            });
        }

    }

    function Submission(form) {
        Model.call(this, {
            "_type": "submission"
        });
        if (typeof form != "undefined" && form) {
            this.set("formName", form.get("name"));
            this.set("formId", form.get("_id"));

            this.set("deviceFormTimestamp", form.getLastUpdate());
            this.form = form;
            //TODO may contain whole form definition in props.
        }
        this.set("status", "new");
        this.set("createDate", (new Date()).getTime());
        this.set("appId", appForm.config.get("appId"));
        this.set("appEnvironment", appForm.config.get("env"));
        this.set("appCloudName", ""); //TODO check with eng
        this.set("comments", []);
        this.set("formFields", []);
        this.genLocalId();
        var localId = this.getLocalId();
        _submissions[localId] = this;
    }
    appForm.utils.extend(Submission, Model);
    /**
     * save current submission as draft
     * @return {[type]} [description]
     */
    Submission.prototype.saveDraft = function(cb) {
        var targetStatus = "draft";
        this.changeStatus(targetStatus, cb);

    }
    /**
     * submit current submission to remote
     * @param  {Function} cb [description]
     * @return {[type]}      [description]
     */
    Submission.prototype.submit = function(cb) {
        var targetStatus = "pending";
        throw ("not finished");
    }
    Submission.prototype.submitted = function(cb) {
        var targetStatus = "submitted";
        this.changeStatus(targetStatus, cb);

    }
    //joint form id and submissions timestamp.
    Submission.prototype.genLocalId = function() {
        var lid = appForm.utils.localId(this);
        var formId = this.get("formId") || Math.ceil(Math.random() * 100000);
        this.setLocalId(formId + "_" + lid);
    }
    /**
     * change status and save the submission locally and register to submissions list.
     * @param {[type]} status [description]
     */
    Submission.prototype.changeStatus = function(status, cb) {
        if (this.isStatusValid(status)) {
            var that = this;
            this.set("status", status);
            this.saveLocal(function(err, res) {
                that.saveToList(function() {
                    cb(err, res);
                });
            });
        } else {
            throw ("Target status is not valid: " + status);
        }
    }
    Submission.prototype.saveToList = function(cb) {
        appForm.models.submissions.saveSubmission(this, cb);
    }
    Submission.prototype.getStatus = function() {
        return this.get("status");
    }
    /**
     * check if a target status is valid
     * @param  {[type]}  targetStatus [description]
     * @return {Boolean}              [description]
     */
    Submission.prototype.isStatusValid = function(targetStatus) {
        var status = this.get("status").toLowerCase();
        var nextStatus = statusMachine[status];
        if (nextStatus.indexOf(targetStatus) > -1) {
            return true;
        } else {
            return false;
        }
    }

    Submission.prototype.addComment = function(msg, user) {
        var now = new Date();
        var ts = now.getTime();
        var newComment = {
            "madeBy": typeof user == "undefined" ? "" : user.toString(),
            "madeOn": now,
            "value": msg,
            "timeStamp": ts
        };
        this.getComments().push(newComment);
        return ts;
    }
    Submission.prototype.getComments = function() {
        return this.get("comments");
    }
    Submission.prototype.removeComment = function(timeStamp) {
        var comments = this.getComments();
        for (var i = 0; i < comments.length; i++) {
            var comment = comments[i];
            if (comment.timeStamp == timeStamp) {
                comments.splice(i, 1);
                return;
            }
        }
    }
    /**
     * Add a value to submission.
     * This will cause the value been validated
     *
     * @param {[type]} fieldId    [description]
     * @param {[type]} inputValue [description]
     * @return true / error message
     */
    Submission.prototype.addInputValue = function(fieldId, inputValue) {
        var fieldModel = this.form.getFieldModelById(fieldId);
        var validateRes = appForm.models.fieldValidate.validate(inputValue, fieldModel);
        if (validateRes === true) {

        } else {
            return validateRes;
        }
    }
    Submission.prototype.getInputValueByFieldId = function(fieldId) {
        var formFields = this.get("formFields", []);
        for (var i = 0; i < formFields.length; i++) {
            var formField = formFields[i];
            if (formField.fieldId == fieldId) {
                return formField;
            }
        }
        return null;
    }
    /**
     * get form model related to this submission.
     * @return {[type]} [description]
     */
    Submission.prototype.getForm = function() {
        return this.form;

    }
    Submission.prototype.reloadForm = function(cb) {
        var Form = appForm.models.Form;
        var formId = this.get("formId");
        this.form = new Form({
            formId: formId
        }, cb);
    }


    return module;
})(appForm.models || {});