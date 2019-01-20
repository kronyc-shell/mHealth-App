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
      case "new_patient":
      for(var i in text) {
        document.getElementById(i).innerHTML = text[i];
        console.log(i);
      }
      document.getElementById("label_child").innerHTML = "Enfant (CHI)";
      document.getElementById("43").innerHTML += " - " + localStorage.getItem("userName");
      document.getElementById("44").innerHTML += " - " + localStorage.getItem("phonenumber");
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
      document.getElementById("43").innerHTML += " - " + localStorage.getItem("userName");
      document.getElementById("44").innerHTML += " - " + localStorage.getItem("phonenumber");
      break;

      case "outcome_recorded":
      document.getElementById("11").innerHTML += " - " + localStorage.getItem("userName");
      document.getElementById("12").innerHTML += " - " + localStorage.getItem("phonenumber");
      break;
    }
  }
}


var transmission = {
  _connection : "",
  _userId : "",

  url : "http://142.93.248.15/tbproject_v2/app/",
  // url : "http://localhost/tbproject_v2/app/",

  set connection(connection) {
    this._connection = connection;
  },

  set userId(userId) {
    this._userId = userId;
  },

  auth : function(model, information, success) {
    switch(model) {
      case "user":
        var ajax = new XMLHttpRequest;
        ajax.onreadystatechange = function() {
          if(this.readyState == 4 && this.status == 200) {
            console.log("server said: " + this.responseText);
            var sr = JSON.parse(this.responseText);
            success(sr);
          }
        };
        ajax.open("POST", this.url, true);
        ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        ajax.send("data=" + encodeURIComponent(JSON.stringify({"model":"auth","information":{information}})));
      break;
    }
  },

  insert : function(model, information, success) {
    switch(model) {
      case "information":
      var ajax = new XMLHttpRequest;
      ajax.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200) {
          console.log("server said: " + this.responseText);
          var sr = JSON.parse(this.responseText);
          success(sr);
        }
      };
      ajax.open("POST", this.url, true);
      ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      ajax.send("data=" + encodeURIComponent(JSON.stringify({"model":"information","information":{information}})));
      break;
    }
  },

  update : function(model, information, success) {
    switch(model) {
      case "specimen_collection":
      var ajax = new XMLHttpRequest;
      ajax.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200) {
          // console.log("server said: " + this.responseText);
          var sr = JSON.stringify(this.responseText);
          success(sr);
        } else {
          console.log(this.readyState, " | ", this.status);
        }
      };
      ajax.open("POST", this.url, true);
      ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      ajax.send("data=" + encodeURIComponent(JSON.stringify({"model":model,"information":{information}})));
      break;

      case "lab":
      var ajax = new XMLHttpRequest;
      ajax.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200) {
          console.log("server said: " + this.responseText);
          var sr = JSON.parse(this.responseText);
          success(sr);
        }
      };
      ajax.open("POST", this.url, true);
      ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      ajax.send("data=" + encodeURIComponent(JSON.stringify({"model":model,"information":{information}})));
      break;

      case "follow_up":
      var ajax = new XMLHttpRequest;
      ajax.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200) {
          console.log("server said: " + this.responseText);
          var sr = JSON.parse(this.responseText);
          success(sr);
        }
      };
      ajax.open("POST", this.url, true);
      ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      ajax.send("data=" + encodeURIComponent(JSON.stringify({"model":model,"information":{information}})));
      break;

      case "outcome_recorded":
      var ajax = new XMLHttpRequest;
      ajax.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200) {
          console.log("server said: " + this.responseText);
          var sr = JSON.parse(this.responseText);
          success(sr);
        }
      };
      ajax.open("POST", this.url, true);
      ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      ajax.send("data=" + encodeURIComponent(JSON.stringify({"model":model,"information":{information}})));
      break;
    }
  },

  fetch : function(model, success, failed){
    switch(model) {
      case "patients":
      var ajax = new XMLHttpRequest;
      ajax.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200) {
          console.log("server said: " + this.responseText);
          var sr = JSON.parse(this.responseText);
          if(sr.length !== null) { //FUCKING TEST THIS MEN
            success(sr);
          } else {
            failed();
          }
        }
      };
      ajax.open("GET", this.url + "?data="+ encodeURIComponent(JSON.stringify({"model":"information", "type":"dashboard", "id":localStorage.getItem("userId"), "access":localStorage.getItem("userAccess")})), true);
      // ajax.setRequestHeader("Content-Type", "application/json");
      ajax.send();
      break;


      case "communities":
      var ajax = new XMLHttpRequest;
      ajax.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200) {
          console.log("server said: " + this.responseText);
          var sr = JSON.parse(this.responseText);
          if(sr.length !== null) { //FUCKING TEST THIS MEN
            success(sr);
          } else {
            failed();
          }
        }
      };
      ajax.open("GET", this.url + "?data="+ encodeURIComponent(JSON.stringify({"model":"communities"})), true);
      // ajax.setRequestHeader("Content-Type", "application/json");
      ajax.send();
      break;
    }
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
