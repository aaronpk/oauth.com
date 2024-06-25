
function generate_state() {
  return random_string(16);
}

function generate_auth_code() {
  return random_string(48);
}

function generate_code_verifier() {
  return random_string(48);
}

function generate_code_challenge(verifier) {
  return base64_urlencode(sha256bin(verifier));
}

function completeStep(n) {
  $(".step-item:nth-child("+n+")").addClass("is-active").addClass("is-completed"); 
}

function moveToStep(n) {
  completeStep(n-1);
  $(".step-item:nth-child("+n+")").addClass("is-active");
}

function scrollAnimated(top) {
  top += $(".hero.is-primary").outerHeight();
  $("html,body").animate({scrollTop: top});
}

function showError() {
  $("#progress-section").addClass("hidden");
  $("#error-section").removeClass("hidden");
}

var client_info = {};

$(function(){
  var heroHeight = $(".hero.is-primary").height();

  $(window).bind("scroll", function(e) {
    if($(window).scrollTop() > heroHeight) {
      $("body").addClass("sticky");
    } else {
      $("body").removeClass("sticky");
    }
  });
});

function initializeClient(error, success) {
  if(Cookies.get("client_id")) {
    client_info.client_id = Cookies.get("client_id");
    client_info.client_secret = Cookies.get("client_secret");
    client_info.okta_url = Cookies.get("okta_url");
    client_info.base_url = Cookies.get("base_url");
    client_info.user_login = Cookies.get("user_login");
    client_info.user_password = Cookies.get("user_password");

    $(".client-id").text(client_info.client_id);
    $(".client-secret").text(client_info.client_secret);
    $(".okta-url").text(client_info.okta_url);
    $(".base-url").text(client_info.base_url);
    $(".user-login").text(client_info.user_login);
    $(".user-password").text(client_info.user_password);

    if(success) {
      success();
    }
  } else {
    if(error) {
      error();
    }
  }
}
