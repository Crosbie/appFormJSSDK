var assert = chai.assert;


describe("Backbone - Field Model", function() {
    it("create model & collection", function(done) {
        App.models.fieldModel = new FieldModel();
        assert.ok(App.models.fieldModel);

        App.collections.fields = new Fields();
        assert.ok(App.collections.fields);
        done();
    });

    it("set field Type", function(done) {
        App.models.fieldModel.set("Type", "text");
        assert.equal(App.models.fieldModel.getType(), "text");
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