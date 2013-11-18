appForm.models=(function(module){
    var Model=appForm.models.Model;
    module.forms=new Forms();

    function Forms(){
        Model.call(this,{
            "_type":"forms",
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

    

    return module;
})(appForm.models ||{});