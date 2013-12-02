FieldDateTimeView = FieldView.extend({
  extension_type: 'dateTime',

  templates: {
    time: '<label for="<%= id %>"><%= title %></label><input id="<%= id %>" name="<%= id %>" type="time">',
    date: '<label for="<%= id %>"><%= title %></label><input id="<%= id %>" name="<%= id %>" type="date">',
    dateTime: '<label for="<%= id %>"><%= title %></label><input id="<%= id %>" name="<%= id %>" type="datetime-local">'
  },
  initialize: function() {
    FieldView.prototype.initialize.call(this);
    this.on('visible', this.clearError);

  },

  render: function() {
    var dt;
    this.dateTimeUnit = dt = this.model.get('fieldOptions').dateTimeUnit;
    // construct field html
    this.$el.append(_.template(this.templates[dt], {
      "id": this.model.get('_id'),
      "title": this.model.get('name')
    }));

    // Add button
    // if (this.dateTimeUnit === "dateTime") {
    //   this.addButton(this.$el, this.extension_type, 'Get Current Time');
    // }

    // add to dom
    this.options.parentEl.append(this.$el);
    this.show();
  },

  contentChanged: function(e) {
    FieldView.prototype.contentChanged.apply(this, arguments);
    this.clearError();
  },

  action: function(el) {
    // var self = this;
    // var ds = new moment().format('YYYY-MM-DD');
    // var input = $('input', this.$el);

    // var m = new moment();
    // $('input', this.$el).val(m.format('HH:mm:ss')).blur();
    // if ($('input', this.$el).val() === "") {
    //   $('input', this.$el).val(m.format('HH:mm:00')).blur();
    // }
    // this.contentChanged();
    // input.blur();
  }
})