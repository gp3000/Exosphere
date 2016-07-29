var Q= require("q");
var fs = require('fs');
 


module.exports = {

  
  readContract: function(path) {

    var deferred = Q.defer();
    fs.readFile(path, 'utf8', function(err, contents) {

        if(err)
        {
            console.log(err);
            deferred.resolve(null);
        }
        else{
            deferred.resolve(contents);
        }
        
        

    });

    return deferred.promise;

    
    



  },
       
  sayHelloInSpanish: function() {
    return "Hola";
  }
};


