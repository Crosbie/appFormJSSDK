App.Router = Backbone.Router.extend({


    routes: {
        "": "showForm" // Default route
    },

    $content: $("#content"),

    initialize: function() {
        this.$content = $('#content');
    },

    showForm: function() {
        App.views.form = new FormView();
        App.api = appForm.api;
        console.log('apply to screen');
        $('#content').html(App.views.form.render().$el);
    },
});