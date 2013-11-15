var appForm=(function(module){
    module.init=init;

    function init(params, cb){
        if (typeof cb =="undefined"){
            cb=params;
        }
        cb();
    }

    return module;
})(appForm || {});
