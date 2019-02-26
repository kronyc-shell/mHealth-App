function PatientCard() {
  // this._header;
  // this.name;
  // this.gender;
  // this.duration;
  // this.phonenumber;
  // this.age;
  // this.id;
  this.patient;

  this.translate = function(text, lang) {
    if(text === null) return;
    var fr = {"Yesterday":"Hier", "Today":"Aujourd'hui", "Years":"Ans", "Days":"il y a _ jours", "male":"Mâle", "Female":"Femelle"};
    switch(lang) {
      case "fr":
        if(text.search("Days") != -1) return fr["Days"].replace("_", text.substring(0, text.search(' ')));
        else return fr[text];
      break;

      default:
      return text;
      break;
    }

  }

  this.view = function(lang, isButton) {
    var div = document.createElement("div");
    div.patient = this.patient;
    div.className = "card card-patient";
    div.getText = function(key, lang) {
      // console.log("lang: " + lang);
      var fr = {"collect_specimen" : "Collecte de l’échantillon", "lab" : "Laboratoire", "follow_up" : "Mesures de suivi", "outcome_recorded" : "Enregistrement des résultats", "Available actions..." : "Actions disponibles...", "Information":"Information"};
      var en = {"collect_specimen" : "Collect Specimens", "lab" : "Labs", "follow_up" : "Follow Up", "outcome_recorded" : "Outcome Recorded", "Available actions...":key, "Information": "Information"};
      switch(lang) {
        case "fr":
        return fr[key];
        break;

        case "en":
        return en[key];
        break;
      }
    };
    div.setAttribute("data-toggle", "modal");
    div.setAttribute("data-target", "exampleModal");
    div.onclick = function() {
      sessionStorage.setItem("pathway", null);
      sessionStorage.setItem("patient", JSON.stringify(this.patient));
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
      div.id = "information";
      var col = div;
      row.appendChild(col);

      div = document.createElement("figure");
      div.setAttribute("data-dismiss", "modal");
      div.className="figure";
      div.onclick = function() {
        window.location.href='information.html'
        sessionStorage.setItem("pathway", "information");
      };
      var figure = div;
      col.appendChild(figure);

      div = document.createElement("img");
      div.src="../img/icons/information.png";
      div.setAttribute("style", "height: 90px; width: 90px");
      div.className="figure-img img-fluid rounded";
      var figImg = div;
      figure.appendChild(figImg);

      div = document.createElement("figcaption");
      div.className = "figure-caption";
      div.appendChild(document.createTextNode(this.getText("Information", lang)));
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
        window.location.href='specimen_collection.html'
        sessionStorage.setItem("pathway", "collect_specimen");
      };
      var figure = div;
      col.appendChild(figure);

      div = document.createElement("img");
      div.src="../img/icons/specimen.png";
      div.setAttribute("style", "height: 90px; width: 90px");
      div.className="figure-img img-fluid rounded";
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
      div.id = "lab";
      var col = div;
      row.appendChild(col);

      div = document.createElement("figure");
      div.setAttribute("data-dismiss", "modal");
      div.className="figure";
      div.onclick = function() {
        window.location.href='lab.html'
        sessionStorage.setItem("pathway", "lab");

      };

      var figure = div;
      col.appendChild(figure);

      div = document.createElement("img");
      div.src="../img/icons/lab.png";
      div.setAttribute("style", "height: 90px; width: 90px");
      div.className="figure-img img-fluid rounded";
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
      div.id = "follow_up";
      var col = div;
      row1.appendChild(col);

      div = document.createElement("figure");
      div.setAttribute("data-dismiss", "modal");
      div.className="figure";
      div.onclick = function() {
        window.location.href='follow-up.html'
        sessionStorage.setItem("pathway", "follow_up");

      };
      var figure = div;
      col.appendChild(figure);

      div = document.createElement("img");
      div.src="../img/icons/follow-up.png";
      div.setAttribute("style", "height: 90px; width: 90px");
      div.className="figure-img img-fluid rounded";
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
      div.id = "outcome_recorded";
      var col = div;
      row1.appendChild(col);

      div = document.createElement("figure");
      div.setAttribute("data-dismiss", "modal");
      div.className="figure";
      div.onclick = function() {
        window.location.href='outcome.html'
        sessionStorage.setItem("pathway", "outcome_recorded");
      };

      var figure = div;
      col.appendChild(figure);

      div = document.createElement("img");
      div.src="../img/icons/outcome.png";
      div.setAttribute("style", "height: 90px; width: 90px");
      div.className="figure-img img-fluid rounded";
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
    if(isButton == true) {
      var button = document.createElement("button");
      button.onclick = function() {
        div.click();
      }
      return button;
    }
    var card = div;

    div = document.createElement("div");
    div.className = "card-body text-center";
    div.appendChild(document.createTextNode(this.patient.name));
    div.appendChild(document.createElement("br"));
    div.appendChild(
      document.createTextNode(
        this.translate(this.patient.gender, lang)
        + " | "
        + this.patient.id
      )
    );
    div.appendChild(document.createElement("br"));
    div.appendChild(
      document.createTextNode(
        this.translate(getTimeDuration(new Date(this.patient.date)), lang)
        + " | "
        + this.patient.telephone1
        + " | "
        + this.patient.age
        + " "
        + this.translate("Years", lang)
      )
    );
    var cardBody = div;

    card.appendChild(cardBody);
    return card;
  }
}

function Dashboard(lang) {

  this.language;

  this.view = document.getElementById("patientDisplay");
  this.view1 = document.getElementById("noRecords");

  this.default = function() {
    // this.view.setAttribute("hidden", "hidden"); //REMOVE THIS AND MAKE IT HIDDEN BY DEFAULT
    this.view.innerHTML = "";
    this.language = lang;
  }

  this.addPatient = function(PatientCard) {
    this.view1.setAttribute("hidden", "hidden");
    this.view.removeAttribute("hidden");
    this.view.insertBefore(PatientCard.view(this.language), this.view.childNodes[0]);
    this.view.insertBefore(document.createElement("br"), this.view.childNodes[1]);
  }

  this.log = function(msg, link) {
    this.view1.setAttribute("hidden", "hidden");
    this.view.removeAttribute("hidden");
    console.log(this.view.hasAttribute("hidden"));

    var div = document.createElement("h5");
    div.className = "card-title text-center";
    div.appendChild(document.createTextNode(msg));
    if(link !== null) div.innerHTML += link;
    this.view.appendChild(div);
  }
}

//EVENT HANDLER FOR INTERNET CONNECTION
function change_working_state(state) {
  var working_state = document.getElementById("working_state");
  switch(state) {
    case "online":
    working_state.innerHTML = "Online";
    break;

    // case "offline":
    // working_state.innerHTML = "<span style='color:red'>Offline</span>";
    // break;
  }
}
window.addEventListener('online', change_working_state("online"));
window.addEventListener('offline', change_working_state("offline"));

function getTimeDuration(secondDate) {
  var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
  var firstDate = new Date;
  var diffDays = Math.round(
    Math.abs(
      (firstDate.getTime() - secondDate.getTime())/(oneDay)
    )
  );
  // console.log((firstDate.getTime() - secondDate.getTime())/(oneDay))
  if(diffDays == 0) {
    return "Today";
  }
  else if(diffDays == 1) {
    return "Yesterday";
  }
  else if(diffDays > 1) {
    return diffDays + " Days ago";
  }
  return diffDays;
}
