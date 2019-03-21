document.forms['create_user_form'].onsubmit = function() {
  var username = this.username.value;
  var name = this.actual_name.value;
  var phonenumber = this.phonenumber.value;
  var service_provider = this.service_provider.value;
  var email = this.email.value;
  var password = this.password.value;
  var re_password = this.re_password.value;
  var region = this.region.value;
  var sub_region = this.sub_region.value;

  if(password !== re_password) {
    document.getElementById("error_passwords_do_not_match").removeAttribute("hidden")
    window.location.replace("#0")
    return false;
  }

  //TODO: check if passwords do match


  var information = {
    "name" : name,
    "username" : username,
    "password" : password,
    "region_id" : region,
    "community_id" : sub_region,
    "email" : email,
    "phonenumber" : phonenumber,
    "service_provider" : service_provider,
    "role" : ["requester"],
    "notifications" : ["positive_results"]
  }

  var success = function(user_id) {
    console.log("user created successfully");
    console.log("ID| ", user_id);
  }

  var failed = function(error_code) {
    switch(error_code) {
      case "ER_DUP_ENTRY":
      window.location.replace("#0")
      document.getElementById("error_user_exist").removeAttribute("hidden")
      break;
    }
  }

  console.log(information);

  transmission.insert("user", information, success, failed);

  return false;
}
