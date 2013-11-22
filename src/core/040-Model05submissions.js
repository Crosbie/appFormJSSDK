appForm.models=(function(module){
    var Model=appForm.models.Model;
    

    function Submissions(){
        Model.call(this,{
            "_type":"submissions",
            "_ludid":"submissions_list",
            "submissions":[]
        });
    }
    appForm.utils.extend(Submissions,Model);

    Submissions.prototype.setLocalId=function(){
        throw("It is not allowed to set local id programmly for submissions model.");
    }
    /**
     * save a submission to list and store it immediately
     * @param  {[type]}   submission [description]
     * @param  {Function} cb         [description]
     * @return {[type]}              [description]
     */
    Submissions.prototype.saveSubmission=function(submission,cb){
        var pruneData=this.pruneSubmission(submission);
        var localId=pruneData['_ludid'];
        if (localId){
            var meta=this.findMetaByLocalId(localId);
            var submissions=this.get("submissions");
            if (meta){ //existed, remove the old meta
                submissions.splice(submissions.indexOf(meta),1);
                submissions.push(pruneData);
            }else{ // not existed, insert to the tail.
                submissions.push(pruneData);
            }
            this.saveLocal(cb);
        }else{ // invalid local id.
            console.error("Invalid submission:"+JSON.stringify(submission));
        }
    }
    Submissions.prototype.findByFormId=function(formId){
        var rtn=[];
        var submissions=this.get("submissions");
        for (var i=0;i<submissions.length;i++){
            var obj=submissions[i];
            if (submissions[i]['formId']==formId){
                rtn.push(obj);
            }
        }
        return rtn;
    }
    Submissions.prototype.getSubmissions=function(){
        return this.get("submissions");
    }
    Submissions.prototype.findMetaByLocalId=function(localId){
        var submissions=this.get("submissions");
        for (var i=0;i<submissions.length;i++){
            var obj=submissions[i];
            if (submissions[i]['_ludid']==localId){
                return obj;
            }
        }
        return null;
    }
    Submissions.prototype.pruneSubmission=function(submission){
        var fields=["_id", "_ludid","status","formName","formId","_localLastUpdate","createDate","submitDate","deviceFormTimestamp"];
        var data=submission.getProps();

        var rtn={};
        for (var i=0;i<fields.length;i++){
            var key=fields[i];
            rtn[key]=data[key];
        }
        return rtn;
    }
    Submissions.prototype.clear=function(cb){
        var that=this;
        this.clearLocal(function(err){
            if (err){
                console.error(err);
                cb(err);
            }else{
                that.set("submissions",[]);
                cb(null,null);
            }
        });
    }
    Submissions.prototype.getDrafts=function(cb){
        
    }

    module.submissions=new Submissions();

    return module;
})(appForm.models || {});