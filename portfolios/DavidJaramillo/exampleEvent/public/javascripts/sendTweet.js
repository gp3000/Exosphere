$(function(){

   // alert("test");
$("#tTweet").addClass("active");


   var fillTable=function(jsonData){
        $("#infoEvent thead tr").empty();
        $("#infoEvent tbody").empty();

        var ht=jsonData.headers;
        for(var i =0;i< ht.length;i++)
        {
            var $th = $("<th>").text(ht[i]);
            $("#infoEvent thead tr").append($th);
        }



        var rowT= _.sortBy(jsonData.row, function(o) { return -1*Number(o._timestamp); }) ;
        for(var i =0;i< rowT.length;i++)
        {

            var $tr = $("<tr>");
            var el=rowT[i];
            for(var j =0;j< ht.length;j++)
            {
                     var $td = $("<td>").text( el[  ht[j] ]  );
                     $tr.append($td);
            }
            
          $("#infoEvent tbody").append($tr);
                
        }



   }



   $("#send").click(function(){

   $("#result").hide()
        $("#wait").show()


      var dataForm={"address":$('#dataForm input[name="address"]').val()
                   ,"message":$('#dataForm input[name="message"]').val()  };

        $.ajax({
                method: "POST",
                url: "/sendTweet/"
                ,cache:false
                ,data: JSON.stringify(dataForm)
                ,contentType: 'application/json'

               
        })
        .done(function( respJson ) {

       $("#wait").hide()

        
               // debugger;
        fillTable(respJson);
        $("#result").show()

        })  
        .fail(function(error) {
            $("#wait").hide()
            alert( JSON.stringify (error)  );
        });









  

   });




})