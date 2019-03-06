var animData = {
  wrapper: document.querySelector('#animationWindow'),
  animType: 'svg',
  loop: true,
  prerender: true,
  autoplay: true,
  path: '../js/LEGO_loader.json'
};

function extract_radio(elements) {
  var ret = "";
  for(var i=0;i<elements.length;i++) {
    if(elements[i].checked) {
      ret = elements[i].value;
      break;
    }
  }
  return ret;
}

function extract_checkbox(elements) {
  var ret = new Array;
  for(var i=0;i<elements.length;i++) {
    if(elements[i].checked) {
      ret.push(elements[i].value);
    }
  }
  return ret;
}


function translate(page) {
  console.log("translate triggered");
  switch(localStorage.getItem("lang")) {
    case "fr":
    switch(page) {
      case "information":
      for(var i in text) {
        document.getElementById(i).innerHTML = text[i];
        console.log(i);
      }
      break;

      case "new_patient":
      for(var i in text) {
        document.getElementById(i).innerHTML = text[i];
        console.log(i);
      }
      document.getElementById("label_child").innerHTML = "Enfant (CHI)";
      document.getElementById("43").innerHTML +=
      " - " + JSON.parse(localStorage.getItem("user")).phonenumber;
      document.getElementById("44").innerHTML +=
      " - " + JSON.parse(localStorage.getItem("user")).phonenumber;
      break;

      case "dashboard":
      for(var i in text) {
        document.getElementById(i).innerHTML = text[i];
        console.log(i);
      }
      document.getElementById("sync_btn").innerHTML = "Synchroniser";
      document.getElementById("working_state").innerHTML = localStorage.getItem("connection") == "online" ? "En Ligne" : "Hors Ligne";
      document.getElementById("__search").innerHTML = "<small>Rechercher</small>";
      break;

      case "specimen_collection":
      for(var i in text) {
        document.getElementById(i).innerHTML = text[i];
        console.log(i);
      }
      break;

      case "lab":
      for(var i in text) {
        document.getElementById(i).innerHTML = text[i];
        console.log(i);
      }
      break;

      case "follow_up":
      for(var i in text) {
        document.getElementById(i).innerHTML = text[i];
        console.log(i);
      }
      break;

      case "settings":
      for(var i in text) {
        document.getElementById(i).innerHTML = text[i];
        console.log(i);
      }
      break;

      case "outcome_recorded":
      for(var i in text) {
        document.getElementById(i).innerHTML = text[i];
        console.log(i);
      }
      document.getElementById("11").innerHTML += " - " + localStorage.getItem("userName");
      document.getElementById("12").innerHTML += " - " + localStorage.getItem("phonenumber");
      break;
    }
    break;

    case "en":
    switch(page) {
      case "new_patient":
      document.getElementById("43").innerHTML +=
      " - " + JSON.parse(localStorage.getItem("user")).username;
      document.getElementById("44").innerHTML +=
      " - " + JSON.parse(localStorage.getItem("user")).phonenumber;
      break;

      case "outcome_recorded":
      document.getElementById("11").innerHTML +=
      " - " + JSON.parse(localStorage.getItem("user")).username;
      document.getElementById("12").innerHTML +=
      " - " + JSON.parse(localStorage.getItem("user")).phonenumber;
      break;
    }
  }
}


var transmission = {
  default_afkanerd_id : "d3f4ul7-4fk4n3rd-1d",
  _connection : "",
  _userId : "",

  // url : "http://tbappbamenda.com:8080",
  // url : "http://localhost:8080",
  url : "http://142.93.248.15:8080",

  //TODO: figure out why this part
  set connection(connection) {
    this._connection = connection;
  },

  set userId(userId) {
    this._userId = userId;
  },

  auth : function(model, information, success, failed) {
    switch(model) {
      case "user":
        var ajax = new XMLHttpRequest;
        ajax.onreadystatechange = function() {
          if(this.readyState == 4 && this.status == 200) {
            console.log("server said: " + this.responseText);
            var serverResponse = JSON.parse(this.responseText);
            if(serverResponse.code == 200)
            success(serverResponse.data);
            else
            failed();
            // success(sr);
          }
        };
        ajax.open("POST", this.url + `/user/${transmission.default_afkanerd_id}/user/`, true);
        ajax.setRequestHeader("Content-Type", "application/json");
        ajax.send(JSON.stringify(information));
      break;
    }
  },

  insert : function(model, information, success) {
    var user_id = JSON.parse(localStorage.getItem("user")).id;

    var ajax = new XMLHttpRequest;
    ajax.onreadystatechange = function() {
      if(this.readyState == 4 && this.status == 200) {
        console.log("server said: " + this.responseText);
        var serverResponse = JSON.parse(this.responseText);
        if(serverResponse.code == 200)
        success(serverResponse.data);
        else {} //Failed here
      }
    };
    ajax.open("POST", this.url + `/user/${user_id}/patient/`, true);
    ajax.setRequestHeader("Content-Type", "application/json");
    ajax.send(JSON.stringify(information));
  },

  update : function(model, information, success, failed) {

    var ajax = new XMLHttpRequest;
    ajax.onreadystatechange = function() {
      if(this.readyState == 4 && this.status == 200) {
        console.log("server said: " + this.responseText);
        var serverResponse = JSON.parse(this.responseText);
        if(serverResponse.code == 200) {
          success();
        }
        else failed();
      }
    };

    switch(model) {
      case "patient":
        var patient_id = JSON.parse(sessionStorage.getItem("patient")).id;
        ajax.open(
          "PUT",
          this.url + `/user/${user_id}/patient/${patient_id}`,
          true
        );
      break;

      case "user":
      var user_id = JSON.parse(localStorage.getItem("user")).id;
      console.warn("Updating user", user_id);

      ajax.open(
        "PUT",
        this.url + `/user/${user_id}/user/${user_id}`,
        true
      );
      break;
    }
    ajax.setRequestHeader(
      "Content-Type",
      "application/json"
    );
    ajax.send(
      JSON.stringify(
        information
      )
    );
  },

  fetch : function(model, success, failed, path, information){
    var user_id = JSON.parse(
      localStorage.getItem("user")).id;
    var ajax = new XMLHttpRequest;
    ajax.onreadystatechange = function() {
      if(this.readyState == 4 && this.status == 200) {
        console.log("server said: " + this.responseText);
        var serverResponse = JSON.parse(this.responseText);
        if(serverResponse.code == 200) {
          success(serverResponse.data);
        }
        else if(serverResponse.code == 404) {
          failed();
        }
      }
    };

    switch(model) {
      case "patient":
      var patient_id = JSON.parse(sessionStorage.getItem("patient")).id;
      if(typeof(path) == 'undefined') {
        ajax.open("GET", this.url + `/user/${user_id}/patient/${patient_id}`, true);
      }
      else {
        ajax.open("GET", this.url + `/user/${user_id}/patient/${patient_id}/path/${path}`, true);
      }

      break;

      case "patients":
      if(typeof(information) != "undefined") {
        console.log("RUNNING PATIENT SEARCH FROM HERE", information);
        ajax.open("GET", this.url + `/user/${user_id}/patients/search/${information}`, true);
      }
      else {
        ajax.open("GET", this.url + `/user/${user_id}/patients`, true);
        console.log("Searching for patients")
      }
      break;


      case "communities":
      ajax.open("GET", this.url + `/user/${user_id}/communities`, true);
      break;

      case "regions":
      ajax.open("GET", this.url + `/user/${user_id}/regions`, true);
      break;
    }
    ajax.setRequestHeader("Content-Type", "application/json");
    ajax.send();
  },

  _fetch : function(model, id, success) {
    switch(model) {
      case "information":
        var ajax = new XMLHttpRequest;
        ajax.onreadystatechange = function() {
          if(this.readyState == 4 && this.status == 200) {
            console.log("server said: " + this.responseText);
            var sr = JSON.parse(this.responseText);
            if(sr.length !== null) { //FUCKING TEST THIS MEN
              success(sr);
            }
          }
        };
        ajax.open("GET", this.url + "?data="+ encodeURIComponent(JSON.stringify({"model":model, "id":sessionStorage.getItem("userId")})), true);
        // ajax.setRequestHeader("Content-Type", "application/json");
        ajax.send();
      break;

      case "specimen_collection":
        var ajax = new XMLHttpRequest;
        ajax.onreadystatechange = function() {
          if(this.readyState == 4 && this.status == 200) {
            console.log("server said: " + this.responseText);
            var sr = JSON.parse(this.responseText);
            if(sr.length !== null) { //FUCKING TEST THIS MEN
              success(sr);
            }
          }
        };
        ajax.open("GET", this.url + "?data="+ encodeURIComponent(JSON.stringify({"model":model, "id":sessionStorage.getItem("userId")})), true);
        // ajax.setRequestHeader("Content-Type", "application/json");
        ajax.send();
      break;

      case "lab":
        var ajax = new XMLHttpRequest;
        ajax.onreadystatechange = function() {
          if(this.readyState == 4 && this.status == 200) {
            console.log("server said: " + this.responseText);
            var sr = JSON.parse(this.responseText);
            if(sr.date_specimen_received !== null) { //FUCKING TEST THIS MEN
              success(sr);
            }
          }
        };
        ajax.open("GET", this.url + "?data="+ encodeURIComponent(JSON.stringify({"model":model, "id":sessionStorage.getItem("userId")})), true);
        // ajax.setRequestHeader("Content-Type", "application/json");
        ajax.send();
      break;


      case "follow_up":
        var ajax = new XMLHttpRequest;
        ajax.onreadystatechange = function() {
          if(this.readyState == 4 && this.status == 200) {
            console.log("server said: " + this.responseText);
            var sr = JSON.parse(this.responseText);
            if(sr.length !== null) { //FUCKING TEST THIS MEN
              success(sr);
            }
          }
        };
        ajax.open("GET", this.url + "?data="+ encodeURIComponent(JSON.stringify({"model":model, "id":sessionStorage.getItem("userId")})), true);
        // ajax.setRequestHeader("Content-Type", "application/json");
        ajax.send();
      break;

      case "outcome_recorded":
        var ajax = new XMLHttpRequest;
        ajax.onreadystatechange = function() {
          if(this.readyState == 4 && this.status == 200) {
            console.log("server said: " + this.responseText);
            var sr = JSON.parse(this.responseText);
            if(sr.length !== null) { //FUCKING TEST THIS MEN
              success(sr);
            }
          }
        };
        ajax.open("GET", this.url + "?data="+ encodeURIComponent(JSON.stringify({"model":model, "id":sessionStorage.getItem("userId")})), true);
        // ajax.setRequestHeader("Content-Type", "application/json");
        ajax.send();
      break;

      case "sub_regions":
        var ajax = new XMLHttpRequest;
        ajax.onreadystatechange = function() {
          if(this.readyState == 4 && this.status == 200) {
            console.log("server said: " + this.responseText);
            var sr = JSON.parse(this.responseText);
            if(sr.length !== null) { //FUCKING TEST THIS MEN
              success(sr);
            }
          }
        };
        ajax.open("GET", this.url + "?data="+ encodeURIComponent(JSON.stringify({"model":model, "id":id})), true);
        // ajax.setRequestHeader("Content-Type", "application/json");
        ajax.send();
      break;
    }
  },

  _search : function(model, information, success, failure) {
    var ajax = new XMLHttpRequest;
    ajax.onreadystatechange = function() {
      if(this.readyState == 4 && this.status == 200) {
        console.log("server said: " + this.responseText);
        var sr = JSON.parse(this.responseText);
        if(sr.length > 0) {
          success(sr);
        } else {
          failure();
        }
      }
    };
    ajax.open("GET", this.url + "?data="+ encodeURIComponent(JSON.stringify({"model":"information", "type":"search", "query":information})), true);
    // ajax.setRequestHeader("Content-Type", "application/json");
    ajax.send();
  }
};

function updateConnectionStatus(state) {
  // alert("Connection type changed from " + type + " to " + connection.type);
  switch(state) {
    case true:
    $("#connectionModal").modal('hide');
    // console.log("Connection changed to online")
    localStorage.setItem("connection", "online");
    document.getElementById("working_state").innerHTML = localStorage.getItem("lang") == "en" ? "Online" : "En Ligne";
    break;

    case false:
    network_state_modal();
    localStorage.setItem("connection", "offline");
    document.getElementById("working_state").innerHTML = localStorage.getItem("lang") == "en" ? "Offline" : "Hors ligne";
    break;
  }
}

window.addEventListener('offline', ()=> { updateConnectionStatus(false) });
window.addEventListener('online', ()=> { updateConnectionStatus(true) });


function network_state_modal() {
  var button = document.createElement("button");
  button.setAttribute("type", "button");
  button.setAttribute("class", "btn btn-primary");
  button.setAttribute("data-toggle", "modal");
  button.setAttribute("data-target", "#exampleModal");
  button.appendChild(document.createTextNode("Launch demo modal"));

  var h5 = document.createElement("h5");
  h5.setAttribute("class", "modal-title");
  h5.setAttribute("id", "exampleModalLabel");
  var text1 = localStorage.getItem("lang") == "en" ? "Network Connection Alert" : "Alerte de connexion réseau";
  h5.appendChild(document.createTextNode(text1));

  var span = document.createElement("span");
  span.setAttribute("aria-hidden", "true");
  span.appendChild(document.createTextNode("×"));

  var button_ = document.createElement("button");
  button_.setAttribute("type", "button");
  button_.setAttribute("class", "close");
  button_.setAttribute("data-dismiss", "modal");
  button_.setAttribute("aria-label", "Close");
  button_.appendChild(span);

  var div = document.createElement("div");
  div.setAttribute("class", "modal-header");
  div.appendChild(h5);
  div.appendChild(button_);

  var div_ = document.createElement("div");
  div_.setAttribute("class", "modal-body");
  var text = localStorage.getItem("lang") == "en" ? "You are currently offline!! Please verify your internet connection before going ahead" : "Vous êtes actuellement hors ligne! Veuillez vérifier votre connexion Internet avant de continuer";
  div_.appendChild(document.createTextNode(text));

  var button__ = document.createElement("button");
  button__.setAttribute("type", "button");
  button__.setAttribute("class", "btn btn-secondary");
  button__.setAttribute("data-dismiss", "modal");
  button__.appendChild(document.createTextNode("Close"));

  var button___ = document.createElement("button");
  button___.setAttribute("type", "button");
  button___.setAttribute("class", "btn btn-primary");
  button___.appendChild(document.createTextNode("Save changes"));

  var div__ = document.createElement("div");
  div__.setAttribute("class", "modal-footer");
  div__.appendChild(button__);
  // div__.appendChild(button___);

  var div___ = document.createElement("div");
  div___.setAttribute("class", "modal-content");
  div___.appendChild(div);
  div___.appendChild(div_);
  div___.appendChild(div__);

  var div____ = document.createElement("div");
  div____.setAttribute("class", "modal-dialog modal-dialog-centered");
  div____.setAttribute("role", "document");
  div____.appendChild(div___);

  var div_____ = document.createElement("div");
  div_____.setAttribute("class", "modal fade");
  div_____.setAttribute("id", "connectionModal");
  div_____.setAttribute("tabindex", "-1");
  div_____.setAttribute("role", "dialog");
  div_____.setAttribute("aria-labelledby", "exampleModalLabel");
  div_____.setAttribute("aria-hidden", "true");
  div_____.appendChild(div____);

  document.getElementById("main_display").appendChild(div_____);
  $(div_____).modal('show')
}

function patientNavigation(lang) {
  getText = function(key, lang) {
    // console.log("lang: " + lang);
    var fr = {"collect_specimen" : "Collecte de l’échantillon", "lab" : "Laboratoire", "follow_up" : "Mesures de suivi", "outcome_recorded" : "Enregistrement des résultats", "Available actions..." : "Actions disponibles...", "information":"Information"};
    var en = {"collect_specimen" : "Collect Specimens", "lab" : "Labs", "follow_up" : "Follow Up", "outcome_recorded" : "Outcome Recorded", "Available actions...":key, "information": "Information"};
    switch(lang) {
      case "fr":
      return fr[key];
      break;

      case "en":
      return en[key];
      break;
    }
  };

  // sessionStorage.setItem("userId", this.id);
  // sessionStorage.setItem("userName", this.name);
  var div = document.createElement("div");
  div.setAttribute("tabIndex", "-1");
  div.setAttribute("role", "dialog");
  div.setAttribute("aria-labelledby", "exampleModalLabel");
  div.setAttribute("aria-hidden", "true");
  div.id = "exampleModal";
  div.className = "modal fade";
  var modal = div;

  div = document.createElement("div");
  div.setAttribute("role","document");
  // div.className = "modal-dialog modal-dialog-centered"; center the modal
  div.className = "modal-dialog";
  var modalDialog = div;
  modal.appendChild(modalDialog);

  div = document.createElement("div");
  div.className = "modal-content";
  var modalContent = div;
  modalDialog.appendChild(modalContent);

  div = document.createElement("div");
  div.className = "modal-header";
  var modalHeader = div;
  div = document.createElement("h5");
  div.appendChild(document.createTextNode(this.getText("Available actions...", lang)));
  var h5 = div;
  modalHeader.appendChild(h5);
  div = document.createElement("button");
  div.setAttribute("data-dismiss", "modal");
  div.setAttribute("aria-label", "Close");
  div.className="close";
  var button = div;
  div = document.createElement("span");
  div.setAttribute("aria-hidden", "true");
  div.innerHTML = "&times;";
  button.appendChild(div);
  modalHeader.appendChild(button)
  modalContent.appendChild(modalHeader);

  div = document.createElement("div");
  div.className = "modal-body";
  var modalBody = div;

  div = document.createElement("div");
  div.className = "row";
  var row = div;

  //information
  div = document.createElement("div");
  div.className = "col-12 text-center";
  div.id = "specimen_collection";
  var col = div;
  row.appendChild(col);

  div = document.createElement("figure");
  div.setAttribute("data-dismiss", "modal");
  div.className="figure";
  div.onclick = function() {
    window.location.replace('information.html')
    sessionStorage.setItem("pathway", "information");

  };
  var figure = div;
  col.appendChild(figure);

  div = document.createElement("img");
  div.src="../img/icons/information.png";
  div.setAttribute("style", "height: 90px; width: 90px");
  div.className= sessionStorage.getItem("pathway") == "information" ? "figure-img img-fluid rounded-circle border border-primary" : "figure-img img-fluid rounded-circle border border-black";
  var figImg = div;
  figure.appendChild(figImg);

  div = document.createElement("figcaption");
  div.className = "figure-caption";
  div.appendChild(document.createTextNode(this.getText("information", lang)));
  var figcaption = div;
  figure.appendChild(figcaption);

  //specimen collection
  div = document.createElement("div");
  div.className = "col text-center";
  div.id = "specimen_collection";
  var col = div;
  row.appendChild(col);

  div = document.createElement("figure");
  div.setAttribute("data-dismiss", "modal");
  div.className="figure";
  div.onclick = function() {
    window.location.replace('specimen_collection.html')
    sessionStorage.setItem("pathway", "collect_specimen");

  };
  var figure = div;
  col.appendChild(figure);

  div = document.createElement("img");
  div.src="../img/icons/specimen.png";
  div.setAttribute("style", "height: 90px; width: 90px");
  div.className= sessionStorage.getItem("pathway") == "collect_specimen" ? "figure-img img-fluid rounded-circle border border-info" : "figure-img img-fluid rounded-circle border border-black";
  var figImg = div;
  figure.appendChild(figImg);

  div = document.createElement("figcaption");
  div.className = "figure-caption";
  div.appendChild(document.createTextNode(this.getText("collect_specimen", lang)));
  var figcaption = div;
  figure.appendChild(figcaption);

  //labs
  div = document.createElement("div");
  div.className = "col text-center";
  div.id = "specimen_collection";
  var col = div;
  row.appendChild(col);

  div = document.createElement("figure");
  div.setAttribute("data-dismiss", "modal");
  div.className="figure";
  div.onclick = function() {
    window.location.replace('lab.html')
    sessionStorage.setItem("pathway", "lab");
  };

  var figure = div;
  col.appendChild(figure);

  div = document.createElement("img");
  div.src="../img/icons/lab.png";
  div.setAttribute("style", "height: 90px; width: 90px");
  div.className= sessionStorage.getItem("pathway") == "lab" ? "figure-img img-fluid rounded-circle border border-info" : "figure-img img-fluid rounded-circle border border-black";
  var figImg = div;
  figure.appendChild(figImg);

  div = document.createElement("figcaption");
  div.className = "figure-caption";
  div.appendChild(document.createTextNode(this.getText("lab", lang)));
  var figcaption = div;
  figure.appendChild(figcaption);

  //follow up
  div = document.createElement("div");
  div.className = "row";
  var row1 = div;
  div = document.createElement("div");
  div.className = "col text-center";
  div.id = "specimen_collection";
  var col = div;
  row1.appendChild(col);

  div = document.createElement("figure");
  div.setAttribute("data-dismiss", "modal");
  div.className="figure";
  div.onclick = function() {
    sessionStorage.setItem("pathway", "follow_up");
    window.location.replace('follow-up.html')
  };
  var figure = div;
  col.appendChild(figure);

  div = document.createElement("img");
  div.src="../img/icons/follow-up.png";
  div.setAttribute("style", "height: 90px; width: 90px");
  div.className= sessionStorage.getItem("pathway") == "follow_up" ? "figure-img img-fluid rounded-circle border border-info" : "figure-img img-fluid rounded-circle border border-black";
  var figImg = div;
  figure.appendChild(figImg);

  div = document.createElement("figcaption");
  div.className = "figure-caption";
  div.appendChild(document.createTextNode(this.getText("follow_up", lang)));
  var figcaption = div;
  figure.appendChild(figcaption);

  //outcome recorded
  div = document.createElement("div");
  div.className = "col text-center";
  div.id = "specimen_collection";
  var col = div;
  row1.appendChild(col);

  div = document.createElement("figure");
  div.setAttribute("data-dismiss", "modal");
  div.className="figure";
  div.onclick = function() {
    window.location.replace('outcome.html')
    sessionStorage.setItem("pathway", "outcome_recorded");
  };

  var figure = div;
  col.appendChild(figure);

  div = document.createElement("img");
  div.src="../img/icons/outcome.png";
  div.setAttribute("style", "height: 90px; width: 90px");
  div.className= sessionStorage.getItem("pathway") == "outcome_recorded" ? "figure-img img-fluid rounded-circle border border-primary" : "figure-img img-fluid rounded-circle border border-black";
  var figImg = div;
  figure.appendChild(figImg);

  div = document.createElement("figcaption");
  div.className = "figure-caption";
  div.appendChild(document.createTextNode(this.getText("outcome_recorded", lang)));
  var figcaption = div;
  figure.appendChild(figcaption);


  modalBody.appendChild(row);
  modalBody.appendChild(row1);
  modalContent.appendChild(modalBody);

  //DEFAULT BTNS THAT COME WITH BOOTSTRAP
  // div = document.createElement("div");
  // div.className = "modal-footer";
  // var modalFooter = div;
  // div = document.createElement("button");
  // div.setAttribute("data-dismiss", "modal");
  // div.className = "btn btn-secondary";
  // div.appendChild(document.createTextNode("close"));
  // var closeBtn = div;
  // modalFooter.appendChild(closeBtn);
  // div = document.createElement("button");
  // div.className = "btn btn-primary";
  // div.appendChild(document.createTextNode("Save Changes"));
  // var saveBtn = div;
  // modalFooter.appendChild(saveBtn);
  // modalContent.appendChild(modalFooter);

  $(modal).modal("show");
};
