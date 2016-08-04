$(function(){

   // alert("test");

   $("#search").click(function(){


      
       var address=$("#address").val();
        var setValue=$("#setValue").val();
       

       $.ajax({
                method: "GET",
                url: "/setValueContract/"
                ,data:{"address":address,"setValue":setValue}
                
               
        })
        .done(function( respJson ) {



                alert( respJson.hashMapTrans);


        })

  

   });




})