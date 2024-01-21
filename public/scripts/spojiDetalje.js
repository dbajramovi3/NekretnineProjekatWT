const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");
PoziviAjax.getNekretninaById(id, function (err, data) {
  if (err) {
  } else {
    data = JSON.parse(data);
    console.log("data", data);
    console.log("id" + id);
    const propertiji = Object.keys(data);
    propertiji.forEach((property) => {
      if (property !== "upiti" && property !== "id") {
        console.log("propert", property);
        document.getElementById(property).textContent = data[property];
      }
    });
    const upitiHTML = document.getElementById("listaUpita");
    data.upiti.forEach((upit) => {
      console.log("upit", upit);
      const li = document.createElement("li");
      li.setAttribute("class", "upit");
      const user = document.createElement("p");
      const strong = document.createElement("strong");
      strong.textContent = upit.user;
      const tekstUpita = document.createElement("p");
      tekstUpita.textContent = upit.tekst_upita;
      user.appendChild(strong);
      li.appendChild(user);
      li.appendChild(tekstUpita);
      upitiHTML.appendChild(li);
    });
    document.body.id = data.id;
    if (localStorage.getItem("user")) {
      document.getElementById("forma").style.display = "block";
    }
  }
});
