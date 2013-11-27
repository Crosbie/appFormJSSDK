var assert = chai.assert;
var fieldView;

describe("Backbone - FieldText View", function() {
    it("create & render FieldText View", function(done) {

        var Form = appForm.models.Form;
        new Form({
            formId: "527d4539639f521e0a000004",
            fromRemote: true
        }, function(err, f) {
            form = f;
            fieldModel = form.getFieldModelById("527d4539639f521e0a000006");
            assert(fieldModel);

            // create backbone field Model
            var bbField = new FieldModel(fieldModel);
            assert.ok(bbField);
            
            // create backbone field View
            fieldView = new FieldTextView({ //required params
                parentEl: $("<div></div>"),
                parentView: null,
                model: bbField
            });
            assert.ok(fieldView);
            done();
        });
    });
});