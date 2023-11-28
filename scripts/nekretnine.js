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
      img.src = el.image;
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
      image: "https://img.freepik.com/free-photo/3d-rendering-loft-luxury-living-room-with-bookshelf-near-bookshelf_105762-2224.jpg",
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
      naziv: "Useljiv stan Zenica",
      kvadratura: 80,
      cijena: 190000,
      tip_grijanja: "plin",
      lokacija: "Zenica",
      godina_izgradnje: 2015,
      datum_objave: "01.10.2015.",
      opis: "Sociis natoque penatibus.",
      image: "https://images.squarespace-cdn.com/content/v1/5d80f4c6160e82532fe421e7/1584487640956-O9Y3Q5ZKS0CH86NN88LU/Penthouse+Living+Room.jpg",
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
      naziv: "Useljiv stan Mostar",
      kvadratura: 120,
      cijena: 300000,
      tip_grijanja: "plin",
      lokacija: "Mostar",
      godina_izgradnje: 2020,
      datum_objave: "01.10.2022.",
      opis: "Sociis natoque penatibus.",
      image: "https://i.pinimg.com/736x/a9/14/e3/a914e336ecb850e59424e7fa90cd9be9.jpg",
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
      naziv: "Useljiv stan Tuzla",
      kvadratura: 52,
      cijena: 150000,
      tip_grijanja: "plin",
      lokacija: "Tuzla",
      godina_izgradnje: 2012,
      datum_objave: "01.10.2022.",
      opis: "Sociis natoque penatibus.",
      image: "https://c4.wallpaperflare.com/wallpaper/396/394/415/city-apartment-design-wallpaper-preview.jpg",
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
      id: 5,
      tip_nekretnine: "Stan",
      naziv: "Useljiv stan Sarajevo, Grbavica",
      kvadratura: 49,
      cijena: 120000,
      tip_grijanja: "plin",
      lokacija: "Sarajevo",
      godina_izgradnje: 2020,
      datum_objave: "01.10.2018.",
      opis: "Sociis natoque penatibus.",
      image: "https://www.area.ba/wp-content/uploads/2021/02/1660_1_1612176870.jpg",
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
      id: 6,
      tip_nekretnine: "Stan",
      naziv: "Useljiv stan Bihać",
      kvadratura: 70,
      cijena: 200000,
      tip_grijanja: "plin",
      lokacija: "Bihać",
      godina_izgradnje: 2023,
      datum_objave: "01.10.2019.",
      opis: "Sociis natoque penatibus.",
      image: "https://sarajcity.com/wp-content/uploads/2022/11/1669805177761-850x570.jpg",
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
      id: 1,
      tip_nekretnine: "Kuća",
      naziv: "Kuća na selu",
      kvadratura: 300,
      cijena: 500000,
      tip_grijanja: "struja",
      lokacija: "Sarajevo",
      godina_izgradnje: 2012,
      datum_objave: "20.08.2020.",
      opis: "Magnis dis parturient montes.",
      image: "https://cdn.onekindesign.com/wp-content/uploads/2020/09/Rustic-Barn-Home-Mountainwood-Homes-00-1-Kindesign.jpg",
      upiti: [
        {
          korisnik_id: 2,
          tekst_upita: "Integer tincidunt.",
        },
      ],
    },

    {
      id: 2,
      tip_nekretnine: "Kuća",
      naziv: "Blace, Croatia",
      kvadratura: 150,
      cijena: 490000,
      tip_grijanja: "struja",
      lokacija: "Croatia",
      godina_izgradnje: 2015,
      datum_objave: "20.08.2021.",
      opis: "Magnis dis parturient montes.",
      image: "https://www.apartmanija.hr/slike/apartments/Marinus_5b3c6503ce2e.jpg",
      upiti: [
        {
          korisnik_id: 2,
          tekst_upita: "Integer tincidunt.",
        },
      ],
    },

    {
      id: 3,
      tip_nekretnine: "Kuća",
      naziv: "Kuća Ilijaš",
      kvadratura: 120,
      cijena: 250000,
      tip_grijanja: "struja",
      lokacija: "Ilijaš",
      godina_izgradnje: 2013,
      datum_objave: "20.08.2022.",
      opis: "Magnis dis parturient montes.",
      image: "https://i.pinimg.com/originals/df/66/27/df6627bb43d8d422cc21096e7ac758e3.jpg",
      upiti: [
        {
          korisnik_id: 2,
          tekst_upita: "Integer tincidunt.",
        },
      ],
    },

    {
      id: 4,
      tip_nekretnine: "Kuća",
      naziv: "Kuća Tuzla",
      kvadratura: 200,
      cijena: 189000,
      tip_grijanja: "struja",
      lokacija: "Tuzla",
      godina_izgradnje: 2000,
      datum_objave: "20.08.2013.",
      opis: "Magnis dis parturient montes.",
      image: "https://sarajcity.com/wp-content/uploads/2021/07/IMG_20210712_115056-850x570.jpg",
      upiti: [
        {
          korisnik_id: 2,
          tekst_upita: "Integer tincidunt.",
        },
      ],
    },

    {
      id: 5,
      tip_nekretnine: "Kuća",
      naziv: "Kuća Neum",
      kvadratura: 180,
      cijena: 600000,
      tip_grijanja: "struja",
      lokacija: "Neum",
      godina_izgradnje: 2022,
      datum_objave: "20.08.2022.",
      opis: "Magnis dis parturient montes.",
      image: "https://mygate.com/wp-content/uploads/2023/07/110.jpg",
      upiti: [
        {
          korisnik_id: 2,
          tekst_upita: "Integer tincidunt.",
        },
      ],
    },

    {
      id: 6,
      tip_nekretnine: "Kuća",
      naziv: "Dvorac Jezero",
      kvadratura: 750,
      cijena: 3000000,
      tip_grijanja: "struja",
      lokacija: "Jezero Sarajevo",
      godina_izgradnje: 2020,
      datum_objave: "20.08.2021.",
      opis: "Magnis dis parturient montes.",
      image: "https://a.cdn-hotels.com/gdcs/production12/d1130/83f1c8c6-e12d-4e69-8433-c5bbc90b5ad6.jpg",
      upiti: [
        {
          korisnik_id: 2,
          tekst_upita: "Integer tincidunt.",
        },
      ],
    },

    {
      id: 1,
      tip_nekretnine: "Poslovni prostor",
      naziv: "Hub Homework",
      kvadratura: 200,
      cijena: 150000,
      tip_grijanja: "struja",
      lokacija: "Centar",
      godina_izgradnje: 2013,
      datum_objave: "20.08.2023.",
      opis: "Magnis dis parturient montes.",
      image: "https://homeworkhub.ba/wp-content/uploads/2020/12/2-scaled.jpg",
      upiti: [
        {
          korisnik_id: 2,
          tekst_upita: "Integer tincidunt.",
        },
      ],
    },

    {
      id: 2,
      tip_nekretnine: "Poslovni prostor",
      naziv: "Poslovni prostor Sarajevo",
      kvadratura: 80,
      cijena: 100000,
      tip_grijanja: "struja",
      lokacija: "Novo Sarajevo",
      godina_izgradnje: 2005,
      datum_objave: "20.08.2021.",
      opis: "Magnis dis parturient montes.",
      image: "https://images.livspace-cdn.com/plain/https://jumanji.livspace-cdn.com/magazine/wp-content/uploads/sites/2/2023/05/23163145/modern-office-interior-design-with-partition-plants.jpg",
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
      naziv: "Mali poslovni prostor Mostar",
      kvadratura: 50,
      cijena: 80000,
      tip_grijanja: "struja",
      lokacija: "Mostar",
      godina_izgradnje: 2015,
      datum_objave: "20.08.2022.",
      opis: "Magnis dis parturient montes.",
      image: "https://maliganes.hr/wp-content/uploads/2018/08/poslovni-prostori.jpg",
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
      naziv: "Veliki poslovni prostor Sarajevo",
      kvadratura: 300,
      cijena: 300000,
      tip_grijanja: "struja",
      lokacija: "Centar",
      godina_izgradnje: 2012,
      datum_objave: "20.08.2023.",
      opis: "Magnis dis parturient montes.",
      image: "https://cdn.mos.cms.futurecdn.net/hKX2Uqg2giQikXUekiPNaC.jpg",
      upiti: [
        {
          korisnik_id: 2,
          tekst_upita: "Integer tincidunt.",
        },
      ],
    },

    {
      id: 5,
      tip_nekretnine: "Poslovni prostor",
      naziv: "Mali poslovni prostor Zenica",
      kvadratura: 20,
      cijena: 80000,
      tip_grijanja: "struja",
      lokacija: "Zenica",
      godina_izgradnje: 2021,
      datum_objave: "20.08.2022.",
      opis: "Magnis dis parturient montes.",
      image: "https://steelcase-res.cloudinary.com/image/upload/c_fill,q_auto,f_auto,h_656,w_1166/v1610900341/www.steelcase.com/2021/01/17/21-0148159_16x9.jpg",
      upiti: [
        {
          korisnik_id: 2,
          tekst_upita: "Integer tincidunt.",
        },
      ],
    },

    {
      id: 6,
      tip_nekretnine: "Poslovni prostor",
      naziv: "Mali poslovni prostor Tuzla",
      kvadratura: 30,
      cijena: 120000,
      tip_grijanja: "struja",
      lokacija: "Tuzla",
      godina_izgradnje: 2021,
      datum_objave: "20.08.2021.",
      opis: "Magnis dis parturient montes.",
      image: "https://www.lista-office.com/fileadmin/lo/lo-business-solutions/Lista_Office_LO_B2B_Herobackground.jpg",
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
