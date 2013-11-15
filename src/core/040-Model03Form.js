appForm.models=(function(module){
    var Model=appForm.models.Model;
    module.Form=Form;

    function Form(formId,cb){
        if (!formId){
            throw ("Cannot initialise a form object without an id. id:"+formId);
        }

        Model.call(this,{
            "_id":formId,
            "_type":"form"
        });
        if (typeof cb =="function"){
            this.refresh(cb);
        }
    }
    appForm.utils.extend(Form,Model);
    Form.prototype.getLastUpdate=function(){
        return this.get("lastUpdated");
    }


    return module;
})(appForm.models||{});