appForm.stores=(function(module){
    module.Store=Store;

    function Store(name){
        this.name=name
    };

    Store.prototype.create=function(model,cb){throw("Create not implemented:"+this.name);}
    Store.prototype.read=function(modelId,cb){throw("Read not implemented:"+this.name);}
    Store.prototype.update=function(model,cb){throw("Update not implemented:"+this.name);}
    Store.prototype.delete=function(modelId,cb){throw("Delete not implemented:"+this.name);}
    Store.prototype.upsert=function(model,cb){throw("Upsert not implemented:"+this.name);}
    return module;
})(appForm.stores || {});
