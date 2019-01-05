$(document).ready(function() {
  $('body').bootstrapMaterialDesign();

  if(localStorage.getItem("connection") == "offline") {

  } else {
    translate('lab');
  }
});

document.forms['smear_results_form'].onsubmit = function() {
  console.log("controller - lab");
  var xpert_form = document.forms['machine_results'];
  var auto = xpert_form.automatic_input.checked ? xpert_form.automatic_input.value : null;
  // if(xpert_form.automatic_input.checked)
  if(xpert_form.unique_code.hasAttribute("required") && xpert_form.unique_code.value.length < 1) {
    xpert_form.unique_code.select();
    xpert_form.unique_code.placeholder = "Cannot be empty!";
    return false;
  }
  var received_by = this.received_by.value.toUpperCase();
  // console.log("Received: ", received_by);
  var date_specimen_received = this.date_specimen_received.value;
  var lsn = this.lsn.value.toUpperCase();
  // console.log("LSN: ", lsn);
  var date1 = this.date1.value;
  var smr_results = {"result_1":extract_radio(this.elements.result_1), "result_2":extract_radio(this.elements.result_2)};
  var xpert_results = auto == "automatic" ? null : {"mtb_result":extract_radio(xpert_form.elements.mtb_results), "rif_results":extract_radio(xpert_form.elements.rif_results)};

  var unique_code = xpert_form.unique_code.value.toUpperCase();
  // console.log("uniquue code: ", unique_code);
  var xpertDate = xpert_form.mtb_date.value;
  var type = "insert";

  var information = {"worker_id":localStorage.getItem("userId"), "id":sessionStorage.getItem("userId"),"source":"manual_user", "smr_results":smr_results, "xpert_results":xpert_results, "auto":auto, "unique_code":unique_code.toLowerCase(), "received_by":received_by, "date_specimen_received":date_specimen_received, "lab_serial_number":lsn, "smr_date":date1, "xpert_date":xpertDate};
  // information = JSON.stringify(information);
  // console.log(information);

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

  document.getElementById("main_display").innerHTML = "";

  var anim = bodymovin.loadAnimation(animData);
  anim.setSpeed(3.4);

  transmission.update("lab", information, success);
};

function toggle_forms(input) {
  if(input.checked) {
    console.log("checked");
    var values = document.forms['machine_results'];
    values.not_done.checked = true;
    values.not_done_1.checked = true;
    document.getElementById('mtb_results_group').setAttribute('hidden', 'hidden');
    document.getElementById('rif_results_group').setAttribute('hidden', 'hidden');
    console.log(values.length);
  } else {
    console.log("unchecked");
    document.getElementById('mtb_results_group').removeAttribute('hidden');
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
      console.log("clicked detected");
    } else {
      document.getElementById("not_done_label").removeAttribute("hidden");
    }
    if(results[x].checked && (results[x].id == 'not_done' || results[x].id == 'not_detected' || results[x].id == 'indeterminate')) {
      document.getElementById("rif_results_group").setAttribute("hidden", "hidden");
      document.getElementById("not_done_1").checked = true;
      break;
    }
    else if(results[x].checked) {
      console.log("removing hidden result group");
      document.getElementById("rif_results_group").removeAttribute("hidden");
      console.log("REsults = " + results[x].value);
      break;
    }
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
