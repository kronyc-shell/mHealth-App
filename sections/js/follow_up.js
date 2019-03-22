$(document).ready(function() {
  translate("follow_up");

  var patient = JSON.parse(sessionStorage.getItem("patient"));
  if(patient.pathway == "requester" || patient.pathway == "specimen") {
    $('#no_specimen_modal').modal({

    },'show');

    document.getElementById("22").setAttribute("hidden", "hidden");

  }
});


document.forms['follow_up_form'].onsubmit = function() {
  document.getElementById("main_display").innerHTML = "";

  var anim = bodymovin.loadAnimation(animData);
  anim.setSpeed(3.4);

  var amoxicillin =
  this.amoxicilin.checked ? true : false;

  var xray =
  this.xray.checked ? true : false;

  var other_antibiotic =
  this.otherAntibiotic.value;

  var follow_up_scheduled_date =
  this.follow_up_date.value;

  var comments =
  this.comments.value;

  var pathway = "follow_up";
  var patient_id = JSON.parse(sessionStorage.getItem("patient")).id;

  var information = {
    "pathway" : pathway,
    "patient_id" : patient_id,
    "xray" : xray,
    "amoxicillin" : amoxicillin,
    "other_antibiotic" : other_antibiotic,
    "follow_up_scheduled_date" : follow_up_scheduled_date == '' ? null : follow_up_scheduled_date,
    "comments" : comments
  };

  var success = function() {
    var msg;
    var patient = JSON.parse(sessionStorage.getItem("patient"));
    patient.pathway = "follow_up";
    sessionStorage.setItem("patient", JSON.stringify(patient));
    switch(localStorage.getItem("lang")) {
      case "fr":
      msg = "<div class='jumbotron text-center' style='background-color:#09d033; color: white; font-weight: 100'><h5>Bien joué!</h5><br><br><a href='index.html' class=\"btn btn-main\">Aller au panneau de contrôle</a href='index.html'><br><br><a class=\"btn btn-main\" onclick=\"patientNavigation(localStorage.getItem('lang'))\">Naviguer le patient</a href='index.html'></div>";
      break;

      case "en":
      msg = "<div class='jumbotron text-center' style='background-color:#09d033; color: white; font-weight: 100'><h5>Well Done!</h5><br><br><a href='index.html' class=\"btn btn-info\">Return to Dashboard</a href='index.html'><br><br><a class=\"btn btn-info\" onclick=\"patientNavigation(localStorage.getItem('lang'))\">Navigate Patients</a href='index.html'></div>";
      break;
    }
    document.getElementById("animationWindow").innerHTML = msg;
    // setTimeout(function(){
    //   window.location.replace("index.html");
    // }, 3000);
  };

  transmission.insert("patient", information, success);

  return false;
}
