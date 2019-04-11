document.forms['user_settings'].onsubmit = function() {
  console.log(this);
  // console.warn("user settings submitted");
  var notifications = extract_checkbox(this.elements.notifications);
  var username = this.username.value;
  var phonenumber = this.phonenumber.value;
  var email = this.email.value;
  var service_provider = this.service_provider.value;
  var password = this.password.value;
  var re_password = this.re_password.value;
  var region_id = this.region.value;
  var community_id = this.sub_region.value;

  if(password != re_password) {
    document.getElementById("error_passwords_do_not_match").removeAttribute("hidden");
    window.location.replace("#0");
    return false;
  }

  document.getElementById("main_display").innerHTML = "";

  var anim = bodymovin.loadAnimation(animData);
  anim.setSpeed(3.4);

  var data = {
    "notifications" : JSON.stringify(notifications),
    "username" : username,
    "phonenumber" : phonenumber,
    "password" : password,
    "email" : email,
    "service_provider" : service_provider,
    "region_id" : region_id,
    "community_id" : community_id
  }

  var success = function() {
    console.warn("Running successful);")
    var user = JSON.parse(localStorage.getItem("user"));
    user.email = data.email;
    user.username = data.username;
    user.password = data.password;
    user.service_provider = data.service_provider;
    user.notifications = data.notifications;
    user.phonenumber = data.phonenumber;
    user.region_id = data.region_id;
    user.community_id = data.community_id;
    localStorage.setItem("user", JSON.stringify(user));
    window.location.reload(1);
  }
  var failed = function() {
    console.warn("Failed updating user settings");
  }

  var user_id = JSON.parse(localStorage.getItem("user")).id;

  var information = {
    type : "put",
    uri : `/users/${user_id}`,
    body : data,
    on_success : success,
    on_failed : failed
  }

  transmission_new(information);
  // transmission.update("user", information, success, failed);
  return true;
}


function extract_checkbox(elements) {
  var ret = new Array;
  for(var i=0;i<elements.length;i++) {
    if(elements[i].checked) {
      ret.push(elements[i].value);
    }
  }
  return ret;
}
