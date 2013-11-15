describe("Config module",function(){
    function config(){
        return appForm.config;
    }
    
    it ("should has general app info",function(){
        assert(config().get("appId"));
        assert(config().get("cloudHost"));
        assert(config().get("mbaasBaseUrl"));
        assert(config().get("formUrls"));
    });
});