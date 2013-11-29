FieldView = Backbone.View.extend({

  className: 'field_container',
  templates: {
    instructions: '<p class="instruct"><%= helpText %></p>'
  },
  template:[],
  events: {
    "change": "contentChanged",
    "blur input,select,textarea": "validate"
  },

  // TODO: cache the input element lookup?
  initialize: function() {
    _.bindAll(this, 'dumpContent', 'clearError');

    // var nonFhClasses = this.model.getNonFhClasses();
    // if (nonFhClasses) {
    //   this.$el.addClass(nonFhClasses);
    // }

    this.on('visible', function() {
      //$fh.logger.debug('field visible');
    });

    // if(!this.model.serialize() && !_.isEmpty(this.defaultValue())) {
    //   this.model.set({
    //     Value: this.defaultValue()
    //   });
    // }

    if (this.model.isRequired()) {
      this.$el.addClass('required');
    }

    // only call render once. model will never update
    this.render();
  },

  dumpContent: function() {
    console.log("Value changed :: " + JSON.stringify(this.value()));

  },

  getTopView: function() {
    var view = this.options.parentView;
    var parent;
    do {
      parent = view.options.parentView;
      if (parent) {
        view = parent;
      }
    } while (parent);
    return view;
  },

  validate: function(e) {
    if (App.config.validationOn) {
      var target = $(e.currentTarget);
      var val = target.val();

      var result = this.model.validate(val);
      if (result !== true) {
        alert("Error: " + result);
        this.$el.addClass('error');
      } else {
        this.clearError();
      }
    }
  },

  contentChanged: function(e) {
    this.dumpContent();
    this.getTopView().trigger('change:field');
    var val = this.value();
    debugger;
    if(this.model.validate(val[this.model.get("_id")]) === true){
      debugger;
      this.model.processInput(val[this.model.get("_id")]);
    }
  },

  render: function() {
    // construct field html
    this.$el.append(_.template(this.template.join(''), {
      "id": this.model.get("_id"),
      "title": this.model.getName(),
      "defaultVal": this.model.get('default') || ''
    }));

    // var instructions = this.model.get('Instructions');

    // if (instructions && instructions !== '') {
    //   $('label:first', this.el).after(_.template(this.templates.instructions, {
    //     instructions: this.model.get('Instructions')
    //   }));
    // }

    // populate field if Submission obj exists
    if(this.options.submission){
      debugger;
      var value = this.options.submission.getInputValueByFieldId(this.model.get('_id'));
      this.value(value);
    }

    // add to dom
    this.options.parentEl.append(this.$el);
    this.show();

    // force the element to be initially hidden
    if (this.$el.hasClass("hide")) {
      this.hide(true);
    }
  },

  addRules: function() {
    this.addValidationRules();
    this.addSpecialRules();
  },

  isRequired: function() {
    return this.model.get('IsRequired') === '1';
  },

  addValidationRules: function() {
    if (this.model.get('IsRequired') === '1') {
      this.$el.find('#' + this.model.get('ID')).rules('add', {
        "required": true
      });
    }
  },

  addSpecialRules: function() {
    var self = this;

    var rules = {
      'Show': function(rulePasses, params) {
        var fieldId = 'Field' + params.Setting.FieldName;
        if (rulePasses) {
          App.views.form.showField(fieldId);
        } else {
          App.views.form.hideField(fieldId);
        }
      },
      'Hide': function(rulePasses, params) {
        var fieldId = 'Field' + params.Setting.FieldName;
        if (rulePasses) {
          App.views.form.hideField(fieldId);
        } else {
          App.views.form.showField(fieldId);
        }
      }
    };

    // also apply any special rules
    _(this.model.get('Rules') || []).each(function(rule) {
      var ruleConfig = _.clone(rule);
      ruleConfig.pageView = self.options.parentView;
      ruleConfig.fn = rules[rule.Type];
      self.$el.find('#' + self.model.get('ID')).wufoo_rules('add', ruleConfig);
    });
  },

  removeRules: function() {
    this.$el.find('#' + this.model.get('ID')).rules('remove');
  },

  // force a hide , defaults to false
  hide: function(force) {
    if (force || this.$el.is(':visible')) {
      this.$el.hide();
      // remove rules too
      this.removeRules();
    }
  },

  addButton: function(input, extension_type, label) {
    var self = this;
    var button = $('<button>');
    button.addClass('special_button');
    button.addClass(extension_type);
    button.text(' ' + label);
    var img = $('<img>');
    img.attr('src', './img/' + extension_type + '.png');
    img.css('height', '28px');
    img.css('width', '28px');
    button.prepend(img);

    button.click(function(e) {
      self.action(this);
      e.preventDefault();
      return false;
    });

    input.append(button);
    return button;
  },

  show: function() {
    if (!this.$el.is(':visible')) {
      this.$el.show();
      // add rules too
      //this.addRules();
      //set the form value from model
      //this.value(this.model.serialize());
    }
  },

  defaultValue: function() {
    var defaultValue = {};
    defaultValue[this.model.get('_id')] = this.model.get('DefaultVal');
    return defaultValue;
  },

  // Gets or Set the value for this field
  // value should always be the serialized form value i.e {Field1 : "Test"}
  // field with sub fields - {{Field1 : "First Name"}, {Field2 : "Second Name"}}
  // More complex fields such as files may have value overridden
  // file - {Field2 : {filebase64 : "sssss", filename : "test.txt", content_type : "text/plain"}}
  value: function(value) {
    if (value && !_.isEmpty(value)) {
      $.each(value, function(id, val) {
        $("#" + id).val(val);
      });
    }
    value = {};
    this.$el.find('input, select, textarea').each(function() {
      value[$(this).attr('id')] = $(this).val();
    });
    return value;
  },

  // TODO horrible hack
  clearError: function() {
    this.$el.find("label[class=error]").remove();
    this.$el.removeClass("error");
    this.$el.find(".error").removeClass("error");
  }

});