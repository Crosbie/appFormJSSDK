appForm.stores = (function(module) {
    module.localStorage = new LocalStorage();


    //implementation
    var fileSystemAvailable=false;
    var _requestFileSystem=function(){}; //placeholder
    var PERSISTENT=1; //placeholder

    function LocalStorage() {
        appForm.stores.Store.call(this, "LocalStorage");
    };
    appForm.utils.extend(LocalStorage, appForm.stores.Store);
    //store a model to local storage
    LocalStorage.prototype.create = function(model, cb) {
        var key = _genKey(model);
        model.setLocalId(key);
        this.update(model,cb);
        
    }
    //read a model from local storage
    LocalStorage.prototype.read = function(localId, cb) {
        var key=localId;
        _fhData({
            "act":"load",
            "key":key
        },cb,cb);
    }
    //update a model
    LocalStorage.prototype.update = function(model, cb) {
        var key=model.getLocalId();
        var data=model.getProps();
        _fhData({
            "act":"save",
            "key":key,
            "val":data
        },cb,cb);
    }
    //delete a model
    LocalStorage.prototype.delete = function(localId, cb) {
        var key=localId;
        _fhData({
            "act":"remove",
            "key":key
        },cb,cb);
    }
    LocalStorage.prototype.upsert=function(model,cb){
        var key=model.getLocalId();
        if (key==null){
            this.create(model,cb);
        }else{
            this.update(model,cb);
        }
    }


    //gen a key according to a model
    function _genKey(model) {
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

    //use different local storage model according to environment
    function _fhData(){
        if (fileSystemAvailable){
            _fhFileData.apply({},arguments);
        }else{
            _fhLSData.apply({},arguments);
        }
    }
    //use $fh data
    function _fhLSData(options,success,failure){
        $fh.data(options,function(res){success(null,res);},failure);
    }
    //use file system
    function _fhFileData(options, success, failure) {
        function fail(msg) {
            console.log('fail: msg= ' + msg);
            if (typeof failure !== 'undefined') {
                return failure(msg, {});
            } else {
                console.log('failure: ' + msg);
            }
        }

        function filenameForKey(key, cb) {
            key=key+$fh.app_props.appid ;
            console.log('filenameForKey: ' + key);
            $fh.hash({
                algorithm: "MD5",
                text: key
            }, function(result) {
                var filename = result.hashvalue + '.txt';
                if (typeof navigator.externalstorage !== "undefined") {
                    navigator.externalstorage.enable(function handleSuccess(res) {
                        var path = filename;
                        if (res.path) {
                            path = res.path;
                            if (!path.match(/\/$/)) {
                                path += '/';
                            }
                            path += filename;
                        }
                        filename = path;
                        console.log('filenameForKey key=' + key + ' , Filename: ' + filename);
                        return cb(filename);
                    }, function handleError(err) {
                        console.warn('filenameForKey ignoring error=' + JSON.stringify(err));
                        console.log('filenameForKey key=' + key + ' , Filename: ' + filename);
                        return cb(filename);
                    })
                } else {
                    console.log('filenameForKey key=' + key + ' , Filename: ' + filename);
                    return cb(filename);
                }

            });
        }

        function save(key, value) {
            filenameForKey(key, function(hash) {
                _requestFileSystem(PERSISTENT, 0, function gotFS(fileSystem) {
                    fileSystem.root.getFile(hash, {
                        create: true
                    }, function gotFileEntry(fileEntry) {
                        fileEntry.createWriter(function gotFileWriter(writer) {
                            console.log('save: ' + key + ', ' + JSON.stringify(value).substring(0, 50) + '. Filename: ' + hash);
                            writer.onwrite = function(evt) {
                                return success(null,{
                                    key: key,
                                    val: value
                                });
                            };
                            var valStr=JSON.stringify(value);
                            try{
                                //try to write a string
                                writer.write(valStr);    
                            }catch(e){
                                var blob=new Blob([valStr],{type : 'text/plain'});
                                writer.write(blob);
                            }
                            
                        }, function() {
                            fail('[save] Failed to create file writer');
                        });
                    }, function() {
                        fail('[save] Failed to getFile');
                    });
                }, function() {
                    fail('[save] Failed to requestFileSystem');
                });
            });
        }

        function remove(key) {
            filenameForKey(key, function(hash) {
                console.log('remove: ' + key + '. Filename: ' + hash);

                _requestFileSystem(PERSISTENT, 0, function gotFS(fileSystem) {
                    fileSystem.root.getFile(hash, {}, function gotFileEntry(fileEntry) {
                        console.log('remove: ' + key + '. Filename: ' + hash);
                        fileEntry.remove(function() {
                            return success(null,{
                                key: key,
                                val: null
                            });
                        }, function() {
                            fail('[remove] Failed to remove file');
                        });
                    }, function() {
                        fail('[remove] Failed to getFile');
                    });
                }, function() {
                    fail('[remove] Failed to get fileSystem');
                });
            });
        }

        function load(key) {
            filenameForKey(key, function(hash) {
                _requestFileSystem(PERSISTENT, 0, function gotFS(fileSystem) {
                    fileSystem.root.getFile(hash, {}, function gotFileEntry(fileEntry) {
                        fileEntry.file(function gotFile(file) {
                            var reader = new FileReader();
                            reader.onloadend = function(evt) {
                                var text = evt.target.result;
                                // Check for URLencoded
                                // PG 2.2 bug in readAsText()
                                try {
                                    text = decodeURIComponent(text);
                                } catch (e) {
                                    // Swallow exception if not URLencoded
                                    // Just use the result
                                }
                                console.log('load: ' + key + '. Filename: ' + hash + " value:" + evt.target.result);
                                return success(null,{
                                    key: key,
                                    val: text
                                });
                            };
                            reader.readAsText(file);
                        }, function() {
                            fail('[load] Failed to getFile');
                        });
                    }, function() {
                        // Success callback on key load failure
                        success(null,{
                            key: key,
                            val: null
                        });
                    });
                }, function() {
                    fail('[load] Failed to get fileSystem');
                });
            });
        }
        if (typeof options.act === 'undefined') {
            return load(options.key);
        } else if (options.act === 'save') {
            return save(options.key, options.val);
        } else if (options.act === 'remove') {
            return remove(options.key);
        } else if (options.act === 'load') {
            return load(options.key);
        } else {
            if (typeof failure !== 'undefined') {
                return failure("Action [" + options.act + "] is not defined", {});
            }
        }
    }
    function _checkEnv(){
        if (window.requestFileSystem){
            _requestFileSystem=window.requestFileSystem;
            fileSystemAvailable=true;
        }else if (window.webkitRequestFileSystem){
            _requestFileSystem=window.webkitRequestFileSystem;
            fileSystemAvailable=true;
        }else {
            console.error("No filesystem available. Fallback use $fh.data for storage");
        }
        if (window.LocalFileSystem){
            PERSISTENT=window.LocalFileSystem.PERSISTENT;
        }else if (window.PERSISTENT){
            PERSISTENT=window.PERSISTENT;
        }
    }
    _checkEnv();

    return module;
})(appForm.stores || {});