$(function(){

   // alert("test");

$("#tAccount").addClass("active");

   $("#create").click(function(){



      var dataForm=$('#dataForm input[name="name"]').val();
        $("#result").hide()
        $("#wait").show()
       $.ajax({
                method: "POST",
                url: "/create/",
               
                cache:false,
                data: JSON.stringify({"name":dataForm}),
                contentType: 'application/json'
               
               
        })
        .done(function( respJson ) {
        $("#wait").hide()

        $("#result").show()
            //debugger;
            $("#infoResp").html(respJson.address);
        })
        .fail(function(error) {
            $("#wait").hide()
            alert( JSON.stringify (error)  );
        });










  

   });




})