const divStan = document.getElementById("stan");
const divKuca = document.getElementById("kuca");
const divPp = document.getElementById("pp");
const sviTekstovi = ["Stan", "Kuća", "Poslovni prostor"];
const sviGridovi = [divStan, divKuca, divPp];
let nekretnine = SpisakNekretnina();
let listaNekretnina = [];
let listaKorisnika = [];
let kriteriji = {};
let filtriraneNekretnine = [];
let otvoreniDetalji = false;

function spojiNekretnine(divReferenca, instancaModula, tip_nekretnine) {
  const rez = instancaModula.filtrirajNekretnine({
    ...kriteriji,
    tip_nekretnine,
  });
  const nekretnineDiv = document.createElement("div");
  nekretnineDiv.classList.add("nekretnine-grid");
  const headingDva = document.createElement("h2");
  headingDva.innerText = tip_nekretnine;
  const defaultURL =
    "https://img.freepik.com/free-photo/3d-rendering-loft-luxury-living-room-with-bookshelf-near-bookshelf_105762-2224.jpg";
  rez.map((el) => {
    filtriraneNekretnine.push(el);
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
    dugme.setAttribute("onclick", "otvoriDodatno(this.parentNode)");
    const nekretnina = document.createElement("div");
    nekretnina.classList.add("nekretnina");

    const klikoviTekst = document.createTextNode("Broj klikova: ");
    const klikovi = document.createElement("span");
    const klikoviSve = document.createElement("div");
    klikovi.setAttribute("id", "klikovi-" + el.id);
    klikoviSve.appendChild(klikoviTekst);
    klikoviSve.appendChild(klikovi);

    const pretrageTekst = document.createTextNode("Broj pretraga: ");
    const pretrage = document.createElement("span");
    const pretrageSve = document.createElement("div");
    pretrage.setAttribute("id", "pretrage-" + el.id);
    pretrageSve.appendChild(pretrageTekst);
    pretrageSve.appendChild(pretrage);

    nekretnina.appendChild(img);
    nekretnina.appendChild(naziv);
    nekretnina.appendChild(kvadratura);
    nekretnina.appendChild(cijena);
    nekretnina.appendChild(klikoviSve);
    nekretnina.appendChild(pretrageSve);
    nekretnina.appendChild(dugme);
    nekretnina.setAttribute("id", el.id);
    nekretnineDiv.appendChild(nekretnina);
  });

  divReferenca?.appendChild(headingDva);
  divReferenca?.appendChild(nekretnineDiv);
}

function obrisiDjecu(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

function prilagodjenaPretraga() {
  const getValue = (id) => parseFloat(document.getElementById(id).value);

  const min_cijena = getValue("minCijenaCustom");
  const max_cijena = getValue("maxCijenaCustom");
  const min_kvadratura = getValue("minKvadraturaCustom");
  const max_kvadratura = getValue("maxKvadraturaCustom");

  kriteriji = {
    ...(isNaN(min_kvadratura) ? {} : { min_kvadratura }),
    ...(isNaN(max_kvadratura) ? {} : { max_kvadratura }),
    ...(isNaN(min_cijena) ? {} : { min_cijena }),
    ...(isNaN(max_cijena) ? {} : { max_cijena }),
  };

  sviGridovi.forEach((skup) => {
    obrisiDjecu(skup);
  });

  sviGridovi.forEach((skup, index) => {
    spojiNekretnine(skup, nekretnine, sviTekstovi[index]);
  });

  MarketingAjax.novoFiltriranje(filtriraneNekretnine);

  sviGridovi.forEach((skup) => {
    MarketingAjax.osvjeziKlikove(skup);
    MarketingAjax.osvjeziPretrage(skup);
  });

  filtriraneNekretnine = [];
  otvoreniDetalji = false;
}

const getData = () => {
  PoziviAjax.getNekretnine((error, data) => {
    if (error) {
      console.error(error);
    } else {
      listaNekretnina = JSON.parse(data);
      nekretnine.init(listaNekretnina, listaKorisnika);
      prilagodjenaPretraga();
    }
  });
};
getData();

setInterval(function () {
  if (!otvoreniDetalji) {
    sviGridovi.forEach((skup) => {
      MarketingAjax.osvjeziKlikove(skup);
      MarketingAjax.osvjeziPretrage(skup);
    });
  }
}, 500);

function otvoriDodatno(element) {
  const gridLista = element.parentNode;
  gridLista.childNodes.forEach((el) => {
    el.setAttribute("style", "");
  });
  element.setAttribute("style", "width: 500px; grid-column: span 2;");
  otvoreniDetalji = true;
  MarketingAjax.klikNekretnina(element.id);
  MarketingAjax.osvjeziKlikove(gridLista);
}
