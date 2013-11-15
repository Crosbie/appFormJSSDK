describe("Model",function(){
    it ("should get and set properties",function(){
        var model=new appForm.models.Model();
        model.set("hello","Model");
        assert(model.get("hello")=="Model");
    });

    it ("should get and set local id",function(){
        var model=new appForm.models.Model();
        model.setLocalId("aaa");
        assert(model.getLocalId()=="aaa");
    });

    it ("should copy data from a json string",function(){
        var json={
            "item":"name",
            "hello":"world"
        }
        var jsonStr=JSON.stringify(json);
        var model=new appForm.models.Model();
        model.fromJSONStr(jsonStr);
        assert(model.get("item")=="name");
        assert(model.get("hello")=="world");
    });

    it ("should check if two models data identical",function(){
        var model1=new appForm.models.Model();
        var model2=new appForm.models.Model();
        var json={
            "item":"name",
            "hello":"world"
        }
        model1.fromJSON(json);
        model2.fromJSON(json);
        assert(model1.equalTo(model2));
    });

    
});