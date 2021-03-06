$(document).ready(function() {
  translate("outcome_recorded");

  var patient = JSON.parse(sessionStorage.getItem("patient"));
  if(patient.pathway != "follow_up" && patient.pathway != "outcome_recorded") {
    $('#no_specimen_modal').modal({

    },'show');

    document.getElementById("22").setAttribute("hidden", "hidden");

  }
});


document.forms['outcome_form'].onsubmit = function() {
  document.getElementById("main_display").innerHTML = "";

  var anim = bodymovin.loadAnimation(animData);
  anim.setSpeed(3.4);

  var outcome_recorded =
  extract_radio(this.elements.treatment);

  var tb_rx_number =
  this.referred_tb_rx_number_write.value;

  var other =
  this.other.value;

  var comments =
  this.comments.value;

  var close_patient =
  this.elements.close_patient.checked ? true : false;

  var requester = {
    "name":this.req_name.value,
    "phonenumber":this.req_phonenumber.value,
    "email":this.req_email.value,
    "other":this.req_other.value,
    "date":this.req_date.value
  };

  var pathway =
  "outcome_recorded";

  var patient_id =
  JSON.parse(sessionStorage.getItem("patient")).id;

  var user_id = JSON.parse(localStorage.getItem("user")).id;

  var data = {
    "user_id" : user_id,
    "outcome_recorded" : outcome_recorded,
    "other" : other,
    "comments" : comments,
    "close_patient" : close_patient,
    "requester" : requester,
    "tb_rx_number" : tb_rx_number
  };

  var success = function() {
    var msg;
    var patient = JSON.parse(sessionStorage.getItem("patient"));
    patient.pathway = "outcome_recorded";
    sessionStorage.setItem("patient", JSON.stringify(patient));
    if(data.close_patient == false) {
      switch(localStorage.getItem("lang")) {
        case "fr":
        msg = "<div class='jumbotron text-center' style='background-color:#09d033; color: white; font-weight: 100'><h5>Bien joué!</h5><br><br><a href='index.html' class=\"btn btn-main\">Aller au panneau de contrôle</a href='index.html'><br><br><a class=\"btn btn-main\" onclick=\"patientNavigation(localStorage.getItem('lang'))\">Naviguer le patient</a href='index.html'></div>";
        break;

        case "en":
        msg = "<div class='jumbotron text-center' style='background-color:#09d033; color: white; font-weight: 100'><h5>Well Done!</h5><br><br><a href='index.html' class=\"btn btn-info\">Return to Dashboard</a href='index.html'><br><br><a class=\"btn btn-info\" onclick=\"patientNavigation(localStorage.getItem('lang'))\">Navigate Patients</a href='index.html'></div>";
        break;
      }
    } else {
      switch(localStorage.getItem("lang")) {
        case "fr":
        msg = "<div class='jumbotron text-center' style='background-color:#09d033; color: white; font-weight: 100'><h5>Bien joué!</h5><br><br><a href='index.html' class=\"btn btn-main\">Aller au panneau de contrôle</a href='index.html'>";
        break;

        case "en":
        msg = "<div class='jumbotron text-center' style='background-color:#09d033; color: white; font-weight: 100'><h5>Well Done!</h5><br><br><a href='index.html' class=\"btn btn-info\">Return to Dashboard</a href='index.html'>";
        break;
      }
    }
    document.getElementById("animationWindow").innerHTML = msg;
    // setTimeout(function(){
    //   window.location.replace("index.html");
    // }, 3000);
  };
  var failed = function() {}

  var information = {
    uri : `/patients/${patient_id}/outcome_recorded`,
    body : data,
    on_success : success,
    on_failed : failed
  }

  if(sessionStorage.getItem("fetch_outcome") != "fetch") information['type'] = "post";
  else information['type'] = "put";

  // console.log(information);

  transmission_new(information);
  return false;
}
