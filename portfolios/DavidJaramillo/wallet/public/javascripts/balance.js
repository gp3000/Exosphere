$(function(){

   // alert("test");

   $("#search").click(function(){


       $("div.result").hide();
       var id=$("#address").val();
       

       $.ajax({
                method: "GET",
                url: "/mybalance/"+id
               
        })
        .done(function( respJson ) {


               // alert( respJson.address+" "+respJson.balance);
$("div.result").show();
$(".address").html(respJson.address);
$(".balance").html(respJson.balance);

        })
          .fail(function() {
    alert( "error" );
  })
  

   });




})