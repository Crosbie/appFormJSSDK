appForm.models=(function(module){
    var Model=appForm.models.Model;
    

    function Forms(){
        Model.call(this,{
            "_type":"forms",
            "_ludid":"forms_list",
            "loaded":false
        });
    }
    appForm.utils.extend(Forms,Model);

    Forms.prototype.isFormUpdated=function(formModel){
        var id=formModel.get("_id");
        var formLastUpdate=formModel.getLastUpdate();
        var formMeta=this.getFormMetaById(id);
        if (formMeta){
            return formLastUpdate==formMeta.lastUpdated;
        }else{ //could have been deleted. leave it for now
            return false;
        }
    }

    Forms.prototype.getFormMetaById=function(formId){
        var forms=this.get("forms");
        for (var i=0;i<forms.length;i++){
            var form=forms[i];
            if (form._id == formId){
                return form;
            }
        }
        return null;
    }

    Forms.prototype.setLocalId=function(){
        throw("forms id cannot be set programmly");
    }
    
    module.forms=new Forms();

    return module;
})(appForm.models ||{});