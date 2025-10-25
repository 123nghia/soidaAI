
function drawResultAI() {

        var dataRegion =  JSON.parse( sessionStorage.dataCheckRegion);
        var outputCity =  "; Kết quả được thực hiện soi da ở  "  + dataRegion.city + "; ";
        var textQuestion =  $("#idGeneralResult").text() +  $("#danhsachketquatungphan").text() 
          + outputCity 
          + "; output" + dataConfigAI.question   
          +  " " + dataConfigAI.noted;
         var historyId = sessionStorage.historyId;

          document.getElementById("contentResultAI").innerHTML = `
    <div class="ai-loading-box">
  <div class="ai-loader-circle">
    <div class="dot"></div><div class="dot"></div><div class="dot"></div>
  </div>
  <div class="ai-loading-text">
    <div class="line-1">🤖 Đang phân tích làn da bằng AI chuyên sâu…</div>
    <div class="line-2">✨ Bạn vui lòng đợi giây lát để có kết quả tư vấn</div>
  </div>
</div>
    `;
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
                      document.getElementById("contentResultAI").innerHTML =  marked.parse(data);
                     
              },
              error: function(error) {
              
              }
          });
        } catch (e) {
          

        }

}





