CoreModel = Backbone.Model.extend({
    defaults: {
        "bridgeFuncs": []
    },
    initialize: function(id) {
        var funcs = this.get("bridgeFuncs");
        var that = this;

        for (var i = 0, funcName;i<funcs.length; i++) {

            funcName = funcs[i];
            this[funcName] = (function(fcName) {
                return function() {
                    var model=that.get("_model");
                    if (model){
                        return model[fcName].apply(model, arguments);
                    }else{
                        throw ("Bridge model is not initialised");
                    }
                };
            })(funcName);
        }
    },
    loadData:function(cb){
        throw('not implemented');
    },
    get:function(key,def){
        var res=CoreModel.__super__.get.apply(this, arguments);
        if (res){
            return res;
        }else{
            var model=this.attributes["_model"];
            if (model){
                return model.get(key,def);
            }else{
                return def;
            }
        }
    }
});