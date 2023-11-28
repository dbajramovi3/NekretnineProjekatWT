let SpisakNekretnina = function () {
    //privatni atributi modula
    let listaNekretnina = [];
    let listaKorisnika = [];


    //implementacija metoda
    let init = function (nekretnine, korisnici) {
        //Samo dodjeljujemo nizovima koji su vec zadani u kosturu nekretnine i korisnike
        listaNekretnina = nekretnine;
        listaKorisnika = korisnici;
    }

    let filtrirajNekretnine = function (kriterij) {
        if (Object.keys(kriterij).length === 0) {
            //Object.keys(kriterij.length === 0) samo provjerava da li ima svojstva odnosno ako je === 0, nema ih
            return listaNekretnina;
        }

        return listaNekretnina.filter(nekretnina => {
            // Filtriranje po tipu nekretnine
            if (kriterij.tip_nekretnine && nekretnina.tip_nekretnine !== kriterij.tip_nekretnine) {
                return false;
            }

            // Filtriranje po minimalnoj kvadraturi
            if (kriterij.min_kvadratura && nekretnina.kvadratura < kriterij.min_kvadratura) {
                return false;
            }

            // Filtriranje po maksimalnoj kvadraturi
            if (kriterij.max_kvadratura && nekretnina.kvadratura > kriterij.max_kvadratura) {
                return false;
            }

            // Filtriranje po minimalnoj cijeni
            if (kriterij.min_cijena && nekretnina.cijena < kriterij.min_cijena) {
                return false;
            }

            // Filtriranje po maksimalnoj cijeni
            if (kriterij.max_cijena && nekretnina.cijena > kriterij.max_cijena) {
                return false;
            }

            return true;
        });
    }

    let ucitajDetaljeNekretnine = function (id) {
        for (let i = 0; i < listaNekretnina.length; i++) {
            //Provjera da li je id trenutne nekretnine jednak idu koji je proslieđen kao parametar
            if (listaNekretnina[i].id === id) {
                return listaNekretnina[i];
            }
        }
        return null;
    }


    return {
        init: init,
        filtrirajNekretnine: filtrirajNekretnine,
        ucitajDetaljeNekretnine: ucitajDetaljeNekretnine
    }
};
