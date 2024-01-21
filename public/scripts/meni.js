document.addEventListener("DOMContentLoaded", function () {


  const loginButton = document.getElementById("loginButton");
  const logoutButton = document.getElementById("logoutButton");

  // Provjera da li je korisnik prijavljen
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  const profileLink = document.querySelector("a[href='profil.html']");

  if (isLoggedIn) {
    // Korisnik je prijavljen, prikaži dugme "Odjava" i opciju "Profil
    if (loginButton) loginButton.style.display = "none";
    if (logoutButton) logoutButton.style.display = "block";
    if (profileLink) profileLink.style.display = "block";
  } else {
    // Korisnik nije prijavljen, prikaži dugme "Prijava" i sakrij opciju "Profil"
    if (loginButton) loginButton.style.display = "block";
    if (logoutButton) logoutButton.style.display = "none";
    if (profileLink) profileLink.style.display = "none";
  }

  // Dodaj event listener za dugme "Odjava"
  logoutButton.addEventListener("click", function () {

    // Postavi stanje prijave na false
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user");
    // Preusmjeri korisnika na prijavu
    window.parent.location.href =
      window.parent.location.origin + "/prijava.html";
  });

  // Postavi event listenere za meni linkove u iframe-u
  const menuFrame = document.getElementById("menuFrame");
  if (menuFrame) {
    menuFrame.addEventListener("load", function () {

      const menuLinks = menuFrame.contentDocument.querySelectorAll("a");

      menuLinks.forEach(function (link) {
        link.addEventListener("click", function (event) {
          event.preventDefault();
          window.location.href = event.target.href;
        });
      });
    });
  }
});
