var assert = chai.assert;
var bbForm;

describe("Backbone - Form Model", function() {
    it("create model", function(done) {
        bbForm=new FormModel({
            formId:"527d4539639f521e0a000004"
        });
        bbForm.loadForm(function(){
            assert.ok(bbForm.getName());
            done();
        });
       
    });

    it("get Form name", function(done) {
        assert.ok(bbForm.getName());
        assert(bbForm.get("name") == bbForm.getName());
        done();
    });
});