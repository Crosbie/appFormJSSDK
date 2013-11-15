appForm.models=(function(module){
    var Model=appForm.models.Model;
    module.config=new Config();

    function Config(){
        Model.call(this,{
            "_type":"config"
        });
    }
    appForm.utils.extend(Config,Model);
    Config.prototype.init=function(cb){
        this.set("appId",$fh.app_props.appid);
        this._initMBaaS();

    }

    Config.prototype._initMBaaS=function(){
        var cloud_props=$fh.cloud_props;
        var app_props=$fh.app_props;
        var cloudUrl=app_props.host;
        var mode=app_props.mode?app_props.mode:"dev";
        if (cloud_props && cloud_props.hosts){
            if (mode.indexOf("dev")>-1){ //dev mode
                cloudUrl=cloud_props.hosts.debugCloudUrl;
            }else{ //live mode
                cloudUrl=cloud_props.hosts.releaseCloudUrl;
            }
        }
        this.set("cloudHost",cloudUrl);

        this.set("mbaasBaseUrl","/mbaas");
        var appId=this.get("appId");
        //ebaas url definition https://docs.google.com/a/feedhenry.com/document/d/1_bd4kZMm7q6C1htNJBTSA2X4zi1EKx0hp_4aiJ-N5Zg/edit#
        this.set("formUrls",{
            "forms":"/forms/"+appId,
            "form":"/forms/"+appId+"/:formId",
            "theme":"/forms/"+appId+"/theme"
            //TODO complete the list. 
        })
    }
    

    return module;
})(appForm.models ||{});