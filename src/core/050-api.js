/**
 * FeedHenry License
 */

appForm.api=(function(module){
    module.getForms=getForms;
    module.getForm=getForm;
    module.saveDraft=saveDraft;
    module.submitForm=submitForm;
    module.getPending=getPending;
    module.getSubmitted=getSubmitted;
    module.getError=getError;
    module.getInProgress=getInProgress;
    module.getDrafts=getDrafts;

    function getForms(params, cb){

    }

    function getForm(params, cb){
        
    }

    function saveDraft(params, cb){
        
    }

    function submitForm(params, cb){
        
    }

    function getPending(params, cb){
        
    }

    function getSubmitted(params, cb){
        
    }

    function getError(params, cb){
        
    }

    function getInProgress(params, cb){
        
    }

    function getDrafts(params, cb){
        
    }

    return module;
})(appForm.api || {});
//mockup $fh apis for Addons.
if (typeof $fh == "undefined"){
    $fh={};
}
if ($fh.forms==undefined){
    $fh.forms=appForm.api;
}

