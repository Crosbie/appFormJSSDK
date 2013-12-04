/**
 * Manages submission uploading tasks
 */

appForm.models = (function(module) {
    var Model = appForm.models.Model;

    function UploadManager() {
        Model.call(this, {
            "_type": "uploadManager"
        });
        this.set("taskQueue", []);
        this.timeOut = 60; //60 seconds. TODO: defin in config
        this.sending = false;
        this.timerInterval=200;
        this.sendingStart = new Date();
    }
    appForm.utils.extend(UploadManager, Model);
    /**
     * Queue a submission to uploading tasks queue
     * @param  {[type]} submissionModel [description]
     * @param {Function} cb callback once finished
     * @return {[type]}                 [description]
     */
    UploadManager.prototype.queueSubmission = function(submissionModel, cb) {
        if (submissionModel.getUploadTaskId()) {
            console.log("submission has a previous uploading task. it will be overwrite");
        }

        var uploadTask = appForm.models.uploadTask.newInstance(submissionModel);
        var utId = uploadTask.getLocalId();
        this.push(utId);
        if (!this.timer){
            this.start(this.timerInterval);
        }
        uploadTask.saveLocal(function(err) {
            if (err) {
                console.error(err);
            }
            submissionModel.setUploadTaskId(utId);
            cb(null, uploadTask);
        });
    }
    UploadManager.prototype.getTaskQueue=function(){
        return this.get("taskQueue",[]);
    }
    /**
     * start a timer
     * @param  {} interval ms
     * @return {[type]}      [description]
     */
    UploadManager.prototype.start = function(interval) {
        var that=this;
        this.stop();
        this.timer=setInterval(function(){
            that.tick();
        },interval);
    }
    /**
     * stop uploadgin
     * @return {[type]} [description]
     */
    UploadManager.prototype.stop = function() {
        if (this.timer){
            clearInterval(this.timer);    
            this.timer=null;
        }
        
    }
    UploadManager.prototype.push = function(uploadTaskId) {
        this.get("taskQueue").push(uploadTaskId);
    }
    UploadManager.prototype.shift = function() {
        return this.get("taskQueue").shift();
    }
    UploadManager.prototype.rollTask=function(){
        this.push(this.shift());
    }
    UploadManager.prototype.tick = function() {
        if (this.sending) {
            var now = new Date();
            var timePassed = now.getTime() - this.sendingStart.getTime();
            if (timePassed > this.timeOut * 1000) { //time expired. roll current task to the end of queue
                console.error("Uploading content timeout. it will try to reupload.");
                this.sending = false;
                this.rollTask();
            }
        } else {
            this.sending = true;
            this.sendingStart = new Date();
            var that=this;
            if (this.hasTask()) {
                this.getCurrentTask(function(err, task) {
                    if (err || !task) {
                        console.error(err);
                        that.sending=false;
                    }else{
                        if (task.isCompleted()){ //current task uploaded. shift it from queue
                            that.shift();
                            that.sending=false;
                        }else{
                            task.uploadTick(function(err){ //file or form uploaded. ready for next upload command
                                if (err){
                                    console.error(err);
                                }
                                that.sending=false;
                            });    
                        }
                    }
                });
            }else{ //no task . stop timer.
                this.stop();
            }

        }
    }
    UploadManager.prototype.hasTask = function() {
        return this.get("taskQueue").length > 0;
    }
    UploadManager.prototype.getCurrentTask = function(cb) {
        var taskId = this.getTaskQueue()[0];
        if (taskId) {
            this.getTaskById(taskId, cb);
        } else {
            cb(null, null);
        }
    }
    UploadManager.prototype.getTaskById = function(taskId, cb) {
        appForm.models.uploadTask.fromLocal(taskId, cb);
    }
    module.uploadManager = new UploadManager();
    return module;
})(appForm.models || {});