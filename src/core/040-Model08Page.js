/**
 * One form contains multiple pages
 */
appForm.models=(function(module){
    var Model=appForm.models.Model;

    function Page(opt,parentForm){
        if (typeof opt =="undefined" || typeof parentForm == "undefined"){
            throw("Page initialise failed: new Page(pageDefinitionJSON, parentFormModel)");
        }
        Model.call(this,{
            "_type":"page"
        });
        this.fromJSON(opt);
        this.form=parentForm;
        this.initialise();
    }
    appForm.utils.extend(Page, Model);
    Page.prototype.initialise=function(){
        var fieldsDef=this.getFieldDef();
        this.fieldsIds=[];
        for (var i=0;i<fieldsDef.length;i++){
            this.fieldsIds.push(fieldsDef[i]._id);
        }
    }   

    Page.prototype.getName=function(){
        return this.get("name","");
    }
    Page.prototype.getDescription=function(){
        return this.get("description","");
    }
    Page.prototype.getFieldDef=function(){
        return this.get("fields",[]);
    }
    Page.prototype.getFieldModelList=function(){
        var list=[];
        for (var i=0;i<this.fieldsIds.length;i++){
            list.push(this.form.getFieldModelById(this.fieldsIds[i]));
        }
        return list;
    }
    Page.prototype.getFieldModelById=function(fieldId){
        return this.form.getFieldModelById(fieldId);
    }
    module.Page=Page;

    return module;
})(appForm.models || {});