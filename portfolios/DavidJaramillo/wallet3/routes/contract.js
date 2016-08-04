var express = require('express');
var router = express.Router();
var Web3 = require('web3');


/* GET home page. */
router.get('/query', function(req, res, next) {

  res.render('contract', { title: 'Express' });


});



router.get('/queryContract/', function(req, res, next) {

//TODO
//parse input 
var addressContract=req.query.address;
//web3
var web3 = new Web3(new Web3.providers.HttpProvider(  global["iprpc"])  );
if(web3.isConnected()) {

 var abi=[{"constant":false,"inputs":[{"name":"x","type":"string"}],"name":"set","outputs":[],"type":"function"},{"constant":true,"inputs":[],"name":"get","outputs":[{"name":"retVal","type":"string"}],"type":"function"},{"inputs":[{"name":"idUser","type":"string"}],"type":"constructor"}];


var SampleContract = web3.eth.contract(abi);
var contractInstance =  SampleContract.at(addressContract);
var getValueContract=contractInstance.get();


res.json({"addressContract":addressContract,"get":getValueContract});


} else {

   // start web3 filters, calls, etc
   res.status(503).json({"address":"error","balance":"eerror"});

}



});




/* GET home page. */
router.get('/setContract', function(req, res, next) {

  res.render('setContract', { title: 'Express' });


});




router.get('/setValueContract/', function(req, res, next) {

//TODO
//parse input 
var addressContract=req.query.address;
var value=req.query.setValue;
//web3
var web3 = new Web3(new Web3.providers.HttpProvider(  global["iprpc"])  );
if(web3.isConnected()) {

  var abi= [{
	"constant": false,
	"inputs": [{
		"name": "x",
		"type": "uint256"
	}],
	"name": "set",
	"outputs": [],
	"type": "function"
}, {
	"constant": true,
	"inputs": [],
	"name": "get",
	"outputs": [{
		"name": "retVal",
		"type": "uint256"
	}],
	"type": "function"
}];


var SampleContract = web3.eth.contract(abi);
var contractInstance =  SampleContract.at(addressContract);



contractInstance.set.sendTransaction(Number(value),{from:web3.eth.accounts[0], gas: 3000000} ,  function(err, hashMapTrans){


            if(err) {
                console.log(err);
                res.status(503).json({"address":"error","balance":"eerror"});

            } else {
                console.log("Contract mined! hashMapTrans: " + hashMapTrans);

                res.json({"hashMapTrans":hashMapTrans});
            }

});




} else {

   // start web3 filters, calls, etc
   res.status(503).json({"address":"error","balance":"eerror"});

}



});








module.exports = router;
