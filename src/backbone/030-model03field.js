
FieldModel = CoreModel.extend({
  defaults: {
    "Rules": [],
    "bridgeFuncs": [
      "isRequired","getType","validate","processInput","get","set"
    ]
  },


  getNonFhClasses: function() {
    // return all classnames that don't start with fh
    return this.attributes && this.attributes.ClassNames ? this.attributes.ClassNames.replace(/\bfh.*?\s/g, '') : '';
  },

  isIdField: function() {
    return _.find(this.attributes.ClassNames.split(" "), function(val) {
      return val === "fhid";
    });
  },

  //Returns the serialised field value, ready for submission to wuffoo
  serialize: function() {
    return this.attributes.Value;
  }
});

// fields collection
Fields = Backbone.Collection.extend({
  model: FieldModel
});