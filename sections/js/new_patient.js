$(document).ready(function() {
  $('body').bootstrapMaterialDesign();
  console.log("checking connection state");

  if(localStorage.getItem("connection") == "offline") {
    // console.log("Working offline");
    // controller = offlineController;
  } else if(1
    //sessionStorage.getItem("patient") == null
  ) {
    // console.log("Working online");
    // controller = onlineController;

    sessionStorage.getItem("userId") == null && translate('new_patient');

    // FORM SUBMISSIION
    document.forms['new_patient_form'].onsubmit = function() {
      console.log("controller - registering patients - from it's own page");
      document.getElementById("main_display").innerHTML = "";

      var anim = bodymovin.loadAnimation(animData);
      anim.setSpeed(3.4);

      var name = this.name.value;
      var age = this.age.value;
      var gender = extract_radio(this.elements.gender);
      var address = this.address.value;
      var telephone1 = this.telephone.value;
      var telephone2 = this.telephone_2.value;
      // var patient_unique_code = this.patient_unique_code.value;
      var art_code = this.art_code.value;

      var symptoms =
      extract_checkbox(this.elements.symptoms);

      var patient_category =
      extract_checkbox(this.elements.patient_category);

      patient_category.push({"other":this.pc_other.value});
      if(art_code == "") {
        art_code =
        extract_radio(this.elements.has_art);
      }

      var ward_bed_number =
      this.ward_bed_number.value;

      if(ward_bed_number == "") {
        ward_bed_number =
        extract_radio(this.elements.status);
      }

      var specimen_type =
      extract_checkbox(this.elements.specimen_type);

      specimen_type.push({"other":this.st_other.value});

      var reason_for_test =
      this.presumption.value;

      var tb_treatment_history = {};

      tb_treatment_history['tb_treatment_history'] =
      extract_radio(this.elements.tb_treatment_history);

      tb_treatment_history["contact"] =
      this.contact.value;

      tb_treatment_history["tb_his_other"] =
      this.tb_his_other.value;

      var region_id = this.region.value;
      var community_id = this.sub_region.value;

      var req_name = this.req_name.value;
      var req_email = this.req_email.value;
      var req_phonenumber = this.req_phonenumber.value;
      var req_other = this.req_other.value;
      var req_date = this.req_date.value;

      var requester =
      {
        "name":req_name,
        "email":req_email,
        "phonenumber":req_phonenumber,
        "other":req_other,
        "date":req_date
      };

      var pathway = "information";

      var information = {
        "pathway" : pathway,
        "region_id" : region_id,
        "community_id" : community_id,
        "name" : name,
        "age" : age,
        "gender" : gender,
        "address" : address,
        "telephone1" : telephone1,
        "telephone2" : telephone2,
        "art_code" : art_code,
        "reason_for_test" : reason_for_test,
        "ward_bed_number" : ward_bed_number,
        "patient_category" : patient_category,
        "specimen_type" : specimen_type,
        "tb_treatment_history" : tb_treatment_history,
        "symptoms" : symptoms,
        "requester" : requester
      };
      // information = JSON.stringify(information);
      console.log(information);

      var success = function(patient) {
        sessionStorage.setItem("patient", JSON.stringify(patient));
        var msg;
        switch(localStorage.getItem("lang")) {
          case "fr":
          msg = "<div class='jumbotron text-center' style='background-color:#09d033; color: white; font-weight: 100'><h5>Bien joué!</h5><br><h5 style=\"background-color: grey; font-weight: 100;\">ID DU PATIENT: " +patient.id+"</h5><br><br><a href='index.html' class=\"btn btn-info\">Aller au panneau de contrôle</a href='index.html'><br><br><a class=\"btn btn-info\" onclick=\"patientNavigation(localStorage.getItem('lang'))\">Naviguer le patient</a href='index.html'></div>";
          break;

          case "en":
          msg = "<div class='jumbotron text-center' style='background-color:#09d033; color: white; font-weight: 100'><h5>Well Done!</h5><br><h5 style=\"background-color: grey; font-weight: 100;\">PATIENT'S ID: " +patient.id+"</h5><br><br><a href='index.html' class=\"btn btn-info\">Return to Dashboard</a href='index.html'><br><br><a class=\"btn btn-info\" onclick=\"patientNavigation(localStorage.getItem('lang'))\">Navigate Patients</a href='index.html'></div>";
          break;
        }
        document.getElementById("animationWindow").innerHTML = msg;
        // setTimeout(function(){
        //   window.location.replace("index.html");
        // }, 3000);

      };

      transmission.insert("information", information, success);
      return false;
    };

    // CHECKS IF CHILD
    document.getElementById("chi").onclick = function() {
      // console.log("child taken");
      if(this.checked && document.getElementById("age").value > 15) {
        this.checked = false;
        document.getElementById("label_child").innerHTML = localStorage.getItem("lang") == "en" ? "Child (CHI) <small style='color: red;'> age is > 15 years old</small>" : "Enfant (CHI)  <small style='color: red;'> l'âge est> 15 ans</small>";
      } else if(document.getElementById("age").value == "" || document.getElementById("age").value == null) {
        this.checked = false;
        $(document.getElementById("age"))[0].scrollIntoView(false);
        document.getElementById("age").select();
      }
      else if(this.checked && document.getElementById("age").value < 16) {
        document.getElementById("label_child").innerHTML = "Enfant (CHI)";
      }
    }
  } else {
    console.log("Got to this option");
    // alert("Not null")
    // alert(sessionStorage.getItem("userId"));
    // var success = function(sr) {
    //   var form = document.forms["request_form"];
    //
    //   form.id.value = sessionStorage.getItem("userId");
    //   form.id.setAttribute("disabled", "disabled");
    //
    //   form.name.value = sr.name;
    //   form.name.setAttribute("disabled", "disabled");
    //
    //   form.age.value = sr.age;
    //   form.age.setAttribute("disabled", "disabled");
    //
    //   form.gender.value = sr.gender;
    //   form.gender.setAttribute("disabled", "disabled");
    //
    //   form.address.value = sr.address;
    //   form.address.setAttribute("disabled", "disabled");
    //
    //   form.telephone.value = sr.telephone;
    //   form.telephone.setAttribute("disabled", "disabled");
    //
    //   form.telephone_2.value = sr.telephone_2;
    //   form.telephone_2.setAttribute("disabled", "disabled");
    //
    //   form.art.value = sr.artCode;
    //   form.art.setAttribute("disabled", "disabled");
    //
    //   form.status.value = sr.wardBedNumber;
    //   form.status.setAttribute("disabled", "disabled");
    //
    //   form.symptoms.value = sr.symptoms;
    //   form.symptoms.setAttribute("disabled", "disabled");
    //
    //   // form.patient_category.value = sr.patientCategory;
    //   // form.specimen_type.value = sr.specimenType;
    //   form.reason_for_test.value = sr.reasonForTest;
    //   form.reason_for_test.setAttribute("disabled", "disabled");
    //
    // }
    // transmission._fetch("information", sessionStorage.getItem("userId"), success);
  }

});


function disable_pc(id) {
  if(id.checked)
    document.getElementById("pc_other").removeAttribute("required");
}
