/**
 * extension of Field class to support file field
 */

appForm.models.Field = (function(module) {
    module.prototype.process_file = function(inputValue) {

        if (typeof inputValue != "object" || !inputValue instanceof HTMLInputElement ) {
            throw ("the input value for processing file field should be a html file input element");
        }
        var files=inputValue.files;
        console.log("Start to store "+ files.length+" files to file system");
        

        return obj;
    }
    module.prototype.convert_file = function(value) {
        var rtn=[];
        for (var i=0;i<value.length;i++){
            rtn.push(value[i].selections);
        }
        return rtn;
    }
    return module;
})(appForm.models.Field || {});