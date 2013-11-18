appForm.models = (function(module) {
    
    module.submission = {
        newInstance: newInstance,
        fromLocal: fromLocal
    };

    //implmenetation
    var Model = appForm.models.Model;
    var statusMachine={
        "new":["draft","pending"],
        "draft":["pending","draft"],
        "pending":["submitted","error"],
        "submitted":[],
        "error":[]
    }
    function newInstance(form) {
        return new Submission(form);
    }

    function fromLocal(localId, cb) {
        var obj = new Submission();
        obj.setLocalId(localId);
        obj.loadLocal(cb);
    }

    function Submission(form) {
        Model.call(this, {
            "_type": "submission"
        });
        if (typeof form != "undefined") {
            this.set("formName", form.get("name"));
            this.set("formId", form.get("_id"));
        }
        this.set("status", "new");
        this.set("createDate", (new Date()).getTime());
        this.genLocalId();
    }
    appForm.utils.extend(Submission, Model);
    /**
     * save current submission as draft
     * @return {[type]} [description]
     */
    Submission.prototype.saveDraft = function(cb) {
        var targetStatus="draft";

    }
    /**
     * submit current submission to remote
     * @param  {Function} cb [description]
     * @return {[type]}      [description]
     */
    Submission.prototype.submit = function(cb) {
        var targetStatus="pending";
    }
    //joint form id and submissions timestamp.
    Submission.prototype.genLocalId = function() {
        var lid = appForm.utils.localId(this);
        var formId = this.get("formId")||Math.ceil(Math.random()*100000);
        this.setLocalId(formId+"_"+lid);
    }

    Submission.prototype.setStatus=function(status){
        
    }
    /**
     * check if a target status is valid
     * @param  {[type]}  targetStatus [description]
     * @return {Boolean}              [description]
     */
    Submission.prototype.isStatusValid=function(targetStatus){
        var status=this.get("status").toLowerCase();
        var nextStatus=statusMachine[status];
        if (nextStatus.indexOf(targetStatus)>-1){
            return true;
        }else{
            return false;
        }
    }



    return module;
})(appForm.models || {});