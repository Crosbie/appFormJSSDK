FieldCheckboxView = FieldView.extend({
  templates: {
    title: '<label><%= title %></label>',
    choice: '<input id="<%= id %>" name="<%= mainId %>[]" type="checkbox" class="field checkbox" value="<%= value %>" tabindex="<%= iteration %>"><label class="choice" for="<%= id %>"><%= choice %></label><br/>'
  },

  render: function() {
    var self = this;

    var title = _.template(this.templates.title, {
      "title": this.model.get('Title')
    });
    this.$el.append(title);

    var subfields = this.model.get('SubFields');
    $.each(subfields, function(i, subfield) {
      var choice_field = $(_.template(self.templates.choice, {
        "id": subfield.ID,
        "mainId": self.model.get('ID'),
        "iteration": i,
        "choice": subfield.Label,
        "value": subfield.Label
      }));
      self.$el.append(choice_field);
    });

    // add to dom
    this.options.parentEl.append(this.$el);
    this.show();
  },

  addValidationRules: function () {
    if (this.model.get('IsRequired') === '1') {
      // special required rule for checkbox fields
      this.$el.find('[name="' + this.model.get('ID') + '[]"]').first().rules('add', {
        "required": true,
        "minlength": 1,
        messages: {
          required: "Please choose at least 1"
         }
      });
    }
  },

  defaultValue:function () {
    var defaultValue = {};
    var subfields = this.model.get('SubFields');
    $.each(subfields, function(i, subfield) {
      if(subfield.DefaultVal && subfield.DefaultVal == 1) {
        defaultValue[subfield.ID] = subfield.Label;
      }
    });
    return defaultValue;
  },

  value:function (value) {
    if (value) {
      $.each(value, function (id, val) {
        $("input[value='" + val + "']").attr("checked", "checked");
      });
    }
    value = {};
    this.$el.find('input[type="checkbox"]:checked').each(function() {
      value[$(this).attr('id')] = $(this).val();
    });
    return value;
  }
});