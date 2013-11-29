PageView=BaseView.extend({

  viewMap: {
    "text": FieldTextView,
    "number": FieldNumberView,
    // "date": FieldDateView,
    // "eurodate": FieldDateView,
    "textarea": FieldTextareaView,
    "radio": FieldRadioView,
    "checkboxes": FieldCheckboxView,
    "dropdown": FieldSelectView,
    "file": FieldFileView,
    "emailAddress": FieldEmailView,
    // "time": FieldTimeView,
    "phone": FieldPhoneView,
    // "europhone": FieldPhoneView,
    // "shortname": FieldShortnameView,
    // "address": FieldAddressView,
    // "url": FieldUrlView,
    // "money": FieldMoneyView,
    // "likert": FieldLikertView,
    // "locationLatLong": FieldGeoView,
    "location": FieldGeoView,
    // "locationNorthEast": FieldGeoENView,
    // "fhgeoen": FieldGeoENView,
    "photo": FieldCameraView,
    "fhcamGroup": FieldCameraGroupView,
    "signature": FieldSignatureView,
    "locationMap": FieldMapView,
    // "fhtime": FieldCustomTimeView,
    // "dateTime": FieldCustomDateView,
    "dateTime":FieldDateTimeView,
    "sectionBreak":FieldSectionBreak
  },

  initialize: function() {
    var self = this;
    _.bindAll(this, 'render',"show","hide");
    this.fieldViews = {};
    // Page Model will emit events if user input meets page rule to hide / show the page.
    this.model.on("visible",self.show);
    this.model.on("hidden",self.hide);
    // // pass visible event down to all fields
    // this.on('visible', function () {
    //   _(self.fieldViews).forEach(function (fieldView) {
    //         fieldView.trigger('visible');
    //   });
    // });
    this.render();
  },

  render: function() {
    var self = this;

    // all pages hidden initially
    this.$el.empty().addClass('page hidden');
    // add to parent before init fields so validation can work
    this.options.parentEl.append(this.$el);
    var fieldModelList=this.model.getFieldModelList();
    
    fieldModelList.forEach(function (field, index) {
      var fieldType = field.getType();
      if (self.viewMap[fieldType]) {

        console.log("*- "+fieldType);

        self.fieldViews[field.get('_id')] = new self.viewMap[fieldType]({
          parentEl: self.$el,
          parentView: self,
          model: field,
          submission: self.options.submission
        });
      } else {
        console.warn('FIELD NOT SUPPORTED:' + fieldType);
      }
    });
  },

  show: function () {
    var self = this;

    this.$el.removeClass('hidden');
    // see if we need to apply any validation errors got back from wufoo i.e. rules that we haven't implemented or cannot implement
    // var error = this.options.parentView.model.get('error');
    // if (error && error.details && error.details.FieldErrors) {
    //   // filter out elements only visible on this page
    //   var validateErrors = {};
    //   _(error.details.FieldErrors).forEach(function (fieldError) {
    //     var fieldEl = self.$('[name="' + fieldError.ID + '"],[name="' + fieldError.ID + '[]"]');
    //     if (fieldEl.length) {
    //       validateErrors[fieldEl.attr('name')] = fieldError.ErrorText;
    //     }
    //   });
    //   if (!_.isEmpty(validateErrors)) {
    //     this.options.parentEl.validate().showErrors(validateErrors);
    //   }
    // }

    // this.trigger('visible');
  },

  hide: function () {
    this.$el.addClass('hidden');
  },

  showField: function (id) {
    // show field if it's on this page
    if (this.fieldViews[id]) {
      this.fieldViews[id].show();
    }
  },

  hideField: function (id) {
    // hide field if it's on this page
    if (this.fieldViews[id]) {
      this.fieldViews[id].hide();
    }
  },

  isValid: function () {
    // only validate form inputs on this page that are visible or type=hidden, or have validate_ignore class
    var validateEls = this.$el.find('input,select,option,textarea').not('.validate_ignore,[type!="hidden"]:hidden');
    return validateEls.length ? validateEls.valid() : true;
  },

  checkRules: function () {
    var self = this;
    var result = {};

    var rules = {
      SkipToPage: function (rulePasses, params) {
        var pageToSkipTo = params.Setting.Page;
        if (rulePasses) {
          result.skipToPage = pageToSkipTo;
        }
      }
    };

    // iterate over page rules, if any, calling relevant rule function
    _(this.model.get('Rules') || []).forEach(function (rule, index) {
      // get element that rule condition is based on
      var jqEl = self.$el.find('#Field' + rule.condition.FieldName + ',' + '#radioField' + rule.condition.FieldName);
      rule.fn = rules[rule.Type];
      if(jqEl.data("type") === 'radio') {
        var rEl = self.$el.find('#Field' + rule.condition.FieldName + '_' + index);
        rEl.wufoo_rules('exec', rule);
      } else {
        jqEl.wufoo_rules('exec', rule);
      }
    });

    return result;
  }

});