FieldNumberView = FieldView.extend({
  template: ['<label for="<%= id %>"><%= title %></label>','<input id="<%= id %>" name="<%= id %>" type="number">'],

  addValidationRules: function () {
    // call super
    FieldView.prototype.addValidationRules.call(this);

    // make sure value is a number
    this.$el.find('#' + this.model.get('_id')).rules("add", {
      "number": true
    });
  }
});