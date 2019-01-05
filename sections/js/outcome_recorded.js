$(document).ready(function() {
  translate("outcome_recorded");
});


document.forms['outcome_form'].onsubmit = function() {
  document.getElementById("main_display").innerHTML = "";

  var anim = bodymovin.loadAnimation(animData);
  anim.setSpeed(3.4);

  var outcome_recorded = extract_radio(this.elements.treatment);
  var tb_rx_number = this.referred_tb_rx_number_write.value;
  var other = this.other.value;
  var comments = this.comments.value;
  var closePatient = this.elements.close_patient.checked ? true : false;
  var patient_id = sessionStorage.getItem("userId");
  var requester = {"name":this.req_name.value, "phonenumber":this.req_phonenumber.value, "email":this.req_email.value, "other":this.req_other.value, "date":this.req_date.value};

  var information = {"workerId":localStorage.getItem("userId"), "id":patient_id, "outcome_recorded":outcome_recorded, "other":other, "comments":comments, "close_patient":closePatient, "requester":requester, "tb_rx_number":tb_rx_number};

  var success = function() {
    var msg;
    switch(localStorage.getItem("lang")) {
      case "fr":
      msg = "<div class='jumbotron text-center' style='background-color:#09d033; color: white; font-weight: 100'><h5>Bien joué!</h5></div>";
      break;

      case "en":
      msg = "<div class='jumbotron text-center' style='background-color:#09d033; color: white; font-weight: 100'><h5>Well Done!</h5></div>";
      break;
    }
    document.getElementById("animationWindow").innerHTML = msg;
    setTimeout(function(){
      window.location.replace("index.html");
    }, 3000);
  };

  transmission.update("outcome_recorded", information, success);
}
