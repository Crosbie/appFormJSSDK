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

    Submissions.prototype.saveSubmission=function(submission){
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
        }else{ // invalid local id.
            console.error("Invalid submission:"+JSON.stringify(submission));
        }
    }

    Submissions.prototype.findMetaByLocalId=function(localId){
        var submissions=this.get("submissions");
        for (var i=0;i<submissions;i++){
            var obj=submissions[i];
            if (submissions[i]['_ludid']==localId){
                return obj;
            }
        }
        return null;
    }
    Submissions.prototype.pruneSubmission=function(submission){
        var fields=["_id", "_ludid","status","formName","_localLastUpdate","createDate","submitDate"];
        var data=submission.getProps();

        var rtn={};
        for (var i=0;i<fields.length;i++){
            var key=fields[i];
            rtn[key]=data[key];
        }
        return rtn;
    }

    module.submissions=new Submissions();

    return module;
})(appForm.models || {});