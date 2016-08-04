$(function(){

   // alert("test");

   $("#search").click(function(){


      
       var address=$("#address").val();
       

       $.ajax({
                method: "GET",
                url: "/queryContract/"
                ,data:{"address":address}
               
        })
        .done(function( respJson ) {



                alert( respJson.addressContract+" "+respJson.get);


        })

  

   });




})