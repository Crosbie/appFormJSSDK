describe("Local Storage store", function() {
    it("should be extending Store", function() {
        assert(appForm.stores.localStorage.name == "LocalStorage");
    });
    it("should store a model instance to localstorage", function(done) {
        var Model = appForm.models.Model;
        var model = new Model();
        appForm.stores.localStorage.create(model, function(err, res) {

            assert(!err);
            assert(res);
            assert(res.key == model.getLocalId());
            assert(res.val);

            done();
        });
    });

    it("should store a model instance and read the data back", function(done) {
        var Model = appForm.models.Model;
        var model = new Model();
        model.set("hello", "world");
        appForm.stores.localStorage.create(model, function(err, res) {
            var key = res.key;
            appForm.stores.localStorage.read(key, function(err, res) {
                assert(!err);
                assert(res.key == key);
                var model1 = new Model();
                model1.fromJSONStr(res.val);
                assert(model1.get("hello") == "world");
                assert(model1.getLocalId() == model.getLocalId());
                done();
            });
        });
    });

    it("should read an instance which does not exist", function(done) {
        appForm.stores.localStorage.read("unknownkey", function(err, res) {
            assert(!err);
            assert(res.key == "unknownkey");
            assert(res.val == null);
            done();
        });
    });
    it("should remove an existed instance", function(done) {
        var Model = appForm.models.Model;
        var model = new Model();
        model.set("hello", "world");
        appForm.stores.localStorage.create(model, function(err, res) {
            var key = res.key;
            appForm.stores.localStorage.delete(key, function(err, res) {
                assert(!err);
                assert(res.key == key);
                appForm.stores.localStorage.read(key, function(err, res) {
                    assert(!err);
                    assert(res.key == key);
                    assert(res.val == null);
                    done();
                });

            });

        });
    });

    it ("shoudl remove an non-existed instance",function(done){
        appForm.stores.localStorage.delete("unknownkey", function(err, res) {
            assert(err);
            assert(res);
            done();
        });
    });
});