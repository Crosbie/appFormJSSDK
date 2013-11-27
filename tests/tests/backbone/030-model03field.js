var assert = chai.assert;
var bbField;

describe("Backbone - Field Model", function() {
    it("create model & collection", function(done) {

        // use Sample Form/Field data
        var Form = appForm.models.Form;
        new Form({
            formId: "527d4539639f521e0a000004",
            fromRemote: true
        }, function(err, f) {
            form = f;
            fieldModel = form.getFieldModelById("527d4539639f521e0a000006");
            assert(fieldModel);

            // create backbone field Model from core field model
            bbField = new FieldModel(fieldModel);
            assert.ok(bbField);

            // create collection
            var fields = new Fields();
            assert.ok(fields);
            done();
        });
    });

    it("get field name", function(done) {
        assert.ok(bbField.get("name"));
        done();
    });

    it("process inputValue", function(done) {
        assert.ok(bbField.processInput("test"));
        done();
    });
});