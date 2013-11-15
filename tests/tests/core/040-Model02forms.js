describe("forms model",function(){
    it ("can load forms and refresh the model",function(done){
        var formsModel=appForm.models.forms;
        var timeStamp1=formsModel.getLocalUpdateTimeStamp();
        formsModel.refresh(function(err,model){
            assert(!err);
            var timeStamp2=model.getLocalUpdateTimeStamp();
            assert(timeStamp1!=timeStamp2);
        });
    });
    it ("can load forms and refresh the model forcely from remote",function(done){
        var formsModel=appForm.models.forms;
        var timeStamp1=formsModel.getLocalUpdateTimeStamp();
        formsModel.refresh(function(err,model){
            assert(!err);
            var timeStamp2=model.getLocalUpdateTimeStamp();
            assert(timeStamp1!=timeStamp2);
        });
    });
});