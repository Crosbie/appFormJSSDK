appForm.models = (function(module) {
    module.Model = Model;

    function Model(opt) {
        this.props = {
            "_id": null, // model id
            "_type": null, // model type
            "_ludid": null //local unique id
        };
        
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
    /**
     * retrieve model from local or remote with data agent store.
     * @param {boolean} fromRemote optional true--force from remote
     * @param  {Function} cb (err,formsModel)
     * @return {[type]}      [description]
     */
    Model.prototype.refresh=function(fromRemote,cb){
        var dataAgent=this.getDataAgent();
        var that=this;
        if (typeof cb=="undefined"){
            cb=fromRemote;
            fromRemote=false;
        }
        if (fromRemote){
            dataAgent.refreshRead(this,_handler);
        }else{
            dataAgent.read(this,_handler);
        }

        function _handler(err,res){
            if (!err && res){
                that.fromJSON(res);
                cb(null,that);
            }else{
                cb(err,that);
            }
        }

    }
    Model.prototype.getDataAgent=function(){
        if (!this.dataAgent){
            this.setDataAgent(appForm.stores.dataAgent);
        }
        return this.dataAgent;
    }
    Model.prototype.setDataAgent=function(dataAgent){
        this.dataAgent=dataAgent;
    }


    return module;
})(appForm.models || {});