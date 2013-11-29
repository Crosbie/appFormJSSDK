var FormView = BaseView.extend({
    "pageNum": 0,
    "pageCount": 0,
    "pageViews": [],
    "submission": null,
    el: '#backbone #page',
    templates: {
        buttons: '<div id="buttons"><button class="prev">Prev</button><button class="next">Next</button><button class="saveToDraft">Save To Draft</button></div>'
    },
    events: {
        "click button.next": "nextPage",
        "click button.prev": "prevPage",
        "click button.saveToDraft": "saveToDraft"
    },
    initialize: function(formId, submission) {
        var that = this;
        this.onLoad();

        this.loadForm({
            "formId": formId,
            "submission": submission || null
        }, function() {
            that.onLoadEnd();
            that.render();
            that.checkPages();
        });
    },
    loadForm: function(params, cb) {
        var that = this;
        $fh.forms.getForm(params, function(err, form) {
            if (err) {
                throw (err.body);
            }
            $(that.el).empty();
            that.model = form;
            var pageModelList = form.getPageModelList();
            var pageViews = [];
            for (var i = 0, pageModel; pageModel = pageModelList[i]; i++) {
                var pageView = new PageView({
                    model: pageModel,
                    parentEl: $(that.el),
                    submission: params.submission
                });
                pageViews.push(pageView);
            }
            that.pageViews = pageViews;
            that.pageCount = pageViews.length;
            cb();
        });
    },
    checkPages: function() {
        if (this.pageNum === 0) {
            $(this.el).find(" button.prev").attr('disabled', 'disabled');
        } else {
            $(this.el).find(" button.prev").removeAttr('disabled');
        }
        if (this.pageNum === this.pageCount - 1) {
            $(this.el).find(" button.next").attr('disabled', 'disabled');
        } else {
            $(this.el).find(" button.next").removeAttr('disabled');
        }
    },
    render: function() {
        $(this.el).append(this.templates.buttons);
        this.pageViews[0].show();
    },
    nextPage: function() {
        this.hideAllPages();
        this.pageViews[this.pageNum + 1].show();
        this.pageNum = this.pageNum + 1;
        this.checkPages();
    },
    prevPage: function() {
        this.hideAllPages();
        this.pageViews[this.pageNum - 1].show();
        this.pageNum = this.pageNum - 1;
        this.checkPages();
    },
    hideAllPages: function() {
        this.pageViews.forEach(function(view) {
            view.hide();
        });
    },
    saveToDraft: function() {
        var submission = this.model.newSubmission();
        submission.saveDraft(function(err,res){
            console.log(err,res);
            Backbone.history.navigate('form_list', true);
        });
    }
});