function ensureAppConfig() {
        if (window.APP_BASE_URL && window.API_BASE_URL) {
                return {
                        app_url: window.APP_BASE_URL,
                        api_url: window.API_BASE_URL,
                };
        }

        var resolved = {
                app_url: window.location.origin,
                api_url: window.location.origin,
        };

        try {
                var request = new XMLHttpRequest();
                request.open("GET", "/env-config", false);
                request.send(null);

                if (request.status >= 200 && request.status < 300) {
                        var response = JSON.parse(request.responseText);
                        if (response.app_url) {
                                resolved.app_url = response.app_url;
                        }
                        if (response.api_url) {
                                resolved.api_url = response.api_url;
                        } else if (response.app_url) {
                                resolved.api_url = response.app_url;
                        }
                }
        } catch (error) {
                console.error("Failed to load env-config", error);
        }

        window.APP_BASE_URL = resolved.app_url;
        window.API_BASE_URL = resolved.api_url || resolved.app_url;
        return {
                app_url: window.APP_BASE_URL,
                api_url: window.API_BASE_URL,
        };
}

var appConfig = ensureAppConfig();
var APP_BASE_URL = appConfig.app_url;
var API_BASE_URL = appConfig.api_url;

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
              url: APP_BASE_URL + "/getResultAI",
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





