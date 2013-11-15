var appForm=(function(module){
    module.init=init;

    function init(params, cb){
        if (typeof cb =="undefined"){
            cb=params;
        }
        appForm.config=appForm.models.config;
        appForm.config.init();
        cb();
    }

    return module;
})(appForm || {});
