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

  // url : "http://142.93.248.15/tbproject_v2/app/",
  url : "http://localhost/tbproject_v2/app/",

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
