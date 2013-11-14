var assert=chai.assert;

describe("Utilities",function(){
    it("should extend a class(function)",function(){
        var parent=function(){};
        parent.prototype.method1=function(){};
        var child=function(){};
        appForm.utils.extend(child,parent);
        var instance=new child();
        assert(typeof instance.method1 === "function");
        assert(instance.method1==parent.prototype.method1);
    });
});