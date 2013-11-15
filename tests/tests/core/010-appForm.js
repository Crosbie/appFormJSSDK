var assert = chai.assert;


describe("appForm", function() {
    describe("Initialisation", function() {
        it("should call callback", function(done) {
            appForm.init(function(err) {
                assert(!err);
                done();
            });
        });
    });

});