FieldFileView = FieldView.extend({
  template: ['<label for="<%= id %>"><%= title %></label>', '<input id="<%= id %>" name="<%= id %>" type="file">'],


  dumpContent: function() {
    var tmp = "<empty>";
    if (this.fileData) {
      var size = this.fileData.fileBase64.length + " bytes";
      if (this.fileData.fileBase64.length > 1024) {
        size = (Math.floor((this.fileData.fileBase64.length / 1024) * 1000) / 1000) + " Kilo bytes";
      }
      tmp = {
        content_type: this.fileData.content_type,
        filename: this.fileData.filename,
        size: size
      };
    }
    console.debug("Value changed :: " + JSON.stringify(tmp));
  },

  contentChanged: function(e) {
    var self = this;
    self.fileData = {};
    // var changeimg = function(str) {
    //   if (typeof str === "object" && str.target) {
    //     str = str.target.result; // file reader
    //   }
    //   self.fileData.fileBase64 = str;
    //   self.dumpContent();
      
    // };

    var file, fileObj = this.$el.find('input')[0];
    if (fileObj && fileObj.files && fileObj.files.length > 0) { // webkit/ie
      file = fileObj.files[0];
      self.fileData.fileName = file.name;
      self.fileData.fileType = file.type;
      this.fileSelected();
      // var fr = new FileReader();
      // fr.onloadend = changeimg;
      // fr.readAsDataURL(file);
      // } else if(fileObj.value){
      //   file = fileObj.value; // firefox
      //   changeimg(file);
    } else {
      $(this.$el).find("#fileBtn").remove();
      $(this.$el).find('input').show();
    }
    this.options.formView.setInputValue(self.model.get("_id"), file);
    
  },

  fileSelected: function() {
    var self = this;
    $(this.$el).find("#fileBtn").remove();
    $(this.$el).find('input').hide();
    $(this.$el).append('<button class="special_button" id="fileBtn">' + this.fileData.fileName + '- Reselect file</button>')
    $(this.$el).find("#fileBtn").on('click', function() {
      $(self.$el).find('input').click();
    });
  },

  value: function(value) {
    if (value && value.length > 0) {
      //How can you update the file element to show the current file selected
      this.fileData = value[0];
      this.fileSelected();
    }
    value = {};
    if (this.fileData) {
      value[this.model.get('_id')] = this.fileData;
    }
    return value;
  }
});