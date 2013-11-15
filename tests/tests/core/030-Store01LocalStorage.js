describe("Local Storage store", function() {
    after(function() {
        appForm.stores.localStorage.switchFileSystem(true);
    })
    it("should be extending Store", function() {
        assert(appForm.stores.localStorage.name == "LocalStorage");
    });
    it("should store a model instance to localstorage", function(done) {
        var Model = appForm.models.Model;
        var model = new Model();
        appForm.stores.localStorage.create(model, function(err, res) {

            assert(!err);
            assert(res);
            done();
        });
    });

    it("should store a model instance and read the data back", function(done) {
        var Model = appForm.models.Model;
        var model = new Model();
        model.set("hello", "world");
        appForm.stores.localStorage.create(model, function(err, res) {
            appForm.stores.localStorage.read(model, function(err, res) {
                assert(!err);
                var model1 = new Model();
                model1.fromJSONStr(res);
                assert(model1.get("hello") == "world");
                assert(model1.getLocalId() == model.getLocalId());
                done();
            });
        });
    });

    it("should read an instance which does not exist", function(done) {
        var Model = appForm.models.Model;
        var model = new Model();
        model.setLocalId("unknownkey");
        appForm.stores.localStorage.read(model, function(err, res) {
            assert(!err);
            assert(res == null);
            done();
        });
    });
    it("should remove an existed instance", function(done) {
        var Model = appForm.models.Model;
        var model = new Model();
        model.set("hello", "world");
        appForm.stores.localStorage.create(model, function(err, res) {
            appForm.stores.localStorage.delete(model, function(err, res) {
                assert(!err);
                assert(res == null);
                appForm.stores.localStorage.read(model, function(err, res) {
                    assert(!err);
                    assert(res == null);
                    done();
                });

            });

        });
    });

    it("shoudl remove an non-existed instance", function(done) {
        var Model = appForm.models.Model;
        var model = new Model();
        model.setLocalId("unknownkey");
        appForm.stores.localStorage.delete(model, function(err, res) {
            assert(err);
            assert(res);
            done();
        });
    });


});
describe("Fallback use $fh data / how to forcely use $fh data", function() {
        
        before(function(){
            appForm.stores.localStorage.switchFileSystem(false);
        });
        after(function() {
            appForm.stores.localStorage.switchFileSystem(true);
        });
        it("how to forcely use $fh data / shoudl fall back use $fh data if failed use file system api", function(done) {

            var Model = appForm.models.Model;
            var model = new Model();
            appForm.stores.localStorage.create(model, function(err, res) {

                assert(!err);
                assert(res);
                done();
            });
        });
    });