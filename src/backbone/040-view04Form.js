var FormView = BaseView.extend({
    "pageNum": 0,
    "pageCount": 0,
    "pageViews": [],
    "submission": null,
    templates: {
        buttons: '<div id="buttons"><button class="prev">Prev</button><button class="next">Next</button><button class="saveToDraft">Save To Draft</button></div>'
    },
    events: {
        "click button.next": "nextPage",
        "click button.prev": "prevPage",
        "click button.saveToDraft": "saveToDraft"
    },
    initialize: function(){
        this.el = this.options.parentEl;
    },
    loadForm: function(params, cb) {
        var that = this;
        this.onLoad();
        $fh.forms.getForm(params, function(err, form) {
            if (err) {
                throw (err.body);
            }
            that.formId=form.getFormId();

            $(that.el).empty();
            that.model = form;

            if (!params.submission) {
                params.submission = that.model.newSubmission();
            }

            var pageModelList = form.getPageModelList();
            var pageViews = [];
            for (var i = 0, pageModel; pageModel = pageModelList[i]; i++) {
                var pageView = new PageView({
                    model: pageModel,
                    parentEl: $(that.el),
                    formView: that
                });
                pageViews.push(pageView);
            }
            that.pageViews = pageViews;
            that.pageCount = pageViews.length;
            that.submission = params.submission;
            that.onLoadEnd();
            cb();
        });
    },
    setSubmission: function(sub){
        this.submission = sub;
    },
    getSubmission: function(){
        return this.submission;
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
        this.checkPages();
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
        if($('.error').length > 0){
            alert('Please resolve all field validation errors');
            return;
        }
        this.submission.saveDraft(function(err, res) {
            console.log(err, res);
            Backbone.history.navigate('form_list', true);
        });
    }
});