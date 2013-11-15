appForm.models=(function(module){
    var Model=appForm.models.Model;
    module.forms=new Forms();

    function Forms(){
        Model.call(this,{
            "_type":"forms",
            "loaded":false
        });
    }
    appForm.utils.extend(Forms,Model);
    /**
     * retrieve forms definition
     * @param {boolean} fromRemote optional true--force from remote
     * @param  {Function} cb (err,formsModel)
     * @return {[type]}      [description]
     */
    Forms.prototype.refresh=function(fromRemote,cb){
        var dataAgent=appForm.stores.dataAgent;
        var that=this;
        if (typeof cb=="undefined"){
            cb=fromRemote;
            fromRemote=false;
        }
        if (fromRemote){
            dataAgent.refreshRead(this,_handler);
        }else{
            dataAgent.read(this,_handler);
        }

        function _handler(err,res){
            if (!err && res){
                that.fromJSON(res);
                cb(null,that);
            }else{
                cb(err,that);
            }
        }

    }

    Forms.prototype.isFormUpdated=function(formModel,cb){

    }

    

    return module;
})(appForm.models ||{});