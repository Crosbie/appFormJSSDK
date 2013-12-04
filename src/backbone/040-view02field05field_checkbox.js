FieldCheckboxView = FieldView.extend({
  templates: {
    title: '<label><%= title %></label>',
    choice: '<input id="<%= id %>" <%= checked %> data-index="<%= index %>" name="<%= mainId %>[]" type="checkbox" class="field checkbox" value="<%= value %>" tabindex="<%= iteration %>"><label class="choice" for="<%= id %>"><%= choice %></label><br/>'
  },

  contentChanged: function(e) {
    var self = this;
    this.dumpContent();
    this.getTopView().trigger('change:field');
    // var val = this.value();
    // if (this.model.validate(val) === true) {
    //   // self.model.set('value', val);
    //   this.options.formView.setInputValue(self.model.get("_id"), val);

    // } else {
    //   alert('Value not valid for this field: ' + this.model.validate(val));
    // }
  },

  renderSingle: function(index) {
    var title = _.template(this.templates.title, {
      "title": this.model.get('name')
    });
    var self = this;
    this.$el.append(title);
    var subfields = this.model.getCheckBoxOptions();
    $.each(subfields, function(i, subfield) {
      var choice_field = $(_.template(self.templates.choice, {
        "id": subfield.label,
        "index": index,
        "mainId": self.model.get('_id'),
        "iteration": i,
        "choice": subfield.label,
        "value": subfield.value,
        "checked": (subfield.selected) ? "checked='checked'" : ""
      }));
      self.$el.append(choice_field);
    });
  },
  // addValidationRules: function() {
  //   if (this.model.get('IsRequired') === '1') {
  //     // special required rule for checkbox fields
  //     this.$el.find('[name="' + this.model.get('_id') + '[]"]').first().rules('add', {
  //       "required": true,
  //       "minlength": 1,
  //       messages: {
  //         required: "Please choose at least 1"
  //       }
  //     });
  //   }
  // },

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
  getValue: function() {
    var value = [];
    this.$el.find("input[type='checkbox']:checked").each(function() {
      var obj = $(this);
      var index = obj.data().index;
      if (!value[index]) {
        value[index] = [];
      }
      value[index].push(obj.val());
    });
    return value;
  },
  valuePopulate: function(value) {
    if (value) {
      for (var i = 0, v; v = value[i]; i++) {
        if (v) {
          for (var j = 0, vi; vi = v[j]; j++) {
            this.$el.find("input[data-index='" + i + "'][value='" + vi + "']").attr("checked", "checked");
          }
        }

      }
    }
  }
});