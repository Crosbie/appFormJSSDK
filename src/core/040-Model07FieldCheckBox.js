/**
 * extension of Field class to support checkbox field
 */

appForm.models.Field = (function(module) {
    module.prototype.getCheckBoxOptions = function() {
        var def = this.getFieldDefinition();
        if (def["checkboxChoices"]) {
            return def["checkboxChoices"];
        } else {
            throw ("checkbox choice definition is not found in field definition");
        }
    }
    module.prototype.process_checkbox = function(inputValue) {

        if (typeof inputValue != "array") {
            throw ("the input value for processing checkbox field should be like [val1,val2]");
        }
        var obj = {
            "selections": inputValue
        }

        return obj;
    }
    module.prototype.convert_checkbox = function(value) {
        var rtn=[];
        for (var i=0;i<value.length;i++){
            rtn.push(value[i].selections);
        }
        return rtn;
    }
    return module;
})(appForm.models.Field || {});