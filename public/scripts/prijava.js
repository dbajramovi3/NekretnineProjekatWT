function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  clearError();
  console.log("username: " + username + " password: " + password);
  PoziviAjax.postLogin(username, password, (error, data) => {
    console.log("postLogin callback:", error, data);
    if (error) {
      console.log(error);
      displayError(error);
    } else {
      localStorage.setItem("isLoggedIn", "true");
      window.location.href = "/profil.html";
    }
  });
}




//koristi alert
//pozivi ajax
//to isto uraditi na svakoj html stranici
  function clearError() {
    const errorDiv = document.getElementById("error");
    while (errorDiv.firstChild) {
      errorDiv.removeChild(errorDiv.firstChild);
    }
  }

  function displayError(errorMessage) {
    const errorDiv = document.getElementById("error");
  
    // Brisanje prethodnih poruka o grešci
    while (errorDiv.firstChild) {
      errorDiv.removeChild(errorDiv.firstChild);
    }
  
    // Stvaranje novog elementa za prikazivanje teksta greške
    const errorContainer = document.createElement("div");
    errorContainer.className = "error-message";
    errorContainer.textContent = errorMessage.greska || errorMessage;
  
    errorContainer.style.color = "red";
    errorContainer.style.marginTop = "10px";
  
    // Dodavanje kreiranog elementa u div za prikaz greške
    errorDiv.appendChild(errorContainer);
    
  }