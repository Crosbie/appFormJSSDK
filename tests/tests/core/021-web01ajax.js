describe("Ajax", function() {
    it("should do a GET request", function(done) {
        appForm.web.ajax.get('mbaas/forms/fdsa', function(err, res) {
            assert(!err);
            assert(res);
            assert(res.status === "ok");
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
            assert(err.status === "not ok");
            assert(err.error === "Status not 200!");
            assert(err.body === "Cannot GET /idontexsist");
            done();
        });
    });

    it("should do a POST request", function(done) {
        appForm.web.ajax.post('mbaas/forms', '{ "Name": "Foo", "Id": 1234, "Rank": 7 }', function(err, res) {
            assert(!err);
            assert(res);
            var response = JSON.parse(res.response);
            assert(response);
            assert(response.status === 'ok');
            assert(response.body);
            assert(response.body.Name === "Foo");
            assert(response.body.Id === 1234);
            assert(response.body.Rank === 7);
            done();
        });
    });

    it("should handle a failed POST request", function(done) {
        appForm.web.ajax.post('idontexsist', '{ "Name": "Foo", "Id": 1234, "Rank": 7 }', function(err, res) {
            console.log(err,res);
            assert(err);
            assert(!res);
            assert(err.status === "not ok");
            assert(err.error === "Status not 200!");
            assert(err.body === "Cannot POST /idontexsist");
            done();
        });
    });
});