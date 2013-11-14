var express=require("express");


module.exports=function(grunt){
  grunt.initConfig({
    pkg:grunt.file.readJSON("package.json")
  });

  grunt.registerTask("testServer",require("./script/webServer.js"));
}