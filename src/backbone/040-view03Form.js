var FormView = BaseView.extend({
    "pageNum": 0,
    "pageViews": [],
    "submission": null,
    initialize: function(formId) {
        var that = this;
        this.onLoad();

        this.loadForm({
            "formId": formId
        }, function() {
            that.onLoadEnd();
            that.render();
        });
    },
    loadForm: function(params, cb) {
        var that = this;
        $fh.forms.getForm(params, function(err, form) {
            that.model = form;
            var pageModelList = form.getPageModelList();
            var pageViews = [];
            for (var i = 0, pageModel; pageModel = pageModelList[i]; i++) {
                var pageView = new PageView({
                    model: pageModel
                });
                pageViews.push(pageView);
            }
            that.pageViews=pageViews;
            cb();
        });
    },
    render: function() {

    },
    nextPage: function() {

    },
    prevPage: function() {

    }
});