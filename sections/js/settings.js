document.forms['user_settings'].onsubmit = function() {
  // console.log("user settings submitted");
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

  var success = function(serverResponse) {
    
  }
  var failed = function() {}

  transmission.update("user", information, success, failed);
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
