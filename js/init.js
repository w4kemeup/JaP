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
let usuarioLogIn = localStorage.getItem("correo");
let cerrarSesion = document.getElementById("signoutBtn");
let carroCantidad = JSON.parse(localStorage.getItem("cart"));


/* Cerrar sesion */

document.addEventListener("DOMContentLoaded", function () {
  cerrarSesion.addEventListener("click", function () {
    localStorage.removeItem("correo");
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

// Mostrar usuario en el dropdown del navbar //

document.getElementById("dropdownMenuButton2").innerHTML = usuarioLogIn;

function alertarInicioSesion() {
  if (!usuarioLogIn) {
    alertaPerfil.style.visibility = "visible";
    redirect.removeAttribute("href");
  } else {
    alertaPerfil.style.visibility = "hidden";
  }
}
