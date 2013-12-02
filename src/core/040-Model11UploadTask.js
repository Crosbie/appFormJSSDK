/**
 * Uploading task for each submission
 */

appForm.models=(function(module){
    var Model=appForm.models.Model;

    function UploadTask(submissionModel){
        Model.call(this,{
            "_type":"uploadTask"
        });
        this.init(submissionModel);
    }
    appForm.utils.extend(UploadTask, Model);
    UploadTask.prototype.init=function(submissionModel){
        var json=submissionModel.getProps();
        var files=submissionModel.getFileInputValues();
        var submissionId=submissionModel.getLocalId();
        this.setLocalId(submissionId+"_"+"uploadTask");
        
    }

    function addJSONTask(json){

    }
    function addFileTask(fileDef){

    }
    module.UploadTask=UploadTask;
    return module;
})(appForm.models || {});