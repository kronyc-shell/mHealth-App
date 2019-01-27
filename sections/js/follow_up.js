$(document).ready(function() {
  translate("follow_up");
});


document.forms['follow_up_form'].onsubmit = function() {
  document.getElementById("main_display").innerHTML = "";

  var anim = bodymovin.loadAnimation(animData);
  anim.setSpeed(3.4);
  var amoxicilinPrescribed = this.amoxicilin.checked ? true : false;
  var xray = this.xray.checked ? true : false;
  var otherAntibiotic = this.otherAntibiotic.value;
  var followUpDate = this.follow_up_date.value;
  var comments = this.comments.value;

  var information = {"workerId":localStorage.getItem("userId"), "id":sessionStorage.getItem("userId"), "amoxicilin_prescribed":amoxicilinPrescribed, "xray":xray, "other_antibiotic":otherAntibiotic, "follow_up_date":followUpDate, "comments":comments};

  var success = function() {
    var msg;
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

  transmission.update("follow_up", information, success);
}
