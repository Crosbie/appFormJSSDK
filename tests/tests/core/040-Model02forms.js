describe("forms model",function(){
    it ("can load forms and refresh the model",function(done){
        var formsModel=appForm.models.forms;
        var timeStamp1=formsModel.getLocalUpdateTimeStamp();
        formsModel.refresh(function(err,model){
            assert(!err);
            var timeStamp2=model.getLocalUpdateTimeStamp();
            assert(timeStamp1!=timeStamp2);
            done();
        });
    });
    it ("can load forms and refresh the model forcely from remote",function(done){
        var formsModel=appForm.models.forms;
        var timeStamp1=formsModel.getLocalUpdateTimeStamp();
        formsModel.refresh(true, function(err,model){
            assert(!err);
            var timeStamp2=model.getLocalUpdateTimeStamp();
            assert(timeStamp1!=timeStamp2);
            done();
        });
    });

    it ("can load a formMeta data by its form id",function(){
        var formsModel=appForm.models.forms;
        var form=formsModel.getFormMetaById("527d4539639f521e0a000004");
        assert(form);
        assert(form._id=="527d4539639f521e0a000004");
        assert(form.lastUpdated);
    });

    it ("should check if a form is up to date",function(done){
        var form=new appForm.models.Form("527d4539639f521e0a000004",function(er r){
            assert(!err);
            
        });
    });
});