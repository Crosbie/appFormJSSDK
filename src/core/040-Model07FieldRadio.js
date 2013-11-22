/**
 * extension of Field class to support radio field
 */

appForm.models.Field=(function(module){
    module.prototype.getRadioOption=function(){
        var def=this.getFieldDefinition();
        if (def["radioChoices"]){
            return def["radioChoices"];
        }else{
            throw ("Radio choice definition is not found in field definition");
        }
    }
    return module;
})(appForm.models.Field ||{});
