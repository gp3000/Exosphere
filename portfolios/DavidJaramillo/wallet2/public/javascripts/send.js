$(function(){

   // alert("test");

   $("#send").click(function(){




       var  adressfrom =$("#addrs1").val();
       var adressto=$("#addrs2").val();
 var pass=$("#pass").val();
       

       var tm= {"adressfrom":adressfrom
                ,"adressto":adressto
                ,"pass":pass
                }

       $.ajax({
                method: "POST",
                url: "/send/",
              
              
                type: 'POST',
						    data: JSON.stringify(tm),
				        contentType: 'application/json'
        })
        .done(function( respJson ) {

               // alert( respJson.address+" "+respJson.balance);
            alert(JSON.stringify (respJson)  );

        })
          .fail(function(error) {
          alert( JSON.stringify (error)  );
  })
  

   });




})