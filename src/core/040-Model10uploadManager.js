/**
 * Manages submission uploading tasks
 */

appForm.models=(function(module){
    var Model=appForm.models.Model;

    function UploadManager(){
        Model.call(this,{
            "_type":"uploadManager"
        });
    }
    appForm.utils.extend(UploadManager, Model);
    /**
     * Queue a submission to uploading tasks. It will split tasks to 1. form task, 2. file tasks.
     * @param  {[type]} submissionModel [description]
     * @return {[type]}                 [description]
     */
    UploadManager.prototype.queueSubmission=function(submissionModel){
        var submissionId=submissionModel.getLocalId();
    }
    /**
     * start upload manager. it will start to upload 
     * @param  {Function} cb [description]
     * @return {[type]}      [description]
     */
    UploadManager.prototype.start=function(cb){

    }
    /**
     * stop uploadgin
     * @return {[type]} [description]
     */
    UploadManager.prototype.stop=function(){

    }
    

    function addJSONTask(json){

    }
    function addFileTask(fileDef){

    }
    module.uploadManager=new UploadManager();
    return module;
})(appForm.models || {});