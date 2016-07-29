var express = require('express');
var router = express.Router();
var Web3 = require('web3');
var Util= require("../util/util")
var Q=require("q")


/* GET home page. */
router.get('/tashomaPr', function(req, res, next) {

  res.render('systemFatherChildren', { title: 'Express' });


});





var create =function( idUser,callback){


Q.when(Util.readContract("/home/x4/ffff/Exosphere/portfolios/DavidJaramillo/wallet2/contracts/Sample.sol"))
.then(function(result){
    if(result!=null)
    {

    var web3 = new Web3(new Web3.providers.HttpProvider(  global["iprpc"])  );


    var contractSource=result;

        
        //600000
       //Compila contrato
        var contractCompiled = web3.eth.compile.solidity(contractSource);
        console.log(contractCompiled);

        var sampleContract = web3.eth.contract(contractCompiled.Sample.info.abiDefinition);
        
        
        var sampleInstancia = sampleContract.new(idUser,{from:web3.eth.accounts[0], data: contractCompiled.Sample.code, gas: 300000}
        , function(e, contract){
            if(!e) {

                if(!contract.address) {
                    console.log("Contract transaction send: TransactionHash: " + contract.transactionHash + " waiting to be mined...");

                } else {
                    console.log("Contract mined! Address: " + contract.address);
                    var error=false;
                    callback(error,contract.address,contract.transactionHash)
                   
                }

            }
            else{
                var error=true;
                console.log(e);
                callback(error,null,null)
                
            }
        })

    }
  
});


}



router.get('/createQuery/', function(req, res, next) {
//get value
var userId=req.query.idUser;


//it is function
create(userId,function(error,address,hash){
    console.log("i finish for wait")


    var collection= db.collection("userAddress");
    collection.insert({"userId":userId ,"addressMain":address,"hash":hash }, {}, function(e, results){
        if (e) 
        {
            return next(e)
        }
       
        res.json(
            {
                "infoFather":{
                    "addressContract":"XXXXXXXXXX" 
                }
                ,"listChildren":[
                        {"addressContract":"YYYY1" }
                        ,{"addressContract":"YYYY2" }
                        ,{"addressContract":"YYYY3" }
                        ,{"addressContract":"YYYY4" }
                ]
            }
        );
        

    });




   


});

});




module.exports = router;
