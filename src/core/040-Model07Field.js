/**
 * Field model for form
 * @param  {[type]} module [description]
 * @return {[type]}        [description]
 */
appForm.models = (function(module) {

    var Model = appForm.models.Model;

    function Field(opt) {
        Model.call(this, {
            "_type": "field"
        });
        if (opt) {
            this.fromJSON(opt);
            this.genLocalId();
        }
    }
    appForm.utils.extend(Field, Model);

    Field.prototype.isRequired = function() {
        return this.get("required");
    }
    Field.prototype.getFieldValidation = function() {
        return this.getFieldOptions()['validation'] || {};
    }
    Field.prototype.getFieldDefinition = function() {
        return this.getFieldOptions()['definition'] || {};
    }
    Field.prototype.getFieldOptions = function() {
        return this.get("fieldOptions", {
            "validation": {},
            "definition": {}
        });
    }
    Field.prototype.isRepeating = function() {
        return this.get("repeating", false);
    }
    /**
     * retrieve field type.
     * @return {[type]} [description]
     */
    Field.prototype.getType = function() {
        return this.get("type", "text");
    }
    Field.prototype.getFieldId = function() {
        return this.get("_id", "");
    }
    Field.prototype.getName = function() {
        return this.get("name", "unknown name");
    }
    Field.prototype.getHelpText = function() {
        return this.get("helpText", "");
    }
    /**
     * Process an input value. convert to submission format. run field.validate before this
     * @param  {[type]} inputValue 
     * @return {[type]}           submission json used for fieldValues for the field
     */
    Field.prototype.processInput = function(inputValue) {
        var type = this.getType();
        var processorName = "process_" + type;
        // try to find specified processor
        if (this[processorName] && typeof this[processorName] == "function") {
            return this[processorName](inputValue);
        } else {
            return inputValue;
        }
    }
    /**
     * validate a input with this field.
     * @param  {[type]} inputValue [description]
     * @return true / error message
     */
    Field.prototype.validate=function(inputValue){
        return appForm.models.fieldValidate.validate(inputValue,this);
    }

    Field.prototype.retrieveValueFromSubmission=function(submissionModel){
        var id=this.getFieldId();
    }
    module.Field = Field;
    return module;
})(appForm.models || {});