appForm.stores=(function(module){
    module.mBaaS=new MBaaS();

    var Store=appForm.stores.Store;
    function MBaaS(){
        Store.call(this,"MBaaS");
    }
    appForm.utils.extend(MBaaS,Store);
    MBaaS.prototype.create=function(model,cb){

    }
    MBaaS.prototype.read=function(model,cb){
        
    }
    MBaaS.prototype.update=function(model,cb){
        
    }
    MBaaS.prototype.delete=function(model,cb){
        
    }

    return module;
})(appForm.stores || {});