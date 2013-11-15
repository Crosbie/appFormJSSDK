appForm.models=(function(module){
    var Model=appForm.models.Model;
    module.Form=Form;

    function Form(formId){
        if (!formId){
            throw ("Cannot initialise a form object without an id. id:"+formId);
        }

        Model.call(this,{
            "_id":formId,
            "_type":"form"
        });
    }
    appForm.utils.extend(Form,Model);
    /**
     * read current form model from local or remote by form id
     */
    Form.prototype.readById(cb){
        var that=this;
        appForm.stores.dataAgent.read(this,function(err,res){
            if (err || !res){
                cb(err,that);
            }else{
                that.fromJSON(res);
                cb(null,that);
            }
        });
    }


    return module;
})(appForm.models||{});