const express = require("express");
const path = require("path");
const fs = require("fs");
const bodyParser = require("body-parser");
const session = require("express-session");
const bcrypt = require("bcrypt");
const db = require("./data/db");

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname + "/public/html")));
app.use(express.static(path.join(__dirname + "/public/css")));
app.use(express.static(path.join(__dirname + "/public/scripts")));
app.use(express.static(path.join(__dirname + "/public/assets")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    secret: "tajna_rjec",
    resave: false,
    saveUninitialized: true,
  })
);

//varijable
const pathNekretnine = "./data/nekretnine.json";
const pathKorisnici = "./data/korisnici.json";
const korisnici = require("./data/korisnici.json");
const nekretnine = require("./data/nekretnine.json");
const { error } = require("console");
let klikoviPretrage = [];
for (let i = 1; i < 400; i++) {
  klikoviPretrage.push({
    id: i,
    klikovi: 0,
    pretrage: 0,
  });
}
let klikoviPretrageZadnjaVerzija = [];
let zadnjaVerzijaNekretnina = [];

//LOGIN RUTA
app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const korisnik = await db.korisnik.findOne({
      where: { username },
    });

    if (!korisnik) {
      return res.status(401).json({ poruka: "Neuspješna prijava" });
    }

    const isPasswordValid = await bcrypt.compare(password, korisnik.password);

    if (isPasswordValid) {
      req.session.korisnik = korisnik.dataValues;
      return res.status(200).json({ poruka: "Uspješna prijava" });
    } else {
      return res.status(401).json({ poruka: "Neuspješna prijava" });
    }
  } catch (error) {
    return res.status(500).json({ poruka: "Server error" });
  }
});

//LOGOUT RUTA
app.post("/logout", (req, res) => {
  if (req.session.korisnik) {
    req.session.destroy((err) => {
      if (err) {
        console.error("Greška prilikom odjave:", err);
        res.status(500).json({ greska: "Greška prilikom odjave" });
      } else {
        res.status(200).json({ poruka: "Uspješno ste se odjavili" });
      }
    });
  } else {
    res.status(401).json({ greska: "Neautorizovan pristup" });
  }
});
//LOGOUT RUTA

//KORISNIK RUTA
app.get("/korisnik", (req, res) => {
  if (req.session.korisnik) {
    res.status(200).json(req.session.korisnik);
  } else {
    res.status(401).json({ greska: "Neautorizovan pristup" });
  }
});
//KORISNIK RUTA

//UPIT RUTA
app.post("/upit", async (req, res) => {
  if (req.session.korisnik) {
    const { nekretnina_id, tekst_upita } = req.body;
    let nekretnina = db.nekretnina.findOne({
      where: {
        id: parseInt(nekretnina_id),
      },
    });
    if (!nekretnina) {
      res.status(400).json({
        poruka: `Nekretnina sa id-em ${nekretnina_id} ne postoji`,
      });
    } else {
      db.upit.create({
        KorisnikId: req.session.korisnik.id,
        NekretninaId: parseInt(nekretnina_id),
        tekst_upita,
      });

      res.status(200).json({
        poruka: "Upit je uspješno dodan",
      });
    }
  } else {
    return res.status(401).json({ poruka: "Neautorizovan pristup" });
  }
});
//UPIT RUTA

//KORISNIK RUTA
app.put("/korisnik", async (req, res) => {
  if (req.session.korisnik) {
    let korisnik = await db.korisnik.findOne({
      where: {
        id: req.session.korisnik.id,
      },
    });

    const noviPodaci = req.body;
    korisnik = korisnik.dataValues;
    korisnik = {
      ...korisnik,
      ime: noviPodaci.ime || korisnik.ime,
      prezime: noviPodaci.prezime || korisnik.prezime,
      username: noviPodaci.username || korisnik.username,
      password: hesuj(noviPodaci.password) || korisnik.password,
    };

    db.korisnik.update(
      {
        ime: korisnik.ime,
        prezime: korisnik.prezime,
        username: korisnik.username,
        password: korisnik.password,
      },
      {
        where: {
          id: korisnik.id,
        },
      }
    );

    req.session.korisnik = korisnik;

    res.status(200).json({
      poruka: "Podaci su uspješno ažurirani",
    });
  } else {
    return res.status(401).json({ poruka: "Neautorizovan pristup" });
  }
});
//KORISNIK RUTA

//NEKRETNINE RUTA
app.get("/nekretnine", async function (req, res) {
  try {
    let nekretnine = await db.nekretnina.findAll();
    nekretnine = nekretnine.map((p) => p.dataValues);
    res.status(200).json(nekretnine);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});
//NEKRETNINE RUTA

function hesuj(tekst) {
  bcrypt.hash(tekst, 10, (err, hash) => {
    return err ?? hash;
  });
}

app.post("/marketing/nekretnine", (req, res) => {
  const nizNekretnina = req.body.nizNekretnina;
  for (const kp of klikoviPretrage) {
    if (nizNekretnina.includes(kp.id)) {
      kp.pretrage++;
    }
  }
  res.status(200).json({});
});

app.post("/marketing/nekretnine/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const foundItem = klikoviPretrage.find((element) => element.id === id);
  if (foundItem) {
    foundItem.klikovi++;
  }

  res.status(200).json({});
});

const dubokaKopija = (objekat) => {
  return JSON.parse(JSON.stringify(objekat));
};

app.post("/marketing/osvjezi", (req, res) => {
  const { nizNekretnina } = req.body;

  if (klikoviPretrageZadnjaVerzija.length === 0) {
    //pravimo duboke kopije za nekretnine i njihove dodatne podatke
    klikoviPretrageZadnjaVerzija = dubokaKopija(klikoviPretrage);
    zadnjaVerzijaNekretnina = klikoviPretrageZadnjaVerzija.map(({ id }) => id);

    return res
      .status(200)
      .json({ nizNekretnina: klikoviPretrageZadnjaVerzija });
  }

  const noviPodaci = klikoviPretrage.filter((item, i) => {
    const { id, klikovi, pretrage } = klikoviPretrageZadnjaVerzija[i];
    return (
      (nizNekretnina?.includes(id) || zadnjaVerzijaNekretnina?.includes(id)) &&
      (klikovi !== item.klikovi || pretrage !== item.pretrage)
    );
  });

  if (nizNekretnina) {
    zadnjaVerzijaNekretnina = nizNekretnina;
  }

  klikoviPretrageZadnjaVerzija = dubokaKopija(klikoviPretrage);

  if (noviPodaci.length === 0) {
    return res.status(200).json({});
  }

  return res.status(200).json({ nizNekretnina: noviPodaci });
});

app.listen(port, () => {
  console.log(`Server radi na http://localhost:${port}`);
});

app.get("/nekretnina/:id", function (req, res) {
  const id = parseInt(req.params.id);
  try {
    db.nekretnina
      .findOne({
        where: {
          id,
        },
      })
      .then((nekretnina) => {
        db.upit
          .findAll({
            where: {
              NekretninaId: nekretnina.dataValues.id,
            },
          })
          .then(async (upiti) => {
            upiti = upiti.map((u) => u.dataValues);
            nekretnina.dataValues.upiti = upiti;
            await Promise.all(
              upiti.map(async (upit, j) => {
                const korisnik = await db.korisnik.findOne({
                  where: {
                    id: upit.KorisnikId,
                  },
                });
                nekretnina.dataValues.upiti[j].user = korisnik.dataValues.username;
              })
            );
            res.status(200).json(nekretnina);
          });
      });
  } catch (err) {
    console.log("error", error);
  }
});
