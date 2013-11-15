describe("Form model", function() {
    it("should ask for formid", function() {
        var Form = appForm.models.Form;
        var error = false;
        try {
            var form = new Form()
        } catch (e) {
            error = true;
        }
        assert(error);

        var error = false;
        try {
            var form = new Form("mockid");
        } catch (e) {
            console.log(e);
            error = true;
        }
        assert(!error);
    });
    it("should initialise itself if a cb passed", function(done) {
        var Form = appForm.models.Form;
        var form = new Form("527d4539639f521e0a000004", function(err, form) {
            assert(!err);
            assert(form);
            assert(form.get("_id") == "527d4539639f521e0a000004");
            assert(form.getLastUpdate());
            assert(form.get("name") == "testFieldsForm");
            done();
        });
    });

    it("should callback an error if a formid is not valid", function(done) {
        var Form = appForm.models.Form;
        var form = new Form("somerandomformid", function(err, form) {
            console.log(err);
            console.log(form);
            assert(err);
            assert(form);
            
            done();
        });
    });
});