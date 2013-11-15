describe("Ajax", function() {
    it("should do a GET request", function(done) {
        appForm.web.ajax.get('mbaas/forms/fdsa', function(err, res) {
            assert(!err);
            assert(res);
            var response = JSON.parse(res.response);
            assert(response);
            assert(response.forms);
            assert(response.forms.length === 1);
            done();
        });
    });

    it("should handle a failed GET request", function(done) {
        appForm.web.ajax.get('idontexsist', function(err, res) {
            assert(err);
            assert(!res);
            assert(err.error === "Status not 200!");
            assert(err.body === "Cannot GET /idontexsist");
            done();
        });
    });
});