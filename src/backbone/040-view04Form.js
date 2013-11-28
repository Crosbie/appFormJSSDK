var FormView = BaseView.extend({
    "pageNum": 0,
    "pageCount": 0,
    "pageViews": [],
    "submission": null,
    initialize: function(formId) {
        var that = this;
        this.onLoad();

        this.loadForm({
            "formId": formId
        }, function() {
            that.onLoadEnd();
            that.checkPages();
            that.render();
        });
    },
    el: '#backbone #page',
    events:{
        "click button.next": "nextPage",
        "click button.prev": "prevPage"
    },
    loadForm: function(params, cb) {
        var that = this;
        $fh.forms.getForm(params, function(err, form) {
            if(err){
                throw(err.body);
            }
            that.model = form;
            var pageModelList = form.getPageModelList();
            var pageViews = [];
            for (var i = 0, pageModel; pageModel = pageModelList[i]; i++) {
                var pageView = new PageView({
                    model: pageModel,
                    parentEl: $(that.el)
                });
                pageViews.push(pageView);
            }
            that.pageViews=pageViews;
            that.pageCount=pageViews.length;
            cb();
        });
    },
    checkPages: function(){
        if(this.pageNum === 0){
            $(this.el).find(" button.prev").attr('disabled','disabled');
        } else {
            $(this.el).find(" button.prev").removeAttr('disabled');
        }
        if(this.pageNum === this.pageCount-1){
            $(this.el).find(" button.next").attr('disabled','disabled');
        } else {
            $(this.el).find(" button.next").removeAttr('disabled');
        }
    },
    render: function() {
        this.pageViews[0].show();
    },
    nextPage: function() {
        this.hideAllPages();
        this.pageViews[this.pageNum+1].show();
        this.pageNum = this.pageNum+1;
        this.checkPages();
    },
    prevPage: function() {
        this.hideAllPages();
        this.pageViews[this.pageNum-1].show();
        this.pageNum = this.pageNum-1;
        this.checkPages();
    },
    hideAllPages: function(){
        this.pageViews.forEach(function(view){
            view.hide();
        });
    }
});