FieldSelectView = FieldView.extend({
  template: ['<label for="<%= id %>"><%= title %></label>','<select id="<%= id %>" name="<%= id %>"><option>Test</option></select>'],

  templates: {
    label: '<label><%= title %></label>',
    select: '<select id="<%= id %>" name="<%= id %>"></select>',
    option: '<option value="<%= value %>" <%= selected %>><%= value %></option>'
  },

  render: function() {
    var self = this;

    var label = _.template(this.templates.label, {
      "title": this.model.get('name')
    });
    this.$el.append(label);

    var select = _.template(this.templates.select, {
      "id": this.model.get('_id')
    });
    this.$el.append(select);

    var choices = this.model.get('fieldOptions');
    choices = choices.definition.options;    

    $.each(choices, function(i, choice) {
      var option = $(_.template(self.templates.option, {
        "value": choice.label,
        "selected": (choice.checked) ? "selected='selected'" : ""
      }));
      $('select', self.el).append(option);
    });

    // add to dom
    this.options.parentEl.append(this.$el);

    // populate field if Submission obj exists
    var submission = this.options.formView.getSubmission();
    if(submission){
      this.submission = submission;
      this.submission.getInputValueByFieldId(this.model.get('_id'),function(err,res){
        console.log(err,res);
        self.value(res);
      });
    }

    this.show();
  }
  
});