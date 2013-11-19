FormView = Backbone.View.extend({
    tagName: 'section',
    id: 'homeView',
    template: "<h1>Hello World</h1>",

    events: {
    },

    initialize: function() {
    },

    render: function(){
        console.log('rendering form');
        this.$el.html(this.template);
        return this;
    }
});