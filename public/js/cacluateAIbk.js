
function drawResultAI() {

        var dataRegion =  JSON.parse( sessionStorage.dataCheckRegion);
        var outputCity =  "; Kết quả được thực hiện soi da ở  "  + dataRegion.city + "; ";
        var textQuestion =  $("#idGeneralResult").text() +  $("#danhsachketquatungphan").text() 
          + outputCity 
          + "; output" + dataConfigAI.question   
          +  " " + dataConfigAI.noted;
         var historyId = sessionStorage.historyId;
        try {
        $.ajaxSetup({
          headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
          },
        });
          $.ajax({
              type: "POST",
              data: {
                  "question": textQuestion,
                    "historyId": historyId
              },
              url: "https://applamdep.com/getResultAI",
              success: function(data) {
                      Swal.close();
                      document.getElementById("contentResultAI").innerHTML +=  marked.parse(data);
                     
              },
              error: function(error) {
              
              }
          });
        } catch (e) {
          

        }

}





