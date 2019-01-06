$(document).ready(function() {
  $('body').bootstrapMaterialDesign();
  console.log("checking connection state");

  if(localStorage.getItem("connection") == "offline") {
    // console.log("Working offline");
    // controller = offlineController;
  } else if(sessionStorage.getItem("userId") == null) {
    // console.log("Working online");
    // controller = onlineController;

    sessionStorage.getItem("userId") != null && translate('new_patient');

    // FORM SUBMISSIION
    document.forms['new_patient_form'].onsubmit = function() {
      console.log("controller - registering patients - from it's own page");
      document.getElementById("main_display").innerHTML = "";

      var anim = bodymovin.loadAnimation(animData);
      anim.setSpeed(3.4);

      var name = this.name.value;
      var age = this.age.value;
      var sex = extract_radio(this.elements.gender);
      var address = this.address.value;
      var telephone = this.telephone.value;
      var telephone2 = this.telephone_2.value;
      // var patient_unique_code = this.patient_unique_code.value;
      var symptoms = extract_checkbox(this.elements.symptoms);
      var patientCategory = extract_checkbox(this.elements.patient_category);
      var artCode = this.art_code.value;
      patientCategory.push({"other":this.pc_other.value});
      if(artCode == "") {
        artCode = extract_radio(this.elements.has_art);
      }
      var wardBedNumber = this.ward_bed_number.value;
      if(wardBedNumber == "") {
        wardBedNumber = extract_radio(this.elements.status);
      }

      var specimen_type = extract_checkbox(this.elements.specimen_type);
      specimen_type.push({"other":this.st_other.value});

      var reasonForTest = this.presumption.value;

      var TbTreatmentHistory = {};
      TbTreatmentHistory['tb_treatment_history'] = extract_radio(this.elements.tb_treatment_history);
      TbTreatmentHistory["contact"] = this.contact.value;
      TbTreatmentHistory["tb_his_other"] = this.tb_his_other.value;

      var region = this.region.value;
      var subRegion = this.sub_region.value;

      var req_name = this.req_name.value;
      var req_email = this.req_email.value;
      var req_phonenumber = this.req_phonenumber.value;
      var req_other = this.req_other.value;
      var req_date = this.req_date.value;

      var req_information = {"req_name":req_name, "req_email":req_email, "req_phonenumber":req_phonenumber, "req_other":req_other, "req_date":req_date};

      var information = {"id":localStorage.getItem("userId"), "name":name, "age":age, "gender":sex, "address":address, "telephone":telephone, "telephone_2":telephone2, "symptoms":symptoms, "patient_category":patientCategory, "specimen_type":specimen_type, "reason_for_test":reasonForTest, "tb_treatment_history":TbTreatmentHistory, "requester":req_information, "art_code":artCode, "date": sessionStorage.getItem("_todays_date"), "ward_bed_number":wardBedNumber, "region_id":region, "sub_region_id":subRegion};
      // information = JSON.stringify(information);
      console.log(information);

      var success = function(sr) {
        var msg;
        switch(localStorage.getItem("lang")) {
          case "fr":
          msg = "<div class='jumbotron text-center' style='background-color:#09d033; color: white; font-weight: 100'><h5>Bien joué!</h5><br><h5 style=\"background-color: grey; font-weight: 100;\">ID DU PATIENT: " +sr.id+"</h5><br><br><a href='index.html' class=\"btn btn-info\">Aller au panneau de contrôle</a href='index.html'></div>";
          break;

          case "en":
          msg = "<div class='jumbotron text-center' style='background-color:#09d033; color: white; font-weight: 100'><h5>Well Done!</h5><br><h5 style=\"background-color: grey; font-weight: 100;\">PATIENT'S ID: " +sr.id+"</h5><br><br><a href='index.html' class=\"btn btn-info\">Return to Dashboard</a href='index.html'></div>";
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
    // alert("Not null")
    // alert(sessionStorage.getItem("userId"));
    var success = function(sr) {
      var form = document.forms["request_form"];

      form.id.value = sessionStorage.getItem("userId");
      form.id.setAttribute("disabled", "disabled");

      form.name.value = sr.name;
      form.name.setAttribute("disabled", "disabled");

      form.age.value = sr.age;
      form.age.setAttribute("disabled", "disabled");

      form.gender.value = sr.gender;
      form.gender.setAttribute("disabled", "disabled");

      form.address.value = sr.address;
      form.address.setAttribute("disabled", "disabled");

      form.telephone.value = sr.telephone;
      form.telephone.setAttribute("disabled", "disabled");

      form.telephone_2.value = sr.telephone_2;
      form.telephone_2.setAttribute("disabled", "disabled");

      form.art.value = sr.artCode;
      form.art.setAttribute("disabled", "disabled");

      form.status.value = sr.wardBedNumber;
      form.status.setAttribute("disabled", "disabled");

      form.symptoms.value = sr.symptoms;
      form.symptoms.setAttribute("disabled", "disabled");

      // form.patient_category.value = sr.patientCategory;
      // form.specimen_type.value = sr.specimenType;
      form.reason_for_test.value = sr.reasonForTest;
      form.reason_for_test.setAttribute("disabled", "disabled");

    }
    transmission._fetch("information", sessionStorage.getItem("userId"), success);
  }

});


function disable_pc(id) {
  if(id.checked)
    document.getElementById("pc_other").removeAttribute("required");
}
