document.addEventListener("DOMContentLoaded", function () {
  console.log("DOMContentLoaded");

  const loginButton = document.getElementById("loginButton");
  const logoutButton = document.getElementById("logoutButton");

  // Provjera da li je korisnik prijavljen
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  console.log("isLoggedIn:", isLoggedIn);
  const profileLink = document.querySelector("a[href='profil.html']");

  if (isLoggedIn) {
    // Korisnik je prijavljen, prikaži dugme "Odjava" i opciju "Profil"
    console.log("Prikazuje se dugme za odjavu i opcija za profil");
    if (loginButton) loginButton.style.display = "none";
    if (logoutButton) logoutButton.style.display = "block";
    if (profileLink) profileLink.style.display = "block";
  } else {
    // Korisnik nije prijavljen, prikaži dugme "Prijava" i sakrij opciju "Profil"
    console.log("Prikazuje se dugme za prijavu, opcija za profil se sakriva");
    if (loginButton) loginButton.style.display = "block";
    if (logoutButton) logoutButton.style.display = "none";
    if (profileLink) profileLink.style.display = "none";
  }

  // Dodaj event listener za dugme "Odjava"
  logoutButton.addEventListener("click", function () {
    console.log("Kliknuto na dugme Odjava");

    // Postavi stanje prijave na false
    localStorage.removeItem("isLoggedIn");

    // Preusmjeri korisnika na prijavu
    console.log("Redirekcija na prijavu");
    window.parent.location.href =
      window.parent.location.origin + "/prijava.html";
  });

  // Postavi event listenere za meni linkove u iframe-u
  const menuFrame = document.getElementById("menuFrame");
  if (menuFrame) {
    menuFrame.addEventListener("load", function () {
      console.log("IFrame je učitan");

      const menuLinks = menuFrame.contentDocument.querySelectorAll("a");
      console.log("Broj linkova u IFrame-u:", menuLinks.length);

      menuLinks.forEach(function (link) {
        link.addEventListener("click", function (event) {
          event.preventDefault();
          console.log(
            "Kliknuto na link u IFrame-u. Preusmjeravanje na:",
            event.target.href
          );
          window.location.href = event.target.href;
        });
      });
    });
  }
});
