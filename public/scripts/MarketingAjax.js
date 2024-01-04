const MarketingAjax = (() => {
  let noveNekretninePodaci = { nizNekretnina: [] };
  let filtriraneNekretnine = [];
  function isObjectEmpty(objText) {
    const obj = JSON.parse(objText);
    return Object.keys(obj).length === 0 && obj.constructor === Object;
  }

  function impl_osvjeziPretrage(divNekretnine = null) {
    var ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function () {
      if (ajax.readyState == 4 && ajax.status == 200) {
        if (!isObjectEmpty(ajax.responseText)) {
          filtriraneNekretnine = JSON.parse(ajax.responseText);
        }
        filtriraneNekretnine.nizNekretnina?.forEach((item) => {
          const trazeni = document.getElementById(`pretrage-${item.id}`);
          if (trazeni) {
            trazeni.textContent = item.pretrage;
          }
        });
      }
    };
    ajax.open("POST", "http://localhost:3000/marketing/osvjezi", true);
    ajax.setRequestHeader("Content-Type", "application/json");
    ajax.send(JSON.stringify({ noveNekretnine: noveNekretninePodaci }));
  }

  function impl_osvjeziKlikove(divNekretnine = null) {
    var ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function () {
      if (ajax.readyState == 4 && ajax.status == 200) {
        if (!isObjectEmpty(ajax.responseText)) {
          filtriraneNekretnine = JSON.parse(ajax.responseText);
        }
        filtriraneNekretnine.nizNekretnina?.forEach((item) => {
          const trazeni = document.getElementById(`klikovi-${item.id}`);
          if (trazeni) {
            trazeni.textContent = item.klikovi;
          }
        });
      }
    };
    ajax.open("POST", "http://localhost:3000/marketing/osvjezi", true);
    ajax.setRequestHeader("Content-Type", "application/json");
    ajax.send(JSON.stringify({ noveNekretnine: noveNekretninePodaci }));
  }

  function impl_novoFiltriranje(listaFiltriranihNekretnina) {
    const idijeviNekretnina = listaFiltriranihNekretnina.map((el) => el.id);
    var ajax = new XMLHttpRequest();
    idijeviNekretnina.forEach((id) => {
      noveNekretninePodaci.nizNekretnina.push(id);
    });
    ajax.open("POST", "http://localhost:3000/marketing/nekretnine", true);
    ajax.setRequestHeader("Content-Type", "application/json");
    ajax.send(JSON.stringify({ nizNekretnina: idijeviNekretnina }));
  }

  function impl_klikNekretnina(idNekretnine) {
    var ajax = new XMLHttpRequest();
    noveNekretninePodaci.nizNekretnina.push(idNekretnine);
    ajax.open(
      "POST",
      "http://localhost:3000/marketing/nekretnine/" + idNekretnine,
      true
    );
    ajax.send({});
  }

  return {
    osvjeziPretrage: impl_osvjeziPretrage,
    osvjeziKlikove: impl_osvjeziKlikove,
    novoFiltriranje: impl_novoFiltriranje,
    klikNekretnina: impl_klikNekretnina,
  };
})();
