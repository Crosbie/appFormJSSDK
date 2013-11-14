appForm.utils=(function(module){
    module.extend=extend;

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

    return module;
})(appForm.utils ||{});