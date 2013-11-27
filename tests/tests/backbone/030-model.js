var assert = chai.assert;


describe("Backbone - Core Model", function() {
    it("create model", function(done) {
        coreModel = new CoreModel();
        assert.ok(coreModel);
        done();
    });
});