function PatientCard() {
  this._header;
  this.name;
  this.gender;
  this.duration;
  this.phonenumber;
  this.age;
  this.id;

  this.translate = function(text, lang) {
    if(text === null) return;
    var fr = {"yesterday":"hier", "today":"aujourd'hui", "years":"ans", "days":"journées", "male":"mâle", "female":"femelle"};
    switch(lang) {
      case "fr":
        if(text.search("days") != -1) return fr["days"];
        else return fr[text];
      break;

      default:
      return text;
      break;
    }

  }

  this.view = function(lang) {
    var div = document.createElement("div");
    div.id = this.id;
    div.name = this.name;
    div.className = "card card-patient";
    div.getText = function(key, lang) {
      // console.log("lang: " + lang);
      var fr = {"collect_specimen" : "Collecte de l’échantillon", "lab" : "Laboratoire", "follow_up" : "Mesures de suivi", "outcome_recorded" : "Enregistrement des résultats", "Available actions..." : "Actions disponibles...", "information":"information"};
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
    div.setAttribute("data-toggle", "modal");
    div.setAttribute("data-target", "exampleModal");
    div.onclick = function() {
      sessionStorage.setItem("userId", this.id);
      sessionStorage.setItem("userName", this.name);
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
      div.onclick = function() { window.location.href='information.html' };
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
      div.onclick = function() { window.location.href='specimen_collection.html' };
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
      div.id = "specimen_collection";
      var col = div;
      row.appendChild(col);

      div = document.createElement("figure");
      div.setAttribute("data-dismiss", "modal");
      div.className="figure";
      div.onclick = function() { window.location.href='lab.html' };

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
      div.id = "specimen_collection";
      var col = div;
      row1.appendChild(col);

      div = document.createElement("figure");
      div.setAttribute("data-dismiss", "modal");
      div.className="figure";
      div.onclick = function() { window.location.href='follow-up.html' };
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
      div.id = "specimen_collection";
      var col = div;
      row1.appendChild(col);

      div = document.createElement("figure");
      div.setAttribute("data-dismiss", "modal");
      div.className="figure";
      div.onclick = function() { window.location.href='outcome.html' };

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
    var card = div;

    div = document.createElement("div");
    div.className = "card-body text-center";
    div.appendChild(document.createTextNode(this.name));
    div.appendChild(document.createElement("br"));
    div.appendChild(document.createTextNode(this.translate(this.gender, lang)));
    div.appendChild(document.createElement("br"));
    div.appendChild(document.createTextNode(this.translate(this.duration, lang) + " | " + this.phonenumber + " | " + this.age + " "+ this.translate("years", lang)));
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
    working_state.innerHTML = "<span style='color:blue'>Online</span>";
    break;

    // case "offline":
    // working_state.innerHTML = "<span style='color:red'>Offline</span>";
    // break;
  }
}
window.addEventListener('online', change_working_state("online"));
window.addEventListener('offline', change_working_state("offline"));
