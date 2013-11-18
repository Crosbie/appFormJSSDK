require.config({
  baseUrl: 'tests/',
  paths: {
    'jquery'        : '/app/libs/jquery',
    'underscore'    : 'vendor/underscore',
    'mocha'         : 'vendor/mocha',
    'chai'          : 'vendor/chai',
    'chai-jquery'   : 'libs/chai-jquery',
    'models'        : '/app/models'
  }
 
});
 


 var requiredFiles=[];
 modules.forEach(function(name){
  //source file
  requiredFiles.push("./src/**/"+name+".js");
  //test file
  requiredFiles.push("./tests/**/"+name+".js");
 });

  /*globals mocha */
  mocha.setup('bdd');
 var assert=chai.assert;
  require(requiredFiles, function(require) {
    appForm.init(function(){
       mocha.run();
    });
    
  });
 
