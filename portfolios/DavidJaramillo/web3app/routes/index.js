var express = require('express');
var router = express.Router();
var Web3 = require('web3');


/* GET home page. */
router.get('/', function(req, res, next) {


  res.render('index', { title: 'Express' });


});



router.get('/mybalance/:id', function(req, res, next) {

//TODO
//parse input 
var _id=req.param("id");
//web3
var web3 = new Web3(new Web3.providers.HttpProvider("http://192.168.0.38:8545"));
if(web3.isConnected()) {

   // show some dialog to ask the user to start a node
   var balance=web3.eth.getBalance(_id);
///'0x8a42e2eababb7a2590be8d70eac1d10b79414175',
//'0x4443b6d36a6b9bfca0f208a6c905c0868abb3469',
//

res.json({"address":_id,"balance":balance});


} else {

   // start web3 filters, calls, etc
   res.status(503).json({"address":"error","balance":"eerror"});

}



});



router.get('/newaccount/', function(req,res,next) {

   res.render('newaccount', {title: "New Ethereum Account"});  


   
});



router.post('/create/', function(req,res,next) {



var pass=req.body.pass;

console.log(pass)
  
//web3
var web3 = new Web3(new Web3.providers.HttpProvider("http://192.168.0.38:8545"));
if(web3.isConnected()) {

   // show some dialog to ask the user to start a node


   web3.personal.newAccount(pass,function(error,result){
     console.log(error)
     console.log(result)
    if(!error){
        console.log(result);

         res.json({ "address":result});
    }
    else{
       res.status(503).json(error);
    }
});


///'0x8a42e2eababb7a2590be8d70eac1d10b79414175',
//'0x4443b6d36a6b9bfca0f208a6c905c0868abb3469',
//




} else {

   // start web3 filters, calls, etc
   res.status(503).json({"address":"error","balance":"eerror"});

}



   
});






module.exports = router;
