describe("Submission model", function() {
    it("how to create new submission from a form", function(done) {
        var Form = appForm.models.Form;
        //load form
        var form = new Form({formId:"527d4539639f521e0a000004"}, function(err, form) {
            assert(!err);
            var submission = appForm.models.submission.newInstance(form);
            var localId = submission.getLocalId();
            assert(submission.getStatus() == "new");
            assert(submission);
            assert(localId);
            done();
        });
    });

    it("how to load a submission from local storage without a form", function(done) {
        var Form = appForm.models.Form;
        //load form
        var form = new Form({formId:"527d4539639f521e0a000004"}, function(err, form) {
            assert(!err);
            var submission = appForm.models.submission.newInstance(form);
            var localId = submission.getLocalId();
            submission.saveDraft(function(err) {
                assert(!err);
                appForm.models.submission.fromLocal(localId, function(err, submission1) {
                    assert(!err);
                    assert(submission1.get("formId") == submission.get("formId"));
                    assert(submission1.getStatus() == "draft");
                    done();
                });

            });
        });
    });

    it("will throw error if status is in wrong order", function(done) {
        var Form = appForm.models.Form;
        var error = false;
        //load form
        var form = new Form({formId:"527d4539639f521e0a000004"}, function(err, form) {
            assert(!err);
            var submission = appForm.models.submission.newInstance(form);
            var localId = submission.getLocalId();
            submission.saveDraft(function(err) {
                assert(!err);
                try {
                    submission.submitted(function() {

                    });
                } catch (e) {
                    error = true;
                }
                assert(error);
                done();
            })

        });
    });

    it("how to store a draft,and find it from submissions list", function(done) {
        var Form = appForm.models.Form;
        //load form
        var form = new Form({formId:"527d4539639f521e0a000004"}, function(err, form) {
            assert(!err);
            var submission = appForm.models.submission.newInstance(form);
            var localId = submission.getLocalId();
            
            submission.saveDraft(function(err) {
                assert(!err);
                var localId=submission.getLocalId();
                var meta=appForm.models.submissions.findMetaByLocalId(localId);

                assert(meta._ludid==localId);
                assert(meta.formId==submission.get("formId"));
                done();
            })

        });
    });
    it ("submission model loaded from local should have only 1 reference",function(done){
             var meta=appForm.models.submissions.findByFormId("527d4539639f521e0a000004")[0];
            var localId=meta._ludid;
            appForm.models.submission.fromLocal(localId,function(err,submission1){
                appForm.models.submission.fromLocal(localId,function(err,submission2){
                    assert(submission1 === submission2);
                    done();
                });
                
            });
        });
    describe("comment", function() {
        it("how to add a comment to a submission with or without a user", function(done) {
            var meta=appForm.models.submissions.findByFormId("527d4539639f521e0a000004")[0];
            // debugger;
            var localId=meta._ludid;
            appForm.models.submission.fromLocal(localId,function(err,submission){
                assert(!err);
                var ts1=submission.addComment("hello world");
                var ts2=submission.addComment("test","testerName");
                var comments=submission.getComments();
                assert(comments.length>0);
                var str=JSON.stringify(comments);
                assert(str.indexOf("hello world")>-1);
                assert(str.indexOf("testerName")>-1);
                done();
            });
        });

        it ("how to remove a comment from submission",function(done){
             var meta=appForm.models.submissions.findByFormId("527d4539639f521e0a000004")[0];
            var localId=meta._ludid;
            appForm.models.submission.fromLocal(localId,function(err,submission){
                assert(!err);
                var ts1=submission.addComment("hello world");
                submission.removeComment(ts1);
                var comments=submission.getComments();
                
                var str=JSON.stringify(comments);
                assert(str.indexOf(ts1.toString())==-1);
                done();
            });
        });

    });

});