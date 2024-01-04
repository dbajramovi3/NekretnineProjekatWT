const express = require('express');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const session = require('express-session');
const bcrypt = require('bcrypt')

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname + "/public/html")));
app.use(express.static(path.join(__dirname + "/public/css")));
app.use(express.static(path.join(__dirname + "/public/scripts")));
app.use(express.static(path.join(__dirname + "/public/assets")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
  secret: 'tajna_rjec',
  resave: false,
  saveUninitialized: true
}));

const pathNekretnine = './data/nekretnine.json';
const pathKorisnici = './data/korisnici.json';
const korisnici = require("./data/korisnici.json");
const nekretnine = require("./data/nekretnine.json");


//LOGIN RUTA
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const korisnik = korisnici.find((kor) => kor.username === username);

    if (korisnik) {
      // Dodaj ovde console.log() za proveru korisnika
      console.log("Pronađen korisnik:", korisnik);

      const isPasswordValid = await bcrypt.compare(password, korisnik.password);

      if (isPasswordValid) {
        req.session.korisnik = korisnik;
        console.log("Uspješna prijava");
        return res.status(200).json({ poruka: 'Uspješna prijava' });
      } else {
        console.log("Neuspješna prijava - neispravna lozinka");
        return res.status(401).json({ greska: 'Neuspješna prijava' });
      }
    } else {
      console.log("Neuspješna prijava - korisnik nije pronađen");
      return res.status(401).json({ greska: 'Neuspješna prijava' });
    }
  } catch (err) {
    console.error('Greška prilikom prijave:', err);
    return res.status(500).json({ greska: 'Greška prilikom prijave' });
  }
});
//LOGIN RUTA

//LOGOUT RUTA
app.post('/logout', (req, res) => {
  if (req.session.korisnik) {
    req.session.destroy((err) => {
      if (err) {
        console.error('Greška prilikom odjave:', err);
        res.status(500).json({ greska: 'Greška prilikom odjave' });
      } else {
        res.status(200).json({ poruka: 'Uspješno ste se odjavili' });
      }
    });
  } else {
    res.status(401).json({ greska: 'Neautorizovan pristup' });
  }
});
//LOGOUT RUTA

//KORISNIK RUTA
app.get('/korisnik', (req, res) => {
  if (req.session.korisnik) {
    res.status(200).json(req.session.korisnik);
  } else {
    res.status(401).json({ greska: 'Neautorizovan pristup' });
  }
});
//KORISNIK RUTA

//UPIT RUTA
app.post("/upit", (req, res) => {
  if (req.session.korisnik) {
    const { nekretnina_id, tekst_upita } = req.body;
    const i = nekretnine.findIndex(
      (nekretnina) => nekretnina.id === parseInt(nekretnina_id)
    );
    if (i === -1) {
      res.status(400).json({
        poruka: `Nekretnina sa id-em ${nekretnina_id} ne postoji`,
      });
    } else {
      nekretnine[i].upiti.push({
        korisnik_id: req.session.korisnik.id,
        tekst_upita,
      });

      fs.writeFile(pathNekretnine, JSON.stringify(nekretnine), "utf8", (err) => {
        if (err) {
          console.error("Error:", err);
          return;
        }

        console.log("JSON radi.");
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
app.put("/korisnik", (req, res) => {
  if (req.session.korisnik) {
    const { ime, prezime, username, password } = req.body;
    const korisnikId = req.session.korisnik.id;

    fs.readFile(pathKorisnici, "utf8", (err, data) => {
      if (err) {
        console.error("Greška prilikom čitanja korisnici.json:", err);
        res.status(500).json({ greska: "Greška prilikom čitanja korisnici.json" });
        return;
      }

      let korisnici = JSON.parse(data);
      const index = korisnici.findIndex((kor) => kor.id === korisnikId);

      if (index !== -1) {
        // Ako se neko svojstvo nalazi u tijelu zahtjeva, ažuriraj ga
        if (ime) korisnici[index].ime = ime;
        if (prezime) korisnici[index].prezime = prezime;
        if (username) korisnici[index].username = username;

        if (password) {
          // Hashiranje nove lozinke prije ažuriranja
          bcrypt.hash(password, 10, (err, hash) => {
            if (err) {
              console.error("Error hashing the password:", err);
              res.status(500).json({ greska: "Greška prilikom hashiranja lozinke" });
              return;
            }

            korisnici[index].password = hash;

            fs.writeFile(pathKorisnici, JSON.stringify(korisnici), "utf8", (err) => {
              if (err) {
                console.error("Greška prilikom pisanja u korisnici.json:", err);
                res.status(500).json({ greska: "Greška prilikom ažuriranja korisničkih podataka" });
                return;
              }

              req.session.korisnik = korisnici[index]; // Ažuriraj podatke u sesiji

              res.status(200).json({ poruka: "Podaci su uspješno ažurirani" });
            });
          });
        } else {
          fs.writeFile(korisniciPath, JSON.stringify(korisnici), "utf8", (err) => {
            if (err) {
              console.error("Greška prilikom pisanja u korisnici.json:", err);
              res.status(500).json({ greska: "Greška prilikom ažuriranja korisničkih podataka" });
              return;
            }

            req.session.korisnik = korisnici[index]; // Ažuriraj podatke u sesiji

            res.status(200).json({ poruka: "Podaci su uspješno ažurirani" });
          });
        }
      } else {
        res.status(500).json({ greska: "Korisnik nije pronađen" });
      }
    });
  } else {
    res.status(401).json({ greska: "Neautorizovan pristup" });
  }
});
//KORISNIK RUTA

//NEKRETNINE RUTA
app.get("/nekretnine", (req, res) => {
  res.status(200).json(nekretnine);
});
//NEKRETNINE RUTA

bcrypt.hash("12", 10, function(err, hash) {
      // hash šifre imate ovdje
  console.log("password: ", hash);
  });
  
  

app.listen(port, () => {
  console.log(`Server radi na http://localhost:${port}`);
});
