FieldDateTimeView = FieldView.extend({
  extension_type: 'fhdate',

  templates: {
    time: '<label for="<%= id %>"><%= title %></label><input id="<%= id %>" name="<%= id %>" type="time">',
    date: '<label for="<%= id %>"><%= title %></label><input id="<%= id %>" name="<%= id %>" type="date">',
    dateTime: '<label for="<%= id %>"><%= title %></label><input id="<%= id %>" name="<%= id %>" type="text">'
  },
  initialize: function() {
    FieldView.prototype.initialize.call(this);
    this.on('visible', this.clearError);

  },

  render: function() {
    var self = this;
    var dt;
    this.dateTimeUnit = dt = this.model.get('fieldOptions').dateTimeUnit;
    // construct field html
    this.$el.append(_.template(this.templates[dt], {
      "id": this.model.get('_id'),
      "title": this.model.get('name')
    }));

    // Add button
    if (this.dateTimeUnit === "dateTime") {
      this.addButton(this.$el, this.extension_type, 'Get Current Date & Time');
    } else if (this.dateTimeUnit === "time") {
      this.addButton(this.$el, this.extension_type, 'Get Current Time');
    } else if (this.dateTimeUnit === "date") {
      this.addButton(this.$el, this.extension_type, 'Get Current Date');
    }

    // add to dom
    this.options.parentEl.append(this.$el);

    // populate field if Submission obj exists
    var submission = this.options.formView.getSubmission();
    if (submission) {
      this.submission = submission;
      this.submission.getInputValueByFieldId(this.model.get('_id'), function(err, res) {
        console.log(err, res);
        self.value(res);
      });
    }

    this.show();
  },

  contentChanged: function(e) {
    FieldView.prototype.contentChanged.apply(this, arguments);
    this.clearError();
  },

  action: function(el) {
    var self = this;
    var mo = new moment()
    if (self.dateTimeUnit === "dateTime") {
      $('input', this.$el).val(mo.format('YYYY-MM-DD HH:mm:ss')).blur();
    } else if (self.dateTimeUnit === "date") {
      $('input', this.$el).val(mo.format('YYYY-MM-DD')).blur();
    } else if (self.dateTimeUnit === "time") {
      $('input', this.$el).val(mo.format('HH:mm:ss')).blur();
      self.mo = mo; // needed to get back date of time
    }

    this.contentChanged();
  },

  value: function(value) {
    var self = this;
    if (value && !_.isEmpty(value)) {
      $.each(value, function(id, val) {
        var mo = new moment(val);
        // TODO fix this to allow repeated fields
        // self.$el.find("#" + self.model.get('_id')).val(val);
        if (self.dateTimeUnit === "dateTime") {
          $('input', self.$el).val(mo.format('YYYY-MM-DD HH:mm:ss')).blur();
        } else if (self.dateTimeUnit === "date") {
          $('input', self.$el).val(mo.format('YYYY-MM-DD')).blur();
        } else if (self.dateTimeUnit === "time") {
          $('input', self.$el).val(mo.format('HH:mm:ss')).blur();
        }
      });
    }
    var val = $('#' + this.model.get('_id')).val();
    value = {};
    if (val !== "") {
      if(self.mo){
        val = self.mo
      }
      value[this.model.get('_id')] = new moment(val, 'YYYY-MM-DD HH:mm:ss');
    }
    return value;
  },
})