describe("Store Data agent", function() {
    describe("read", function() {
        it("should load from local if local exists", function(done) {
            var model=new appForm.models.Model();
            appForm.stores.localStorage.create(model,function(e,r1){
                appForm.stores.dataAgent.read(model,function(err,res){
                    assert(!err);
                    assert(res);
                    assert(res == r1);
                    done();
                });
            });
        });

        it ("should load from remote if local does not exists",function(done){
            var model=new appForm.models.Model();
            appForm.stores.dataAgent.read(model,function(err,res){
                done();
            });
        }); 


    });

});