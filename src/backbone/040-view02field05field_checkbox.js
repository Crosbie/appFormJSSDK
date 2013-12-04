FieldCheckboxView = FieldView.extend({
  templates: {
    title: '<label><%= title %></label>',
    choice: '<input id="<%= id %>" <%= checked %> name="<%= mainId %>[]" type="checkbox" class="field checkbox" value="<%= value %>" tabindex="<%= iteration %>"><label class="choice" for="<%= id %>"><%= choice %></label><br/>'
  },

  contentChanged: function(e) {
    var self = this;
    this.dumpContent();
    this.getTopView().trigger('change:field');
    var val = this.value();
    if (this.model.validate(val) === true) {
      self.model.set('value', val);
    } else {
      alert('Value not valid for this field: ' + this.model.validate(val));
    }
  },

  render: function() {
    var self = this;

    var title = _.template(this.templates.title, {
      "title": this.model.get('name')
    });
    this.$el.append(title);

    var subfields = this.model.getCheckBoxOptions();
    $.each(subfields, function(i, subfield) {
      var choice_field = $(_.template(self.templates.choice, {
        "id": subfield.label,
        "mainId": self.model.get('_id'),
        "iteration": i,
        "choice": subfield.label,
        "value": subfield.value,
        "checked": (subfield.selected) ? "checked='checked'" : ""
      }));
      self.$el.append(choice_field);
    });

    // add to dom
    this.options.parentEl.append(this.$el);

    // populate field if Submission obj exists
    var submission = this.options.formView.getSubmission();
    if (submission) {
      this.submission = submission;
      this.submission.getInputValueByFieldId(this.model.get('_id'), function(err, res) {
        if (res[0]) {
          $('input[type="checkbox"]').removeAttr('checked');
          console.log(err, res);
          self.value(res[0]);
        }
      });
    }

    this.show();
  },

  addValidationRules: function() {
    if (this.model.get('IsRequired') === '1') {
      // special required rule for checkbox fields
      this.$el.find('[name="' + this.model.get('_id') + '[]"]').first().rules('add', {
        "required": true,
        "minlength": 1,
        messages: {
          required: "Please choose at least 1"
        }
      });
    }
  },

  defaultValue: function() {
    var defaultValue = {};
    var subfields = this.model.get('SubFields');
    $.each(subfields, function(i, subfield) {
      if (subfield.DefaultVal && subfield.DefaultVal == 1) {
        defaultValue[subfield.ID] = subfield.Label;
      }
    });
    return defaultValue;
  },

  value: function(value) {
    if (value) {
      $.each(value, function(id, val) {
        $("input[value='" + val + "']").attr("checked", "checked");
      });
    }
    value = [];
    this.$el.find('input[type="checkbox"]:checked').each(function() {
      // value[$(this).attr('id')] = $(this).val();
      value.push($(this).val());
    });
    return value;
  }
});