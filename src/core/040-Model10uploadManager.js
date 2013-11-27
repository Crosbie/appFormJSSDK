/**
 * Manages submission uploading tasks
 */

appForm.models=(function(module){
    module.uploadManager={
        "queueSubmission":queueSubmission
    }

    /**
     * Queue a submission to uploading tasks. It will split tasks to 1. form task, 2. file tasks.
     * @param  {[type]} submissionModel [description]
     * @return {[type]}                 [description]
     */
    function queueSubmission(submissionModel){

    }

    return module;
})(appForm.models || {});