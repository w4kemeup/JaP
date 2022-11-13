const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/";
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/";
const PRODUCT_INFO_COMMENTS_URL = "https://japceibal.github.io/emercado-api/products_comments/";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const EXT_TYPE = ".json";
let alertaPerfil = document.getElementById("alertaSesion");
let redirect = document.getElementById("linkPerfil");

/* Cerrar sesion */

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("signoutBtn").addEventListener("click", function () {
    localStorage.removeItem("correo");
    localStorage.removeItem("usuario");
    window.location = "index.html"
  })
  document.querySelectorAll('[data-bs-toggle="tooltip"]')
    .forEach(tooltip => {
      new bootstrap.Tooltip(tooltip)
    })
  alertarInicioSesion()
});

let showSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "block";
}

let hideSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "none";
}

let getJSONData = function (url) {
  let result = {};
  showSpinner();
  return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw Error(response.statusText);
      }
    })
    .then(function (response) {
      result.status = 'ok';
      result.data = response;
      hideSpinner();
      return result;
    })
    .catch(function (error) {
      result.status = 'error';
      result.data = error;
      hideSpinner();
      return result;
    });
}

/* obtengo la key almacenada con el valor del usuario, y lo muestro en un parrafo vacio con la id correspondiente para verlo en todas las paginas */

document.getElementById("dropdownMenuButton2").innerHTML = localStorage.getItem("correo");

function alertarInicioSesion() {
  if (!localStorage.getItem("correo")) {
    alertaPerfil.style.visibility = "visible";
    redirect.removeAttribute("href");
  } else {
    alertaPerfil.style.visibility = "hidden";
  }
}
