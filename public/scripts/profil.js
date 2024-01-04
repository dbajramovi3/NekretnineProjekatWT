PoziviAjax.getKorisnik(handleKorisnik);

function handleKorisnik(error, data) {
  if (error) {
    console.log("Error glasi: " + error);
  } else {
    const atributi = ["ime", "prezime", "username", "password"];
    data = JSON.parse(data);
    postaviAtribute(atributi, data);
  }
}

function postaviAtribute(atributi, data) {
  atributi.forEach((atribut) => {
    document.getElementById(atribut).value = data[atribut];
  });
}


