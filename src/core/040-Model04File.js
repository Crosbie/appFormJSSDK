appForm.models=(function(module){
    var Model=appForm.models.Model;
    module.File=File;

    function File(){
        Model.call(this,{
            "_type":"file"
        })
    }
    appForm.utils.extend(File,Model);

    /**
     * Upload current file to remote
     * @param  {Function} cb [description]
     * @return {[type]}      [description]
     */
    File.prototype.upload=function(cb){

    }

    return module;
})(appForm.models || {});