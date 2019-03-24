$(document).ready(function() {
  $('body').bootstrapMaterialDesign();

  if(patient.pathway == "requester") {
    $('#no_specimen_modal').modal({

    },'show');

    document.getElementById("26").setAttribute("hidden", "hidden");

  }

  if(localStorage.getItem("connection") == "offline") {

  } else {
    translate('lab');
  }

  trigger_toggle();
  var success = function(sr) {
    if(typeof(sr) != "undefined") {
      console.log("controller - fetching lab - SUCCESSFUL");
      sessionStorage.setItem("lab_fetch", "true");
      // console.log(sr);
      _form.date_specimen_received.valueAsDate = new Date(sr.date_specimen_received);
      _form.received_by.value = sr.received_by;
      _form.lsn.value = sr.lab_serial_number;
      // console.log
      _form.date1.valueAsDate = new Date(sr.smr_date);
      if(typeof(sr.smr_result_1) != "undefined") {
        _form.elements.result_1.value = sr.smr_result_1;
        for(var x in _form.elements.result_1)
          if(_form.elements.result_1[x].value == sr.smr_result_1)
            _form.elements.result_1[x].click();
        _form.elements.result_2.value = sr.smr_result_2;
      }

      if(sr.xpert_date !== null) {
        if(typeof(sr.mtb_result) != 'undefined') {
          // _form_xpert.elements.mtb_results = sr.xpert_results.mtb_results == 'undefined' ?
          for(var i=0;i<_form_xpert.elements.mtb_results.length; ++i) {
            // console.log(_form_xpert.elements.mtb_results[i].value);
            if(typeof(sr.mtb_result) != 'undefined') {
              if(_form_xpert.elements.mtb_results[i].value == sr.mtb_result) {
                // console.log("Found match");
                _form_xpert.elements.mtb_results[i].click();
                break;
              } else {
              //   console.log( _form_xpert.elements.mtb_results[i].value == sr.mtb_result);
              //   console.log( _form_xpert.elements.mtb_results[i].value,sr.xpert_results.mtb_result);
              }
            }
          }
        }
        if(typeof(sr.rif_result) != 'undefined') {
          console.log("GOT A RIF")
          // _form_xpert.elements.mtb_results = sr.xpert_results.mtb_results == 'undefined' ?
          for(var i=0;i<_form_xpert.elements.rif_results.length; ++i) {
            if(_form_xpert.elements.rif_results[i].value == sr.rif_result) {
              _form_xpert.elements.rif_results[i].click();
              break;
            }
          }
        }
      }

      _form_xpert.unique_code.value = sr.unique_code;
      _form_xpert.mtb_date.valueAsDate = new Date(sr.xpert_date);

      if(sr.source == "automatic")
        _form_xpert.automatic_input.click();
      // _form_xpert.automatic_input.checked = sr.auto == "automatic" ? true : false;
    }

  }
  var failed = function() {}

  transmission.fetch("patient", success, failed , "lab");

});

document.forms['smear_results_form'].onsubmit = function() {
  console.log("controller - lab");
  var xpert_form = document.forms['machine_results'];

  var source =
   xpert_form.automatic_input.checked == true ?
   xpert_form.automatic_input.value
   : "manual";
   // console.log(`source ${source}`)

  // if(xpert_form.automatic_input.checked)
  if(xpert_form.unique_code.hasAttribute("required") && xpert_form.unique_code.value.length < 1) {
    xpert_form.unique_code.select();
    xpert_form.unique_code.placeholder = "Cannot be empty!";
    return false;
  }

  var received_by =
  this.received_by.value.toUpperCase();
  // console.log("Received: ", received_by);

  var date_specimen_received =
  this.date_specimen_received.value;

  var lab_serial_number =
  this.lsn.value.toUpperCase();

  // console.log("LSN: ", lsn);
  var smr_date = this.date1.value;

  var smr_result_1 =
  extract_radio(this.elements.result_1);

  var smr_result_2 =
  extract_radio(this.elements.result_2);

  var mtb_result =
  extract_radio(xpert_form.elements.mtb_results);

  var mtb_grade =
  extract_radio(xpert_form.elements.grade);

  var rif_result =
  extract_radio(xpert_form.elements.rif_results);

  var unique_code = xpert_form.unique_code.value.toUpperCase();
  // console.log("uniquue code: ", unique_code);
  var xpert_date = xpert_form.mtb_date.value;

  var automatic = xpert_form.automatic_input.value == "automatic" ? true : false;

  var pathway = "lab";
  var patient_id = JSON.parse(sessionStorage.getItem("patient")).id;
  var community_id = JSON.parse(sessionStorage.getItem("patient")).community_id;

  //for sms purposes
  var patient_name = JSON.prase(sessionStorage.getItem("patient")).name;
  var user_name = JSON.prase(localStorage.getItem("user")).name;


  var information = {
    "pathway" : pathway,
    "patient_id" : patient_id,
    "patient_name" : patient_name,
    "user_name" : user_name,
    "date_specimen_received" : date_specimen_received,
    "received_by" : received_by,
    "lab_serial_number" : lab_serial_number,
    "smr_date" : smr_date,
    "smr_result_1" : smr_result_1,
    "smr_result_2" : smr_result_2,
    "unique_code" : unique_code,
    "mtb_result" : mtb_result,
    "mtb_grade" : mtb_grade,
    "rif_result" : rif_result,
    "xpert_date" : xpert_date,
    "source" : source,
    "community_id" : community_id,
    "automatic" : automatic
  };
  // information = JSON.stringify(information);
  // console.log(information);

  var success = function() {
    var msg;
    var patient = JSON.parse(sessionStorage.getItem("patient"));
    patient.pathway = "lab";
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

  document.getElementById("main_display").innerHTML = "";

  var anim = bodymovin.loadAnimation(animData);
  anim.setSpeed(3.4);

  transmission.insert("patient", information, success);
  return false;
};

function toggle_forms(input) {
  if(input.checked) {
    console.log("checked");
    var values = document.forms['machine_results'];
    values.not_done.checked = true;
    values.not_done_1.checked = true;
    document.getElementById('mtb_results_group').setAttribute('hidden', 'hidden');
    document.getElementById('mtb_grades').setAttribute('hidden', 'hidden');
    document.getElementById('rif_results_group').setAttribute('hidden', 'hidden');
    console.log(values.length);
  } else {
    console.log("unchecked");
    document.getElementById('mtb_results_group').removeAttribute('hidden');
    document.getElementById('mtb_grades').removeAttribute('hidden');
    document.getElementById('rif_results_group').removeAttribute('hidden');
    var values = document.forms['machine_results'];
    console.log(values.length);
  }
}

function trigger_toggle() {
  console.log("triggered toggle");
  var results = document.forms['machine_results'];
  for(var x in results) {
    if(results[x] === null) {
      console.log("Found something null");
      continue;
    }
    if(results[x].id == 'not_done') {
      document.getElementById("unique_code").removeAttribute("required");
    } else {
      document.getElementById("unique_code").setAttribute("required", "required");
    }
    if(results[x].id == "detected" && results[x].checked) {
      document.getElementById("not_done_label").setAttribute("hidden", "hidden");
      document.getElementById("not_detected_1").setAttribute("checked", "checked");
      document.getElementById("rif_results_group").removeAttribute("hidden");
      document.getElementById("mtb_grades").removeAttribute("hidden")
      document.getElementById("high").checked = true;
      document.getElementById("detected_1").removeAttribute("disabled");
      document.getElementById("not_done_1").removeAttribute("disabled");
      document.getElementById("not_detected_1").removeAttribute("disabled");
      console.log("clicked DETECTED");
    }
    else if(results[x].checked && results[x].id == "trace") {
      console.log("Trace clicked")
      document.getElementById("high").checked = true;
      document.getElementById("high").checked = false;
      document.getElementById("detected_1").setAttribute("disabled", "disabled");
      document.getElementById("not_done_1").setAttribute("disabled", "disabled");
      document.getElementById("not_detected_1").setAttribute("disabled", "disabled");
      document.getElementById("mtb_grades").setAttribute("hidden", "hidden");
      document.getElementById("rif_results_group").removeAttribute("hidden");
      document.getElementById("indeterminate").checked = true;

    }
    else {
      document.getElementById("not_done_label").removeAttribute("hidden");
      document.getElementById("high").checked = true;
      document.getElementById("high").checked = false;
    }

    if(results[x].checked && (results[x].id == 'not_done' || results[x].id == 'not_detected' || results[x].id == 'error_invalid')) {
      document.getElementById("rif_results_group").setAttribute("hidden", "hidden");
      document.getElementById("mtb_grades").setAttribute("hidden", "hidden");
      document.getElementById("not_done_1").checked = true;
      break;
    }

    // else if(results[x].checked && results[x].id == "detected") {
    //   console.log("removing hidden result group");
    //
    //   document.getElementById("detected").checked == true ?  : document.getElementById("indeterminate").checked = true;
    //   console.log("REsults = " + results[x].value);
    //   break;
    // }
  }
}

function fetch(_form, _form_xpert) {
  console.log("Controller - fetching lab");
  var lab = new Lab;
  var success = function(_form, _form_xpert, information) {
    console.log("controller - fetching lab - SUCCESSFUL");
    sessionStorage.setItem("lab_fetch", "true");

    _form.date_specimen_received.value = information.date_received;
    _form.received_by.value = information.received_by;
    _form.lsn.value = information.lab_serial_number;
    // console.log
    _form.date1.value = information.smr_date;
    if(information.smr_results !== null) {
      _form.elements.result_1.value = information.smr_results.result_1;
      for(var x in _form.elements.result_1)
        if(_form.elements.result_1[x].value == information.smr_results.result_1)
          _form.elements.result_1[x].click();
      _form.elements.result_2.value = information.smr_results.result_2;
    }

    if(information.xpert_results !== null) {
      if(information.xpert_results.mtb_results !== 'undefined') {
        // _form_xpert.elements.mtb_results = information.xpert_results.mtb_results == 'undefined' ?
        for(var i=0;i<_form_xpert.elements.mtb_results.length; ++i) {
          // console.log(_form_xpert.elements.mtb_results[i].value);
          if(typeof information.xpert_results.mtb_result != 'undefined') {
            if(_form_xpert.elements.mtb_results[i].value == information.xpert_results.mtb_result) {
              console.log("Found match");
              _form_xpert.elements.mtb_results[i].click();
              break;
            } else {
              console.log( _form_xpert.elements.mtb_results[i].value == information.xpert_results.mtb_result);
              console.log( _form_xpert.elements.mtb_results[i].value,information.xpert_results.mtb_result);
            }
          }
        }
      }
      if(information.xpert_results.rif_results !== 'undefined') {
        // _form_xpert.elements.mtb_results = information.xpert_results.mtb_results == 'undefined' ?
        for(var i=0;i<_form_xpert.elements.rif_results.length; ++i) {
          if(_form_xpert.elements.rif_results[i].value == information.xpert_results.rif_results) {
            _form_xpert.elements.rif_results[i].click();
            break;
          }
        }
      }
    }

    if(information.auto == "automatic")
      _form_xpert.automatic_input.click();
    // _form_xpert.automatic_input.checked = information.auto == "automatic" ? true : false;
    _form_xpert.unique_code.value = information.unique_code;
    _form_xpert.mtb_date.value = information.xpert_date;
  }
  lab.fetch(_form,_form_xpert, success);
}
