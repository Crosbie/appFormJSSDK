describe("Field Model",function(){
    var fieldModel;
    var form=null;
    it ("Field model is initialised when a form is initialised",function(done){
        var Form = appForm.models.Form;
       new Form({formId:"527d4539639f521e0a000004",fromRemote: true}, function(err, f) {
            form=f;
            fieldModel=form.getFieldModelById("527d4539639f521e0a000006");
            assert(fieldModel);
            assert(fieldModel.get("_id") == "527d4539639f521e0a000006");
            done(); 
        });
    });
    it ("check if the field is required",function(){
        assert(!fieldModel.isRequired());
    });
    it ("get field definition (max/min repeat)",function(){
        assert(fieldModel.getFieldDefinition());
    });
    it ("get field validation",function(){
        assert(fieldModel.getFieldValidation());
    });
    it ("check if the field repeating",function(){
        assert(fieldModel.isRepeating());
    });
    it ("get general properties (name, helptext,type,field id, etc)",function(){
        assert(fieldModel.getType());
        assert(fieldModel.getFieldId());
        assert(fieldModel.getName());
        assert(fieldModel.getHelpText());
    });
    describe ("Checkbox",function(){
        it ("get checkbox options",function(){
            var checkBoxFieldModel=form.getFieldModelById("527d4539639f521e0a00000c");
            assert(checkBoxFieldModel.getCheckBoxOptions().length>0);
        });
    });
    describe ("Radio",function(){
        it ("get radio options",function(){
            var radioFieldModel=form.getFieldModelById("527d4539639f521e0a00000a");
            assert(radioFieldModel.getRadioOption().length>0);
        });
    });
    describe ("Matrix",function(){
        it ("get matrix rows and columns",function(){
            var matrixFieldModel=form.getFieldModelById("527d4539639f521e0a00000b");
            assert(matrixFieldModel.getMatrixRows().length>0);
            assert(matrixFieldModel.getMatrixCols().length>0);
        });
    });
});