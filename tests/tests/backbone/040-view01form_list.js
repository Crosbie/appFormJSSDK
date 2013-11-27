var assert = chai.assert;

var formListView;
describe("Backbone - Form List View [test placeholder]", function() {
    it("rendering formView", function(done) {
        $fh.forms.getForms({fromRemote:false},function(err,forms){
            assert (!err);
            formListView=new FormListView({
                "model":forms,
                "parentEl":$("#backbone")
            });
            formListView.render();
            console.log($("#backbone ul li").length);
            assert($("#backbone ul li").length>0, "No Forms rendered");
            done();
        });
        
    });

    // it("init form list", function(done){
    //     formListView.initFormList(false,function(err,view){
    //         assert(!err);
    //         assert(view);
    //         done();
    //     })
    // })
});