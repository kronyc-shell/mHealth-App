function SpecimenHistory(lang) {
  this.language;

  this.view = document.getElementById("contents");
  this.view1 = document.getElementById("no_specimen");

  this.default = function() {
    this.view.setAttribute("hidden", "hidden"); //REMOVE THIS AND MAKE IT HIDDEN BY DEFAULT
    this.view.innerHTML = "";
    this.language = lang;
  };

  this.addSpecimen = function(SpecimenCard) {
    this.view1.setAttribute("hidden", "hidden");
    this.view.removeAttribute("hidden");
    this.view.insertBefore(SpecimenCard.view(this.language), this.view.childNodes[0]);
    this.view.insertBefore(document.createElement("br"), this.view.childNodes[1]);
  }
}

function SpecimenCard() {
  this.duration;
  this.aspect;
  this.period;

  this.view = function(lang) {
    console.log("Duration: " + this.duration);
    var div = document.createElement("div");
    div.id = this.id;
    div.name = this.name;
    div.className = "card";
    var getText = function(text, lang) {
      switch(lang) {
        case "fr":
          var t = "";
          if(text.search("today") != -1) {
            t = text.replace("today", "aujourd'hui");
          } else if(text.search("days ago") != -1) {
            t = text.replace("days ago", "journées");
          } else if(text.search("yesterday") != -1) {
            t = text.replace("yesterday", "hier");
          } else if(text.search("Bloody") != -1) {
            t = text.replace("Bloody", "Sanguinolant");
          } else if(text.search("Salivary") != -1) {
            t = text.replace("Salivary", "Salivaire");
          } else if(text.search("Morning") != -1) {
            t = text.replace("Morning", "Matin");
          } else if(text.search("Spot") != -1) {
            t = text.replace("Spot", "Spot");
          } else if(text.search("Mucopurulent") != -1) {
            t = text.replace("Mucopurulent", "Mucopurulent");
          }
          return t;
        break;

        case "en":
          return text;
        break;
      }
    };
    div.onclick = function() {};  //Idea, can tell you who collected the specimen
    var card = div;

    div = document.createElement("div");
    div.className = "card-body text-center";
    div.appendChild(document.createTextNode(getText(this.duration, lang) + " | " + getText(this.period, lang) + " | " + getText(this.aspect, lang)));
    div.appendChild(document.createElement("br"));
    var cardBody = div;

    card.appendChild(cardBody);
    return card;
  }
}


console.log("in script.................");
//MORE SPECIMEN BTN
var globalNavigate = "";
document.getElementById("5").onclick = function() {
  globalNavigate = "no";
  console.log("clicked reload...");
  document.forms['specimen_form'].onsubmit();
};

// DONE BTN
document.getElementById("6").onclick = function() {
  globalNavigate = "yes";
  console.log("clicked navigate....");
  document.forms['specimen_form'].onsubmit();
};

document.forms['specimen_form'].onsubmit = function() {
  console.log("controller - specimen collection");
  document.getElementById("main_display").remove();

  var anim = bodymovin.loadAnimation(animData);
  anim.setSpeed(3.4);

  var success1 = function(sr) {
    // console.log("Success nav: " + navigate);
    var msg = "";
    switch(localStorage.getItem("lang")) {
      case "fr":
      msg = "<div class='jumbotron text-center' style='background-color:#09d033; color: white; font-weight: 100'><h5>Bien joué!</h5></div>";
      break;

      case "en":
      msg = "<div class='jumbotron text-center' style='background-color:#09d033; color: white; font-weight: 100'><h5>Well Done!</h5></div>";
      break;

      default:
      msg = "<div class='jumbotron text-center' style='background-color:#09d033; color: white; font-weight: 100'><h5>Bien joué!</h5></div>";
      break;
    }
    // alert("msg: " + msg + "\nNavigate: " + navigate + "\nGlobal: " + globalNavigate);
    if(globalNavigate == "yes") {
      // alert("moving to index... path = " + window.location.href);
        document.getElementById("animationWindow").remove();
      // try {
      //   document.getElementById("animationWindow").remove();
      // }
      // catch(error) {
      //   alert("\n\nerror coming from above: " + error);
      // }
      // return false;
      setTimeout(function(){
        console.log("in timer and going to navigate soon");
        window.location.replace("index.html");
      }, 2000);
      // alert("by passed timer and came here");
      window.location.replace("index.html");
      return false;

    } else if(globalNavigate == "no"){
      // alert("windows is going to reload");
      window.location.reload(1);
    }
  };


  var date = this.date.value;
  var period = extract_radio(this.elements.period);
  var aspect = extract_radio(this.elements.aspect);
  console.log("userId: " + sessionStorage.getItem("userId"));
  var information = {"id":sessionStorage.getItem("userId"), "userId":localStorage.getItem("userId"), "date":date, "period":period, "aspect":aspect};
  // information = JSON.stringify(information);
  console.log(information);

  transmission.update("specimen_collection", information, success1);
  return false;
};
