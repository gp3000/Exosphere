var express = require('express');
var router = express.Router();
var Web3 = require('web3');



router.get('/saveData/', function(req, res, next) {

//TODO
//parse input 
var name= req.query.name;

var collection= db.collection("sipmle");
collection.insert({"name":name}, {}, function(e, results){
    if (e) return next(e)
    res.json(results)
  })

});



/* GET home page. */
router.get('/', function(req, res, next) {


  res.render('index', { title: 'Express' });


});



router.get('/mybalance/:id', function(req, res, next) {

//TODO
//parse input 
var _id=req.param("id");
//web3
var web3 = new Web3(new Web3.providers.HttpProvider(  global["iprpc"])  );
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


router.get('/sendTx/', function(req,res,next) {

   res.render('sendTx', {title: "New Ethereum Account"});  


   
});




router.post('/send/', function(req,res,next) {


/*Step basic
1 get value
2 invoke web3(geth)
3 process response web3
4 response client (browser)(json)
*/
var adressfrom=req.body.adressfrom;
var adressto=req.body.adressto;
var pass=req.body.pass;


console.log(adressfrom)
console.log(adressto)
console.log(pass)
  
//web3
var web3 = new Web3(new Web3.providers.HttpProvider( global["iprpc"]));
if(web3.isConnected()) {

   // show some dialog to ask the user to start a node



    web3.personal.unlockAccount(adressfrom, pass,10);

    var transObj={
      "from": adressfrom,
      "to": adressto,
      "value":  web3.toWei(0.1, "ether")
    };

    web3.eth.sendTransaction(transObj,function(error, address) {
      if (!error)
      {
        console.log(address); 

         res.json({ "address":address});
      }
      else{
        res.status(503).json(error);
      }

    }
    
    );






} else {


   res.status(503).json({"address":"error","balance":"eerror"});

}



   
});






router.post('/create/', function(req,res,next) {


/*Step basic
1 get value
2 invoke web3(geth)
3 process response web3
4 response client (browser)(json)
*/
var pass=req.body.pass;

console.log(pass)
  
//web3
var web3 = new Web3(new Web3.providers.HttpProvider( global["iprpc"]));
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
