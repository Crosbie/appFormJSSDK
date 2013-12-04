module.exports=function(grunt){
  grunt.initConfig({
    pkg:grunt.file.readJSON("package.json"),
    linkCore:{
        "coreSrc":"<%= pkg.coreDir %>/",
        "distFile":"<%= pkg.distDir %>/<%= pkg.distFile %>"
    }
  });

  grunt.registerTask("testServer",require("./script/webServer.js"));
  grunt.registerTask("app",require("./script/appServer.js"));
  grunt.registerTask("linkCore",require("./script/linkCore.js")(grunt));
}