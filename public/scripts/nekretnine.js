const divStan = document.getElementById("stan");
const divKuca = document.getElementById("kuca");
const divPp = document.getElementById("pp");
let nekretnine = SpisakNekretnina();
let listaNekretnina = [];
let listaKorisnika = [];

function spojiNekretnine(divReferenca, instancaModula, tip_nekretnine) {
  const rez = instancaModula.filtrirajNekretnine({
    tip_nekretnine: tip_nekretnine,
  });
  // iscrtavanje elemenata u divReferenca element
  const nekretnineDiv = document.createElement("div");
  nekretnineDiv.classList.add("nekretnine-grid");
  const headingDva = document.createElement("h2");
  headingDva.innerText = tip_nekretnine;
  const defaultURL =
    "https://img.freepik.com/free-photo/3d-rendering-loft-luxury-living-room-with-bookshelf-near-bookshelf_105762-2224.jpg";
  rez.map((el) => {
    const img = document.createElement("img");
    if (el.image) {
      img.src = el.image;
    } else {
      img.src = defaultURL;
    }
    const naziv = document.createElement("p");
    naziv.innerText = el.naziv;
    const kvadratura = document.createElement("p");
    kvadratura.innerText = el.kvadratura;
    const cijena = document.createElement("p");
    cijena.innerText = el.cijena;
    const dugme = document.createElement("button");
    dugme.innerText = "detalji";

    naziv.classList.add("naziv");
    kvadratura.classList.add("kvadratura");
    cijena.classList.add("cijena");
    dugme.classList.add("detalji");

    const nekretnina = document.createElement("div");
    nekretnina.classList.add("nekretnina");
    nekretnina.appendChild(img);
    nekretnina.appendChild(naziv);
    nekretnina.appendChild(kvadratura);
    nekretnina.appendChild(cijena);
    nekretnina.appendChild(dugme);

    nekretnineDiv.appendChild(nekretnina);
  });

  divReferenca?.appendChild(headingDva);
  divReferenca?.appendChild(nekretnineDiv);
}

const uzmiNekretnine = () => {
  PoziviAjax.getNekretnine((error, data) => {
    if (error) {
      console.log(error);
    } else {
      console.log("data", data);
      listaNekretnina = JSON.parse(data);
      nekretnine.init(listaNekretnina, listaKorisnika);
      spojiNekretnine(divStan, nekretnine, "Stan");
      spojiNekretnine(divKuca, nekretnine, "Kuća");
      spojiNekretnine(divPp, nekretnine, "Poslovni prostor");
    }
  });
};

uzmiNekretnine();
