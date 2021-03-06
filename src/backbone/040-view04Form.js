var FormView = BaseView.extend({
  "pageNum": 0,
  "pageCount": 0,
  "pageViews": [],
  "submission": null,
  "fieldValue": [],
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
      var fieldViews = [];
      for (var i = 0, pageView; pageView = pageViews[i]; i++) {
        var pageFieldViews = pageView.fieldViews;
        for (var key in pageFieldViews) {
          fieldViews.push(pageFieldViews[key]);
        }
      }
      self.fieldViews = fieldViews;
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
    this.populateFieldViewsToSubmission(function() {
      self.submission.saveDraft(function(err, res) {
        console.log(err, res);
        Backbone.history.navigate('form_list', true);
        $(self.el).empty();
      });
    });
  },
  populateFieldViewsToSubmission: function(cb) {
    var submission = this.submission;
    var fieldViews = this.fieldViews;
    var tmpObj = [];
    for (var i = 0, fieldView; fieldView = fieldViews[i]; i++) {
      var val = fieldView.value();
      var fieldId = fieldView.model.getFieldId();
      for (var j = 0, v; v = val[j]; j++) {
        tmpObj.push({
          id: fieldId,
          value: v
        });
      }
    }
    var count = tmpObj.length;
    submission.reset();
    for (var i = 0, item; item = tmpObj[i]; i++) {
      var fieldId = item.id;
      var value = item.value;
      submission.addInputValue(fieldId, value, function(err, res) {
        if (err) {
          console.error(err);
        }
        count--;
        if (count == 0) {
          cb();
        }
      });
    }
  },

  setInputValue: function(fieldId, value) {
    var self = this;
    for (var i = 0, item; item = this.fieldValue[i]; i++) {
      if (item.id == fieldId) {
        this.fieldValue.splice(i, 1);
      }
    }
    for (var i = 0, v; v = value[i]; i++) {
      this.fieldValue.push({
        id: fieldId,
        value: v
      });
    }

    console.log('INPUT VALUE SET', fieldId, value);
  }
});