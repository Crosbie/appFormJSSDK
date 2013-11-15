appForm.utils=(function(module){
    module.extend=extend;
    module.localId=localId;
    function extend(child, parent){
        if (parent.constructor && parent.constructor==Function){
            for (var key in parent.prototype){
                child.prototype[key]=parent.prototype[key];
            }
        }else{
            for (var key in parent){
                child.prototype[key]=parent[key];
            }
        }
    }

    function localId(model){
        var props = model.getProps();
        var _id = props._id;
        var _type = props._type;
        var ts = (new Date()).getTime();
        if (_id && _type) {
            return _id + "_" + _type + "_" + ts;
        } else if (_id) {
            return _id + "_" + ts;
        } else if (_type) {
            return _type + "_" + ts;
        } else {
            return ts;
        }
    }

    return module;
})(appForm.utils ||{});