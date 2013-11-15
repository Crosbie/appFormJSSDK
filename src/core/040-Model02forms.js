appForm.models=(function(module){
    var Model=appForm.models.Model;
    module.forms=new Forms();

    function Forms(){
        Model.call(this,{
            "_type":"forms"
        });
    }
    appForm.utils.extend(Forms,Model);
    //retrieve forms definition
    Forms.prototype.getForms=function(cb){
        var dataAgent=appForm.stores.dataAgent;
        var that=this;
        dataAgent.read(this,function(err,res){
            if (!err && res){
                that.fromJSON(res);
                cb(null,res);
            }else{
                cb(err,res);
            }
        });
    }

    return module;
})(appForm.models ||{});