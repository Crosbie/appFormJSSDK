describe("Form model", function() {
    it("how to initialise a form with a formid", function(done) {
        var Form = appForm.models.Form;
        var error = false;
        try {
            //throw error since no form id
            var form = new Form()
        } catch (e) {
            error = true;
        }
        assert(error);

        var error = false;
        try {
            //load from local then from remote.
            new Form("527d4539639f521e0a000004", function(err, form) {
                assert(!err);
                assert(form);
                assert(form.get("_id") == "527d4539639f521e0a000004");
                assert(form.getLastUpdate());
                assert(form.get("name") == "testFieldsForm");
                done();
            });
        } catch (e) {
            console.log(e);
            error = true;
        }
        assert(!error);
        if (error) {
            done();
        }
    });
    it("how to initialise a form and pop data associated forcely from remote", function(done) {
        var Form = appForm.models.Form;
        var form = new Form("527d4539639f521e0a000004", true, function(err, form) {
            assert(!err);
            assert(form);
            assert(form.get("_id") == "527d4539639f521e0a000004");
            assert(form.getLastUpdate());
            assert(form.get("name") == "testFieldsForm");
            done();
        });
    });

    it("if form id is not found when trying to pop data, it will return error ", function(done) {
        var Form = appForm.models.Form;
        var form = new Form("somerandomformid", function(err, form) {
            assert(err);
            assert(form);

            done();
        });
    });
    it ("how to get form general properties (name, description,etc)",function(done){
         var Form = appForm.models.Form;
        var form = new Form("527d4539639f521e0a000004", true, function(err, form) {
            assert(form.getName());
            assert(form.getDescription());
            assert(form.getPageRules());
            assert(form.getFieldRules());
            done(); 
        });
    });
    it ("how to get pages associated to the form",function(done){
        var Form = appForm.models.Form;
       new Form("527d4539639f521e0a000004", true, function(err, form) {
            var pageList=form.getPageModelList();
            assert(pageList);
            assert(pageList.length==1);
            done(); 
        });
    });

    it ("how to get a field model by field id",function(done){
       var Form = appForm.models.Form;
       new Form("527d4539639f521e0a000004", true, function(err, form) {
            var fieldModel=form.getFieldModelById("527d4539639f521e0a000006");
            assert(fieldModel);
            assert(fieldModel.get("_id") == "527d4539639f521e0a000006");
            done(); 
        });
    });
    it ("how to get a page model by page id",function(done){
       var Form = appForm.models.Form;
       new Form("527d4539639f521e0a000004", true, function(err, form) {
            var pageModel=form.getPageModelById("527d4539639f521e0a000005");
            assert(pageModel);
            assert(pageModel.get("_id") == "527d4539639f521e0a000005");
            done(); 
        });
    });

});