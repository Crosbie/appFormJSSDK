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
  initialize: function() {
    this.el = this.options.parentEl;
    this.fieldModels = [];
  },
  loadForm: function(params, cb) {
    var self = this;
    this.onLoad();
    $fh.forms.getForm(params, function(err, form) {
      if (err) {
        throw (err.body);
      }
      self.formId = form.getFormId();

      $(self.el).empty();
      self.model = form;

      if (!params.submission) {
        params.submission = self.model.newSubmission();
      }
      self.submission = params.submission;

      // Init Pages --------------
      var pageModelList = form.getPageModelList();
      var pageViews = [];
      for (var i = 0, pageModel; pageModel = pageModelList[i]; i++) {
        // get fieldModels
        var list = pageModel.getFieldModelList()
        self.fieldModels = self.fieldModels.concat(list);

        var pageView = new PageView({
          model: pageModel,
          parentEl: $(self.el),
          formView: self
        });
        pageViews.push(pageView);
      }
      self.pageViews = pageViews;
      self.pageCount = pageViews.length;

      self.onLoadEnd();
      cb();
    });
  },
  rebindButtons: function() {
    var self = this;
    $(this.el + " button.next").unbind().bind("click", function() {
      self.nextPage();
    });

    $(this.el + " button.prev").unbind().bind("click", function() {
      self.prevPage();
    });

    $(this.el + " button.saveToDraft").unbind().bind("click", function() {
      self.saveToDraft();
    });
  },
  setSubmission: function(sub) {
    this.submission = sub;
  },
  getSubmission: function() {
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
    this.rebindButtons();
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
    var self = this;
    if ($('.error').length > 0) {
      alert('Please resolve all field validation errors');
      return;
    }
    count = this.fieldModels.length;
    for (var i = 0, model; model = this.fieldModels[i]; i++) {
      var value = model.get('value');
      var id = model.get('_id');
      if (value) {
        self.submission.addInputValue(id, value, function(err, res) {
          if (err) {
            alert(err);
            return;
          }
        });
      }
      count--;
      console.log(count);
      // debugger;
      if (count === 0) {
        self.submission.saveDraft(function(err, res) {
          console.log(err, res);
          Backbone.history.navigate('form_list', true);
          $(self.el).empty();
        });
      }
    }
  }
});