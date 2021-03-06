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
    sr = sr[0];
    if(typeof(sr) != "undefined") {
      console.log("controller - fetching lab - SUCCESSFUL");
      sessionStorage.setItem("lab_fetch", "fetched");
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
        if(typeof sr.mtb_grade != 'undefined' && sr.mtb_grade != null) {
          for(var i=0;i<_form_xpert.elements.grade.length; ++i) {
            if(_form_xpert.elements.grade[i].value == sr.mtb_grade) {
              _form_xpert.elements.grade[i].click();
              break;
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

  var information = {
    type : "get",
    uri : `/patients/${JSON.parse(sessionStorage.getItem("patient")).id}/lab`,
    on_success : success,
    on_failed : failed
  }
  transmission_new(information)

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

  var data = {
    "user_id" : JSON.parse(localStorage.getItem("user")).id,
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
    "automatic" : automatic
  };

  var information = [];
  var result_type;
  if(
    (data.smr_result_1 == "not_done" && data.smr_result_2 == "not_done")
    &&
    (data.mtb_result == "not_done" && data.rif_result == "not_done")
  ) result_type = "invalid";
  else if(
    (data.smr_result_1 == "no_afb_seen" || data.smr_result_1 == "not_done")
    &&
    (data.smr_result_2 == "no_afb_seen" || data.smr_result_2 == "not_done")
    &&
    (data.mtb_result != "detected" && data.mtb_result != "trace")
    &&
    (data.rif_result != "detected" && data.rif_result != "indeterminate")
  ) result_type = "negative_results";
  else result_type = "positive_results";

  sessionStorage.setItem("result_type", result_type);
  sessionStorage.setItem("data", JSON.stringify(data));

  var success = function() {
    var data = JSON.parse(sessionStorage.getItem("data"));

    var success = function(users) {
      var success = function(community) {
        community = community[0];
        console.log("Sending users sms success");
        var information = [];

        var result_smr = "";
        var result_xpert = "";
        var date_specimen_received = data.xpert_date;

        if(data.smr_result_1 != "no_afb_seen" && data.smr_result_1 != "not_done") {
          console.log("smr");
          result_smr = "AFB, " + data.smr_result_1;
          date_specimen_received = data.smr_date;
        }
        else if(data.smr_result_2 != "no_afb_seen" && data.smr_result_2 != "not_done") {
          console.log("no_afb_seen");
          result_smr = "AFB, " + data.smr_result_2;
          date_specimen_received = data.smr_date;
        }
        else if(data.smr_result_1 == "not_done" || data.smr_result_2 == "not_done") {
          console.log("not_done");
          // result_smr = data.smr_result_1 == "no_afb_seen" ? "AFB, not done";
          if(data.smr_result_1 == "no_afb_seen") {
            result_smr = "No AFB seen"
          }
          else if(data.smr_result_2 == "no_afb_seen") {
            result_smr = "No AFB seen"
          }
        }
        else {
          console.log("no_afb_seen");
          result_smr = localStorage.getItem("lang") == "en" ? "No AFB seen" : "Aucun BAAR Vu"
          date_specimen_received = data.smr_date;
        }
        console.log("SMR result: ", result_smr);
        if(data.mtb_result == "detected") {
          console.log("detected");
          var mtb_grade_fr = {
            "high" : "Haute",
            "medium" : "Moyen",
            "low" : "Bas",
            "very_low" : "Très bas"
          };
          var rif_result = data.rif_result == "not_detected" ? localStorage.getItem("lang") == "en" ? "NOT DETECTED" : "Non Détecté" : localStorage.getItem("lang") == "en" ? data.rif_result : "Détecté"
          result_xpert = `Xpert, MTB ${localStorage.getItem("lang") == "en" ? 'DETECTED' : 'Détecté'} (${localStorage.getItem("lang") == "en" ? data.mtb_grade == "very_low" ? "VERY LOW" : data.mtb_grade.toUpperCase() : mtb_grade_fr[data.mtb_grade] }) RIF resistance ${rif_result=="detected" ? rif_result.toUpperCase() : rif_result}`
        }
        else if(data.mtb_result == "trace") {
          console.log("trace");
          result_xpert = "Xpert, MTB Trace";
        }
        else if(data.mtb_result == "not_detected") result_xpert = "Xpert, MTB not detected";
        else result_xpert = "Xpert, not done";

        var result_type = sessionStorage.getItem("result_type");

        for(var i in users) {
          // console.log(users[i])
          if(users[i].notifications.includes(result_type) || users[i].notifications.includes("all") && result_type != "invalid") {
            var userObject = {
              "number" : users[i].phonenumber,
              "service_provider" : users[i].service_provider,
              "community_id" : community.id,
              "message" :
              `${users[i].name}\n${date_specimen_received}\n${JSON.parse(sessionStorage.getItem("patient")).id}\n${JSON.parse(sessionStorage.getItem("patient")).name.toUpperCase()}\n${community.region_name}, ${community.shortcode == null ? community.name : community.shortcode}\n${result_smr}\n${data.lab_serial_number}\n${result_xpert}\n${data.unique_code}\n\nPlease call 670656041 if you have any questions/Svp appelez 670656041 si vous avez des questions`
            }
            console.log(userObject.message);
            information.push(userObject);
          }
        }
        console.log(information);
        var ajax = new XMLHttpRequest;
        // var url = "http://localhost:8080";
        var url = "http://tbappbamenda.com:8080";
        ajax.onreadystatechange = function() {
          if(this.readyState == 4 && this.status == 200) {
            console.log("SMS sent");
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
          }
        };
        ajax.open("POST", `${url}/sms/`, true);
        ajax.setRequestHeader("Content-Type", "application/json");
        ajax.send(JSON.stringify(information)); //TODO: remove this comment
      }
      var information = {
        type : "get",
        uri : `/community?Community.id='${JSON.parse(localStorage.getItem("user")).community_id}'&Regions.id=Community.region_id`,
        on_success : success,
        on_failed : failed
      }
      transmission_new(information);
    }
    var failed = function() {}

    var patient = JSON.parse(sessionStorage.getItem("patient"))

    var information = {
      type : "get",
      uri : `/users?community_id='${JSON.parse(localStorage.getItem("user")).community_id}','${patient.community_id}'&like=service_provider:`,
      on_success : success,
      on_failed : failed
    }
    transmission_new(information);
  };

  var failed = function() {}

  document.getElementById("main_display").innerHTML = "";

  var anim = bodymovin.loadAnimation(animData);
  anim.setSpeed(3.4);

  var information = {
    uri : `/patients/${patient_id}/lab`,
    body : data,
    on_success : success,
    on_failed : failed
  }

  information['type'] = sessionStorage.getItem("lab_fetch") != "fetched" || sessionStorage.getItem("lab_fetch") == null ? "post" : "put";


  if(result_type == "positive_results") {
    $('#specimen_lab_results').modal({},'show');
  }
  else {
    transmission_new(information);
  }

  document.getElementById("43").onclick = function() {
    console.log("Yes, can transmit now");
    console.log(information);
    transmission_new(information);
  }
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
      document.getElementById("detected_1").removeAttribute("disabled");
      document.getElementById("not_done_1").removeAttribute("disabled");
      document.getElementById("not_detected_1").checked = true;

      document.getElementById("not_detected_1").removeAttribute("disabled");
      console.log("clicked DETECTED");
      document.getElementById("high").checked = true;

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

    if(results[x].checked && (results[x].id == 'not_done' || results[x].id == 'not_detected' || results[x].id == 'error_invalid')) {
      document.getElementById("rif_results_group").setAttribute("hidden", "hidden");
      document.getElementById("mtb_grades").setAttribute("hidden", "hidden");
      document.getElementById("not_done_1").checked = true;
      document.getElementById("high").checked = true;
      document.getElementById("high").checked = false;
      break;
    }
  }
}
