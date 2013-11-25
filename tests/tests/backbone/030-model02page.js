var assert = chai.assert;


describe("Backbone - Page Model", function() {
    it("create model & collection", function(done) {
        App.models.pageModel = new PageModel();
        assert.ok(App.models.pageModel);

        App.collections.pages = new Pages();
        assert.ok(App.collections.pages);
        done();
    });

    it("set page title", function(done) {
        App.models.pageModel.set("Title", "Test Page");
        assert.equal(App.models.pageModel.get("Title"), "Test Page");
        done();
    });

    it("page.toJSON()", function(done) {
        var pageJSON = App.models.pageModel.toJSON();
        var obj ={"Title":"Test Page","Fields":[],"Rules":[]};
        console.log(obj,pageJSON);
        assert.equal(JSON.stringify(pageJSON), JSON.stringify(obj));
        done();
    });
});