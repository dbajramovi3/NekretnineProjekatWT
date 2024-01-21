function dodajNoviUpit() {
  const nekretninaId = parseInt(document.body.id);
  const tekstUpita = document.getElementById("noviUpit").value;
  PoziviAjax.postUpit(nekretninaId, tekstUpita, function (err, data) {
    if (err) return;
    else {
      const upitiHTML = document.getElementById("listaUpita");
      const li = document.createElement("li");
      li.setAttribute("class", "upit");
      let user = localStorage.getItem("user");
      const userHTML = document.createElement("p");
      const strong = document.createElement("strong");
      strong.textContent = user;
      const tekstUpitaHTML = document.createElement("p");
      tekstUpitaHTML.textContent = tekstUpita;
      userHTML.appendChild(strong);
      li.appendChild(userHTML);
      li.appendChild(tekstUpitaHTML);
      upitiHTML.appendChild(li);
    }
  });
}
