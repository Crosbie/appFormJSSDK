appForm.models=(function(module){
    var Model=appForm.models.Model;
    /**
     * Describe rules associated to one field.
     * @param {[type]} param {"type":"page | field", "definition":defJson}
     */
    function Rule(param){
        Model.call(this,{
            "_type":"rule"
        });
        this.fromJSON(param);
    }
    appForm.utils.extend(Rule,Model);
    /**
     * Return source fields id required from input value for this rule
     * @return [fieldid1, fieldid2...] [description]
     */
    Rule.prototype.checkSourceFields=function(){
        var def=this.getDefinition();
        var statements=def.ruleConditionalStatements;
        var rtn=[];
        for (var i=0, statement; statement=statements[i];i++){
            rtn.push(statement.sourceField);
        }
        return rtn;
    }
    /**
     * test if input value meet the condition
     * @param  {[type]} param {fieldId:value, fieldId2:value2}
     * @return {[type]}       [description]
     */
    Rule.prototype.test=function(param){
        var fields=this.checkSourceFields();
    }
    Rule.prototype.getDefinition=function(){
        return this.get("definition");
    }
    Rule.prototype.getTarget=function(){
        var def=this.getDefinition();
        var target={
            "action":def.type,
            "targetId":this.type=="page"?def.targetPage:def.targetField,
            "targetType":this.type
        }
        return target;
    }

    module.Rule=Rule;

    return module;
})(appForm.models || {});