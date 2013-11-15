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
        var url=_getUrl(model);
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
    
    function _getUrl(model){
        var type=model.get("_type");
        var host=appForm.config.get("cloudHost");
        var mBaaSBaseUrl=appForm.config.get("mbaasBaseUrl");
        var formUrls=appForm.config.get("formUrls");
        if (formUrls[type]){
            var relativeUrl=formUrls[type];    
        }else{
            throw("type not found to get url:"+type);
        }   
        
        var url= host+mBaaSBaseUrl+relativeUrl;

        switch (type){
            case "form":
                url=url.replace(":formId",model.get("_id"));
        }
        return url;
    }
    

    return module;
})(appForm.stores || {});