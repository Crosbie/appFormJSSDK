appForm.models = (function(module) {
    module.Model = Model;

    function Model(opt) {
        this.props = {
            "_id": null, // model id
            "_type": null, // model type
            "_ludid": null //local unique id
        };
        this.store = null;
        if (typeof opt != "undefined") {
            for (var key in opt) {
                this.props[key] = opt[key];
            }
        }
    }
    Model.prototype.getProps = function() {
        return this.props;
    }

    Model.prototype.get = function(key) {
        return this.props[key];
    }

    Model.prototype.set = function(key, val) {
        this.props[key] = val;
    }

    Model.prototype.setLocalId = function(localId) {
        this.set("_ludid", localId);
    }
    Model.prototype.getLocalId = function() {
        return this.get("_ludid");
    }
    Model.prototype.fromJSON = function(json) {
        if (typeof json == "string") {
            this.fromJSONStr(json);
        } else {
            for (var key in json) {
                this.set(key, json[key]);
            }
        }
        this.touch();

    }
    Model.prototype.fromJSONStr = function(jsonStr) {
        try {
            var json = JSON.parse(jsonStr);
            this.fromJSON(json);
        } catch (e) {
            console.error(e);
        }
    }
    Model.prototype.equalTo = function(model) {
        var props = model.getProps();
        for (var key in this.props) {
            if (this.props[key] != props[key]) {
                return false;
            }
        }
        for (var key in props) {
            if (this.props[key] != props[key]) {
                return false;
            }
        }
        return true;
    }
    Model.prototype.touch=function(){
        this.set("_localLastUpdate",(new Date()).getTime());
    }
    Model.prototype.getLocalUpdateTimeStamp=function(){
        return this.get("_localLastUpdate");
    }


    return module;
})(appForm.models || {});