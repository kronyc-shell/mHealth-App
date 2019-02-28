document.forms['user_settings'].onsubmit = function() {
  console.warn("user settings submitted");
  var notifications = extract_checkbox(this.elements.notifications);
  var username = this.username.value;
  var phonenumber = this.phonenumber.value;
  var email = this.email.value;
  var service_provider = this.service_provider.value;

  var information = {
    "notifications" : JSON.stringify(notifications),
    "username" : username,
    "phonenumber" : phonenumber,
    "email" : email,
    "service_provider" : service_provider
  }

  var success = function() {
    console.warn("Running successful);")
    var user = JSON.parse(localStorage.getItem("user"));
    user.email = information.email;
    user.username = information.username;
    user.service_provider = information.service_provider;
    user.notifications = JSON.parse(information.notifications);
    localStorage.setItem("user", JSON.stringify(user));
    window.location.reload(1);
  }
  var failed = function() {
    console.warn("Failed updating user settings");
  }

  transmission.update("user", information, success, failed);
  return false;
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
