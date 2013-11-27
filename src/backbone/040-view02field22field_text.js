FieldTextView = FieldView.extend({
  template: ['<label class="desc" for="<%= _id %>"><%= name %></label>', '<input class="field text medium" maxlength="255" id="<%= _id %>" name="<%= _id %>" type="text" value="<%= defaultVal %>">']
});