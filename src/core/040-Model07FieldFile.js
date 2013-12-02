/**
 * extension of Field class to support file field
 */

appForm.models.Field = (function(module) {
    module.prototype.process_file = function(inputValue, cb) {

        if (typeof inputValue != "object" || !inputValue instanceof HTMLInputElement || !inputValue instanceof File) {
            throw ("the input value for file field should be a html file input element or a File object");
        }
        var file=inputValue;
        if (inputValue instanceof HTMLInputElement){
            file=inputValue.files[0]; // 1st file only, not support many files yet.
        }
        var rtnJSON={
            "fileName":file.name,
            "fileSize":file.size,
            "fileType":file.type,
            "fileUpdateTime":file.lastModifiedDate,
            "hashName":""
        };
        var name=file.name+Math.ceil(Math.random()*100000);
        appForm.utils.md5(name,function(err,res){
            var hashName=res;
            if (err){
                hashName=name;
            }
            rtnJSON.hashName=hashName;
            appForm.utils.fileSystem.save(hashName, file,function(err,res){
                if (err){
                    console.error(err);
                    cb(err);
                }else{
                    cb(null,rtnJSON);
                }
            });
        });
    }
    return module;
})(appForm.models.Field || {});