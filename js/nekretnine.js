function spojiNekretnine(divReferenca, instancaModula, tip_nekretnine) {
    // pozivanje metode za filtriranje
    const rez = instancaModula.filtrirajNekretnine({
      tip_nekretnine: tip_nekretnine,
    });
    // iscrtavanje elemenata u divReferenca element
    const nekretnineDiv = document.createElement("div");
    nekretnineDiv.classList.add("nekretnine-grid");
    const headingDva = document.createElement("h2");
    headingDva.innerText = tip_nekretnine;
    rez.map((el) => {
      const dijete = document.createElement("div");
      const img = document.createElement("img");
      img.src =
        "https://img.freepik.com/free-photo/3d-rendering-loft-luxury-living-room-with-bookshelf-near-bookshelf_105762-2224.jpg";
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
window.addEventListener("load", function () {
 

  const divStan = document.getElementById("stan");
  const divKuca = document.getElementById("kuca");
  const divPp = document.getElementById("pp");

  const listaNekretnina = [
    {
      id: 1,
      tip_nekretnine: "Stan",
      naziv: "Useljiv stan Sarajevo",
      kvadratura: 58,
      cijena: 232000,
      tip_grijanja: "plin",
      lokacija: "Novo Sarajevo",
      godina_izgradnje: 2019,
      datum_objave: "01.10.2023.",
      opis: "Sociis natoque penatibus.",
      upiti: [
        {
          korisnik_id: 1,
          tekst_upita: "Nullam eu pede mollis pretium.",
        },
        {
          korisnik_id: 2,
          tekst_upita: "Phasellus viverra nulla.",
        },
      ],
    },

    {
      id: 2,
      tip_nekretnine: "Stan",
      naziv: "Useljiv stan Sarajevo",
      kvadratura: 58,
      cijena: 232000,
      tip_grijanja: "plin",
      lokacija: "Novo Sarajevo",
      godina_izgradnje: 2019,
      datum_objave: "01.10.2023.",
      opis: "Sociis natoque penatibus.",
      upiti: [
        {
          korisnik_id: 1,
          tekst_upita: "Nullam eu pede mollis pretium.",
        },
        {
          korisnik_id: 2,
          tekst_upita: "Phasellus viverra nulla.",
        },
      ],
    },

    {
      id: 3,
      tip_nekretnine: "Stan",
      naziv: "Useljiv stan Sarajevo",
      kvadratura: 58,
      cijena: 232000,
      tip_grijanja: "plin",
      lokacija: "Novo Sarajevo",
      godina_izgradnje: 2019,
      datum_objave: "01.10.2023.",
      opis: "Sociis natoque penatibus.",
      upiti: [
        {
          korisnik_id: 1,
          tekst_upita: "Nullam eu pede mollis pretium.",
        },
        {
          korisnik_id: 2,
          tekst_upita: "Phasellus viverra nulla.",
        },
      ],
    },

    {
      id: 4,
      tip_nekretnine: "Stan",
      naziv: "Useljiv stan Sarajevo",
      kvadratura: 58,
      cijena: 232000,
      tip_grijanja: "plin",
      lokacija: "Novo Sarajevo",
      godina_izgradnje: 2019,
      datum_objave: "01.10.2023.",
      opis: "Sociis natoque penatibus.",
      upiti: [
        {
          korisnik_id: 1,
          tekst_upita: "Nullam eu pede mollis pretium.",
        },
        {
          korisnik_id: 2,
          tekst_upita: "Phasellus viverra nulla.",
        },
      ],
    },
    {
      id: 2,
      tip_nekretnine: "Poslovni prostor",
      naziv: "Mali poslovni prostor",
      kvadratura: 20,
      cijena: 70000,
      tip_grijanja: "struja",
      lokacija: "Centar",
      godina_izgradnje: 2005,
      datum_objave: "20.08.2023.",
      opis: "Magnis dis parturient montes.",
      upiti: [
        {
          korisnik_id: 2,
          tekst_upita: "Integer tincidunt.",
        },
      ],
    },
    {
      id: 3,
      tip_nekretnine: "Poslovni prostor",
      naziv: "Mali poslovni prostor",
      kvadratura: 20,
      cijena: 70000,
      tip_grijanja: "struja",
      lokacija: "Centar",
      godina_izgradnje: 2005,
      datum_objave: "20.08.2023.",
      opis: "Magnis dis parturient montes.",
      upiti: [
        {
          korisnik_id: 2,
          tekst_upita: "Integer tincidunt.",
        },
      ],
    },
    {
      id: 4,
      tip_nekretnine: "Poslovni prostor",
      naziv: "Mali poslovni prostor",
      kvadratura: 20,
      cijena: 70000,
      tip_grijanja: "struja",
      lokacija: "Centar",
      godina_izgradnje: 2005,
      datum_objave: "20.08.2023.",
      opis: "Magnis dis parturient montes.",
      upiti: [
        {
          korisnik_id: 2,
          tekst_upita: "Integer tincidunt.",
        },
      ],
    },
  ];

  const listaKorisnika = [
    {
      id: 1,
      ime: "Neko",
      prezime: "Nekic",
      username: "username1",
    },
    {
      id: 2,
      ime: "Neko2",
      prezime: "Nekic2",
      username: "username2",
    },
  ];
  //instanciranje modula
  let nekretnine = SpisakNekretnina();
  nekretnine.init(listaNekretnina, listaKorisnika);

  //pozivanje funkcije
  spojiNekretnine(divStan, nekretnine, "Stan");
  spojiNekretnine(divKuca, nekretnine, "Kuća");
  spojiNekretnine(divPp, nekretnine, "Poslovni prostor");
});
