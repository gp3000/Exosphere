$(function(){

   // alert("test");

   $("#search").click(function(){



       $("div.result").hide();
       var pass=$("#pass").val();
       var tm= {"pass":pass}

       $.ajax({
                method: "POST",
                url: "/create/",
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