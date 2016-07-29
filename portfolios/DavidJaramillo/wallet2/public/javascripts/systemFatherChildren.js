$(function(){

///-------------------------------------------
   ///event create o query
   $("#createQuery").click(function(){


      
       var idUser=$("#idUser").val();
       

       $.ajax({
                method: "GET",
                url: "/createQuery/"
                ,data:{"idUser":idUser}
               
        })
        .done(function( respJson ) {
            var infoFather=respJson.infoFather;
            $("#addressContractUser").val(infoFather.addressContract)
            var arrayInfoChildren=respJson.listChildren;

            $("#infoFather").html(JSON.stringify(infoFather) )

            $("#infoChildren").html(JSON.stringify(arrayInfoChildren) );
             
             /*
             for(var i=0;i<arrayInfoChildren.length;i++ )
             {

                 var $infoChildDiv = $('<div/>',{ "html": arrayInfoChildren[i]});
                $("#infoChildren").append($infoChildDiv);
             }
*/

             $("#result").show()
        });
//--------------------------------------------------------------------
  






   });




})