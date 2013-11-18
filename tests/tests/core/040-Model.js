describe("Model",function(){
    it ("how to get and set properties",function(){
        var model=new appForm.models.Model();
        model.set("hello","Model");
        assert(model.get("hello")=="Model");
    });

    it ("how to get and set local id",function(){
        var model=new appForm.models.Model();
        model.setLocalId("aaa");
        assert(model.getLocalId()=="aaa");
    });

    it ("how to convert a json string to model data",function(){
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

    it ("how to check if two models data identical",function(){
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