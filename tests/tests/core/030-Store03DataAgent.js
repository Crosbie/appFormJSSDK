describe("Store Data agent", function() {
    describe("read", function() {
        it("should load from local if local exists", function(done) {
            var model=new appForm.models.Model();
            appForm.stores.localStorage.create(model,function(e,r1){
                appForm.stores.dataAgent.read(model,function(err,res){
                    console.log(err,res,r1)
                    assert(!err);
                    assert(res);
                    assert(res == r1);
                    done();
                });
            });
        });

        
    });

});