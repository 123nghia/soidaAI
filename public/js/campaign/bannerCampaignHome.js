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

var isLoading = true;
// loadingWeb(isLoading);
function loadingWeb (isLoading) {
    if (isLoading) {
        $('#loading').show();
    } else {
        $('#loading').hide();
    }
}
async function getAllCampaign(idRender, value) {

 
  $.ajaxSetup({
    headers: {
      "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
    }
  });
  await $.ajax({
    url: api.serve.baser_urlServer + "/" + api.serve.get_banner,
    type: "GET",
    data: {
      "type" : value
    },
    success: function (response) {
      if (response.is_success) {

        
        var renderBanner = document.getElementById(idRender);
        let dataDraw =dataWeb.vendorBanner;
        if(idRender!="renderBanner-new")
        {
          dataDraw = dataWeb.vendorBanner;
        }
        else 
        {
          dataDraw = dataWeb.bannerSkin;
        }


        if (renderBanner) {
          let colItem = ``;
          var index = 0;
          var indexCountItem = 0;
          dataDraw.forEach((item) => {
            index++;
          
            var src = ``;
            if (item.image_link && item.image_link.length > 0) {
             
              src  = API_BASE_URL + "/public/image_brand/" + item.image_link;

            } else {
              src = "https://api.thulamua.com/public/image_deal/yubhk.jpg";

            }
            let styles = `background-image:url('${src}')`;
      
            if(value == "1"){
              styles = `background-image:url('${src}');background-size: cover;`
            }
            let stylesBorder = ``;
      
            // if(value == "1"){
            //   stylesBorder = `border: 1px solid #ccc`
            // }

            
        
            if (index % 2 == 0) {
              colItem += `
                <div class="col-md-6 banner-item p-banner-item-right" >
                <div class="slide-right-banner banner-item-right" style="${stylesBorder}">
                      <a href=${item.hrefLink} class="a-none-hover">
                        <div class="banner-item-border-img" style="${styles}">                           
                        </div>
                      </a>

                      <div class="banner-item-description">
                        <a href="${item.hrefLink}">
                          <p>${item.name} </p>
                        </a>`;
                        if(item.countSkin)
                        {
                          colItem += `<div class="flex" style="min-width: 30%;margin:auto 0;display:flex;justify-content: right;">
                         
                          <p style="text-transform:none"><strong>`+item.countSkin+` </strong>Lượt soi và tư vấn</p> 
                         </div>`;
                        }
                         colItem += `
                         </div>
                      </div>
                  </div>
                  `;
            } else {
              colItem += `
                <div class=" col-md-6 banner-item p-banner-item-left">
                <div class=" slide-left-banner banner-item-left"  style="${stylesBorder}">
                      <a href=${item.hrefLink} class="a-none-hover" >
                        <div class="banner-item-border-img " style="${styles}">

                        </div>
                      </a>

                      <div class="banner-item-description">
                      <a  href=${item.hrefLink}>
                          <p>${item.name} </p>
                          </a>`;
                          if(item.countSkin)
                          {
                            colItem += `<div class="flex" style="min-width: 30%;margin:auto 0;display:flex;justify-content: right;">
                           
                            <p style="text-transform:none"><strong>`+item.countSkin+` </strong> Lượt soi và tư vấn</p> 
                           </div>`;
                          }
                           colItem += `
                           </div>
                  </div>
                  </div>
                  `;
            }
            indexCountItem++;

          });
          renderBanner.innerHTML += colItem;

        }
        if (document.body.clientWidth > 600) {


        } else {
          $("#renderBanner").removeClass("js-scroll");
          let bannerLeft = document.getElementsByClassName("banner-item-left");
          let bannerRight = document.getElementsByClassName("banner-item-right")
          for (let i = 0; i < bannerLeft.length; i++) {
            bannerLeft[i].classList.remove("slide-left-banner");
            bannerLeft[i].classList.add("fade-bottom");
          };
          for (let i = 0; i < bannerRight.length; i++) {
            bannerRight[i].classList.remove("slide-right-banner");
            bannerRight[i].classList.add("fade-bottom");
          };
        }
        const scrollElements = document.querySelectorAll(".js-scroll");
        const elementInView = (el, dividend = 1) => {
          const elementTop = el.getBoundingClientRect().top;

          return (
            elementTop <=
            (window.innerHeight || document.documentElement.clientHeight) / dividend
          );
        };

        const elementOutofView = (el) => {
          const elementTop = el.getBoundingClientRect().top;

          return (
            elementTop > (window.innerHeight || document.documentElement.clientHeight)
          );
        };

        const displayScrollElement = (element) => {
          element.classList.add("scrolled");
        };

        const hideScrollElement = (element) => {
          element.classList.remove("scrolled");
        };

        const handleScrollAnimation = () => {


          scrollElements.forEach((el) => {
            if (elementInView(el, 1)) {
              displayScrollElement(el);
            } else if (elementOutofView(el)) {
              //   hideScrollElement(el)
            }
          })
        }

        const backtoTop = document.querySelector(".status-backToTop-campaign"),
          font_nav = document.getElementsByClassName("scroll-nav-font"),
          height_nav = document.getElementsByClassName("scroll-nav-height");
        document.body.addEventListener('scroll', () => {
          handleScrollAnimation();
          if (document.body.scrollTop > 1 || document.documentElement.scrollTop > 1) {
            if (font_nav && height_nav) {
              for (let i = 0; i < height_nav.length; i++) {
                height_nav[i].classList.add("nav-height-change");
              };
              for (let i = 0; i < font_nav.length; i++) {
                font_nav[i].classList.add("nav-font-change");
              };
            };
          } else {
            if (font_nav && height_nav) {
              for (let i = 0; i < height_nav.length; i++) {
                height_nav[i].classList.remove("nav-height-change");
              };
              for (let i = 0; i < font_nav.length; i++) {
                font_nav[i].classList.remove("nav-font-change");
              };
            };
          }

          if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
            if (backtoTop) {
              backtoTop.style.display = "block";
            };
          } else {
            if (backtoTop) {
              backtoTop.style.display = "none";
            };
          }
        });
        
      };
      
    },
    error: function (jqXHR, textStatus, errorThrown) {

     },
  });
}




isLoading = false;


// Check if element is scrolled into view
