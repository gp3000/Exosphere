var express = require('express');
var router = express.Router();
var Web3 = require('web3');
var dataContract= require("./dataContract")

 



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/tweet/', function(req, res, next) {

  
  res.render('tweet', { title: 'Express' });
});





router.post('/create/', function(req, res, next) {


var web3 = new Web3(new Web3.providers.HttpProvider(global["iprpc"]));



  var _name=req.body.name;


 var TweetContract = web3.eth.contract(dataContract.abiTweet);
        
        


 var TweetInstancia = TweetContract.new(_name, global["addressLog"],{from:web3.eth.accounts[0], data: dataContract.codeTweet, gas: 4700000}
        , function(e, contract){
            if(!e) {

                if(!contract.address) {
                    console.log("Contract transaction send: TransactionHash: " + contract.transactionHash + " waiting to be mined...");

                } else {
                    console.log("Contract mined! Address: " + contract.address);
                   
                      res.json({"address":contract.address});
    
                   
                }

            }
            else{
                var error=true;
                console.log(e);
                 res.status(503).json({"error":e});
                
            }
        })







});

router.post('/sendTweet/', function(req, res, next) {

var web3 = new Web3(new Web3.providers.HttpProvider(global["iprpc"]));
  var _message=req.body.message;
  var _address=req.body.address;

 


        var logContract = web3.eth.contract(dataContract.abiLog);

 
        var contractInstanceLog =  logContract.at( global["addressLog"] );


    
 
var allLog=function(){
    var eventLog = contractInstanceLog.allEvents({"fromBlock":1,"toBlock":"latest"});


      eventLog.get(function(err,result){
        if(!err)
        {
            //console.log(JSON.stringify(result));

            var arraylist=[];

            for(var i =0;i< result.length;i++)
            {
              arraylist.push(result[i].args);
            }

            res.json({
              



              "headers":Object.keys(result[0].args)
              ,"row":arraylist}
          );


        }
        else{
          res.status(503).json({"erro":err   });
        }
      })
};










        var TweetContract = web3.eth.contract(dataContract.abiTweet);

 
        var contractInstanceTweet =  TweetContract.at( _address );





 var eventTweet= contractInstanceTweet.Sent();



eventTweet.watch(function(err, result) {
  if (err) {
    console.log(err)
    res.status(503).json({"erro":err   });
  }
  else{
   
   allLog();
   }
   eventTweet.stopWatching();
})





var dd=contractInstanceTweet.Send.sendTransaction( _message, {
      from: web3.eth.accounts[0]
      , gas: 3000000

      
    } ,  function(err, hashMapTrans){


                if(err) {
                    console.log(err);

                } else {
                    console.log("Contract mined! hashMapTrans: " + hashMapTrans);



                    //console.log(contract);
                }

});









});


module.exports = router;
