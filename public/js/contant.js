function getAppConfig() {
  if (window.__APP_CONFIG__) {
    return window.__APP_CONFIG__;
  }

  try {
    var request = new XMLHttpRequest();
    request.open("GET", "/env-config", false);
    request.send(null);

    if (request.status >= 200 && request.status < 300) {
      window.__APP_CONFIG__ = JSON.parse(request.responseText);
      return window.__APP_CONFIG__;
    }
  } catch (error) {
    console.error("Failed to load env-config", error);
  }

  return {
    app_url: window.location.origin,
    api_url: window.location.origin,
  };
}

var appConfig = getAppConfig();
var APP_BASE_URL = appConfig.app_url || window.location.origin;
var API_BASE_URL = appConfig.api_url || APP_BASE_URL;

var slug = window.location.pathname.split("/")[1];
if (slug !== "") {
  slug += "/";
}
if(slug === 'cong-tac-vien/' || slug === 'chinh-sach-va-bao-mat/' || slug === 'dieu-khoan-va-su-dung/' ||slug === 'chinh-sach-bao-hanh/' ||slug === 'chinh-sach-tra-hang/' || slug ==='chinh-sach-bao-mat-thanh-toan/' || slug ==='van-chuyen-va-giao-hang/'){
  slug = '';
}
// Helper: build readable error message when calling soi-da API
function buildSoiDaErrorMessage(jqXHR, responseBody) {
  var msg = "";

  // Prefer explicit fields from response payload (if provided by backend)
  if (responseBody && typeof responseBody === "object") {
    msg = responseBody.message || responseBody.error || responseBody.msg || "";
  }

  // Inspect JSON body from jQuery error response
  if (!msg && jqXHR && jqXHR.responseJSON && typeof jqXHR.responseJSON === "object") {
    msg = jqXHR.responseJSON.message || jqXHR.responseJSON.error || jqXHR.responseJSON.msg || "";
  }

  // Try parsing text response as JSON, otherwise use raw text
  if (!msg && jqXHR && jqXHR.responseText) {
    try {
      var parsed = JSON.parse(jqXHR.responseText);
      if (parsed && typeof parsed === "object") {
        msg = parsed.message || parsed.error || parsed.msg || "";
      }
    } catch (err) {
      // Not JSON; fall back to plain text content
      msg = jqXHR.responseText;
    }
  }

  // Append HTTP status if available
  if (!msg && jqXHR && jqXHR.status) {
    msg = "Lỗi (" + jqXHR.status + " " + (jqXHR.statusText || "") + ")";
  }

  if (!msg) {
    msg = "Đã xảy ra lỗi, vui lòng thử lại.";
  }

  return msg;
}

function showCallSoiDaError(jqXHR, responseBody) {
  alert(buildSoiDaErrorMessage(jqXHR, responseBody));
}
var  api =  {

    baser_url:  API_BASE_URL,
    api_addUrl: "api/add-end-user",
    api_loginUser: "api/login-end-user",
    api_getInfo: "api/get-end-user-byId",
    api_getHistory: "api/get-history-skin-by-id",
    api_getHistoryById:  "api/get-detail-history-skin",
    api_CheckUrl: "api/check-access-slug",
    api_addUrl: `${slug}api/add-end-user`,
    api_loginUser: `${slug}api/login-end-user`,
    api_loginAdmin: `${slug}api/plugin-login_pg`,
    api_createByPg: `${slug}them-moi-khach-hang`,
    api_updateUser: `update-end-user`,
    api_getInfo: `${slug}api/get-end-user-byId`,
    api_getHistory: `${slug}api/get-history-skin-by-id`,
    api_getHistoryById: `${slug}api/get-detail-history-skin`,
    api_CheckUrl: `${slug}api/check-access-slug`,
    serve: {
        baser_urlServer: APP_BASE_URL,
        get_banner: `api/evoucher/banner/getAll`,
        api_logoutUser: `${slug}dang-xuat-he-thong`,
        api_registerUser: `${slug}dang-ky-nguoi-dung`,
        api_getCollaborators: `cong-tac-vien/get-all-customer`,
        get_all_voucher: `get-all-voucher`,
        get_all_history: `get-all-history`,
        api_get_all_company : `api/plugin-list-company`,
        api_get_information_config : `get-infomation-config`,
        api_registerCollaborators: `cong-tac-vien/them-moi-doi-tac`,
        api_getCampaignCollaborators: `cong-tac-vien/get-infomation-campaign`,
        api_loginServer: `${slug}dang-nhap-plugin`,
        api_loginServerGame: `${slug}dang-nhap-plugin-game`,
        api_saveHistory: `${slug}skin/add-history-skin-plugin`,
        api_getRecomendProduct: `${slug}skin/get-product-recomendProduct`,
        get_listHistory: `${slug}skin/get-list-history`,
        get_color: `${slug}make-up/get-makeup-color-by-typeId`,
        post_datlich: `${slug}user/booking`,
        get_api_soida: `${slug}skin/call-soi-da`,
        get_api_makeup: `${slug}skin/call-makup`,
        get_kltq2: `/${slug}get-ket-luan-chi-tiet`,
        get_tvtq2: `/${slug}get-tu-van-tong-quan`,
        get_campaign: `${slug}api/campaign/getAll`,
        get_footerData: `api/footerPage/getAll`,
        checkSlug: `api/check-access-url`,
        get_evoucher: `${slug}api/customer/requestVoucher`,
      },
};
