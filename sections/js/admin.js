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

  document.getElementById("main_display").innerHTML = "";

  var anim = bodymovin.loadAnimation(animData);
  anim.setSpeed(3.4);

  //TODO: check if passwords do match


  var data = {
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

  sessionStorage.setItem("user_new_information", JSON.stringify(data));

  var success = function(user_id) {
    console.log("user created successfully");
    console.log("ID| ", user_id);
    sessionStorage.removeItem("user_new_information");
    window.location.reload(1);
  }

  var failed = function(data) {
    switch(data.code) {
      case "ER_DUP_ENTRY":
      sessionStorage.setItem("user_error_message", "show");
      var form = document.forms['create_user_form'];
      window.location.reload(1);
      break;
    }
  }

  var information = {
    type : "post",
    uri : `/users/`,
    body : data,
    on_success : success,
    on_failed : failed
  }

  console.log(information);

  transmission_new(information);

  // transmission.insert("user", information, success, failed);

  return false;
}
