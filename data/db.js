const Sequelize = require("sequelize");
const sequelize = new Sequelize("wt24", "root", "", {
  host: "127.0.0.1",
  dialect: "mysql",
  logging: false,
});
const db = {};

db.sequelize = sequelize;

db.korisnik = require("../modeli/korisnik.js")(sequelize);
db.nekretnina = require("../modeli/nekretnina.js")(sequelize);
db.upit = require("../modeli/upit.js")(sequelize);

db.nekretnina.hasMany(db.upit, { as: "upiti" });
db.korisnik.hasMany(db.upit, { as: "upiti" });

async function kreiranjeTabela() {
  console.log("Pokrenuto kreiranje");
  await db.sequelize.sync();
}

kreiranjeTabela();

async function punjenjeTabela() {
  db.korisnik.create({
    ime: "Dino",
    prezime: "Bajramovic",
    username: "dino",
    password: "$2b$10$B4aIk2O8lYZDtxhMC59K9Ok2GwkSfKULT/u28DO1a90flEw8Hb7JK",
    //sifra iznad hashirana je "1", a username je "dino"
  });

  db.nekretnina.create({
    tip_nekretnine: "Stan",
    naziv: "Stan u Sarajevu",
    kvadratura: 158,
    cijena: 132000,
    tip_grijanja: "plin",
    lokacija: "Breka",
    godina_izgradnje: 2010,
    datum_objave: "01.10.2023.",
    opis: "Sociis natoque penatibus.",
  });

  db.nekretnina.create({
    tip_nekretnine: "Stan",
    naziv: "Stan u Sarajevu",
    kvadratura: 108,
    cijena: 202000,
    tip_grijanja: "plin",
    lokacija: "Novo Sarajevo",
    godina_izgradnje: 2020,
    datum_objave: "01.12.2023.",
    image: "https://img.freepik.com/free-photo/3d-rendering-loft-luxury-living-room-with-bookshelf-near-bookshelf_105762-2224.jpg",
    opis: "Sociis natoque penatibus.",
  });

  db.nekretnina.create({
    tip_nekretnine: "Stan",
    naziv: "Stan u Sarajevu",
    kvadratura: 158,
    cijena: 132000,
    tip_grijanja: "plin",
    lokacija: "Breka",
    godina_izgradnje: 2010,
    datum_objave: "01.10.2023.",
    opis: "Sociis natoque penatibus.",
  });

  db.nekretnina.create({
    tip_nekretnine: "Stan",
    naziv: "Stan u Sarajevu",
    kvadratura: 158,
    cijena: 132000,
    tip_grijanja: "plin",
    lokacija: "Breka",
    godina_izgradnje: 2010,
    datum_objave: "01.10.2023.",
    opis: "Sociis natoque penatibus.",
  });

  db.nekretnina.create({
    tip_nekretnine: "Poslovni prostor",
    naziv: "Poslovni prostor u Sarajevu",
    kvadratura: 128,
    cijena: 32000,
    tip_grijanja: "plin",
    lokacija: "Grbavica",
    godina_izgradnje: 2020,
    datum_objave: "01.10.2023.",
    opis: "Sociis natoque penatibus.",
  });

  db.nekretnina.create({
    tip_nekretnine: "Poslovni prostor",
    naziv: "Poslovni prostor u Sarajevu",
    kvadratura: 128,
    cijena: 32000,
    tip_grijanja: "plin",
    lokacija: "Grbavica",
    godina_izgradnje: 2020,
    datum_objave: "01.10.2023.",
    opis: "Sociis natoque penatibus.",
  });

  db.nekretnina.create({
    tip_nekretnine: "Poslovni prostor",
    naziv: "Poslovni prostor u Sarajevu",
    kvadratura: 128,
    cijena: 32000,
    tip_grijanja: "plin",
    lokacija: "Grbavica",
    godina_izgradnje: 2020,
    datum_objave: "01.10.2023.",
    opis: "Sociis natoque penatibus.",
  });

  db.nekretnina.create({
    tip_nekretnine: "Kuća",
    naziv: "Kuca u Sarajevu",
    kvadratura: 128,
    cijena: 32000,
    tip_grijanja: "plin",
    lokacija: "Grbavica",
    godina_izgradnje: 2020,
    datum_objave: "01.10.2023.",
    opis: "Sociis natoque penatibus.",
  });

  db.nekretnina.create({
    tip_nekretnine: "Kuća",
    naziv: "Kuca u Sarajevu",
    kvadratura: 128,
    cijena: 32000,
    tip_grijanja: "plin",
    lokacija: "Grbavica",
    godina_izgradnje: 2020,
    datum_objave: "01.10.2023.",
    opis: "Sociis natoque penatibus.",
  });

  db.nekretnina.create({
    tip_nekretnine: "Kuća",
    naziv: "Kuca u Sarajevu",
    kvadratura: 128,
    cijena: 32000,
    tip_grijanja: "plin",
    lokacija: "Grbavica",
    godina_izgradnje: 2020,
    datum_objave: "01.10.2023.",
    opis: "Sociis natoque penatibus.",
  });

  db.upit.create({
    NekretninaId: 1,
    KorisnikId: 1,
    tekst_upita: "Test",
  });
}

setTimeout(punjenjeTabela, 1000);
module.exports = db;
