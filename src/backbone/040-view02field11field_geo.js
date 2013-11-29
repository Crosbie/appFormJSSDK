FieldGeoView = FieldView.extend({
  extension_type: 'fhgeo',

  templates: {
    input: '<label for="<%= id %>"><%= title %></label><input id="<%= id %>" name="<%= id %>" type="text" disabled>'
  },
  initialize: function() {
    FieldView.prototype.initialize.call(this);
    this.on('visible', this.clearError);
    
  },

  render: function() {
    // construct field html
    this.$el.append(_.template(this.templates.input, {
      "id": this.model.get('_id'),
      "title": this.model.get('name')
    }));
    this.locationUnit = this.model.get('fieldOptions').locationUnit;
    // Add button
    if (this.locationUnit === "latLong") {
      this.addButton(this.$el, this.extension_type, 'Capture Location (Lat/Lon)');
    } else if (this.locationUnit === "northEast") {
      this.addButton(this.$el, this.extension_type, 'Capture Location (East/North)');
    }

    // add to dom
    this.options.parentEl.append(this.$el);
    this.show();
  },

  contentChanged: function(e) {
    FieldView.prototype.contentChanged.apply(this, arguments);
    this.clearError();
  },

  action: function(el) {
    var self = this;
    var ds = new moment().format('YYYY-MM-DD');
    var input = $('input', this.$el);

    $fh.geo(function(res) {
      var location;

      // check unit
      if (self.locationUnit === "latLong") {
        location = '(' + res.lat + ', ' + res.lon + ')';
      } else if (self.locationUnit === "northEast") {
        var en_location = self.convertLocation(res);
        location = '(' + en_location.easting + ', ' + en_location.northing + ')';
      }

      input.val(location);
      self.contentChanged();
    }, function(msg, err) {
      input.attr('placeholder', 'Location could not be determined');
    });
    input.blur();
  },

    convertLocation: function(location) {
    var lat = location.lat;
    var lon = location.lon;
    var params = {
      lat: function() {
        return lat;
      },
      lon: function() {
        return lon;
      }
    };
    return OsGridRef.latLongToOsGrid(params);
  },
});