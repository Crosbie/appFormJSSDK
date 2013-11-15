appForm.stores=(function(module){
    var Store=appForm.stores.Store;
    
    module.mBaaS=new MBaaS();
    
    function MBaaS(){
        Store.call(this,"MBaaS");
    }
    appForm.utils.extend(MBaaS,Store);
    MBaaS.prototype.create=function(model,cb){

    }
    MBaaS.prototype.read=function(model,cb){
        var type=model.get("_type");
        //Add hot types here
        var url=_getUrl(type);
        appForm.web.ajax.get(url,function(err,res){
            if (err){
                cb(err);
            }else{
                cb(null,res.response);
            }
        });
    }
    MBaaS.prototype.update=function(model,cb){
        
    }
    MBaaS.prototype.delete=function(model,cb){
        
    }
    
    function _getUrl(type){
        var host=appForm.config.get("cloudHost");
        var mBaaSBaseUrl=appForm.config.get("mbaasBaseUrl");
        var formUrls=appForm.config.get("formUrls");
        if (formUrls[type]){
            var relativeUrl=formUrls[type];    
        }else{
            throw("type not found to get url:"+type);
        }   
        
        return host+mBaaSBaseUrl+relativeUrl;
    }
    

    return module;
})(appForm.stores || {});