let getID = localStorage.getItem("productoID");
let cart = JSON.parse(localStorage.getItem("cart"));
let tbody = document.getElementById("testRow");
let productoFetch = [];
let carritoDefecto = (CART_INFO_URL + 25801 + EXT_TYPE);
let usuario = localStorage.getItem("correo");

function setCatID(id) {
    localStorage.setItem("productoID", id);
    window.location = "product-info.html"
}

// Funcion para dibujar en pantalla el producto original del carrito //

function carritoDeCompras() {

    let fotoProducto = `<img class="ms-3" src="${productoFetch.articles[0].image}" style=width:50px></img>`
    let nombreProducto = productoFetch.articles[0].name;
    let moneda = productoFetch.articles[0].currency;
    let costoProducto = productoFetch.articles[0].unitCost;
    let subtotal = moneda + ` ` + costoProducto;
    let id = productoFetch.articles[0].id;

    let htmlContentToAppend = "";
    htmlContentToAppend += `
              <tr id="rowFetch">
                  <td scope="col">${fotoProducto}</td>
                  <td scope="col" onclick="setCatID(${id})" class="cursor-active">${nombreProducto}</td>
                  <td scope="col">${moneda} ${costoProducto}</td>
                  <td scope="col"><input type="number" class="form-control" id="cantidadProducto" onchange="priceFetch()" value="1" min="1"></td>
                  <td scope="col" class="fw-bold" id="subtotalProducto">${subtotal}</td>
                  <td scope="col" ><span class="bi bi-cart-x-fill" onclick="removerProductoFetch()"></span></td>
              </tr>`;


    tbody.innerHTML += htmlContentToAppend;

}

// Funcion para remover item de carrito //

function removeItem(getID) {
    let filtrados = cart.filter(function (el) {
        return el.id != getID;
    });
    localStorage.setItem("cart", JSON.stringify(filtrados));
    location.reload();
}

// Funcion remover el producto del fetch del carrito //

function removerProductoFetch() {
    document.getElementById("rowFetch").style.visibility = "hidden";
}

// Funcion actualizar precio del producto del fetch //

function priceFetch() {
    let subtotal = document.getElementById("subtotalProducto");
    let quantity = document.getElementById("cantidadProducto").value;
    let productCost = productoFetch.articles[0].unitCost;
    let currency = productoFetch.articles[0].currency;
    subtotal.innerHTML = currency + ` ` + (productCost * quantity);
}

// Funcion para agregar items deseados al carrito de compras //

function itemsAgregados() {

    let htmlContentToAppend = "";

    for (let i = 0; i < cart.length; i++) {
        let item = cart[i];

        htmlContentToAppend += `
            <tr>
                <td class="col-1"><img class="ms-3" src="${item.images[0]}"style=width:50px></img></td>
                <td onclick="setCatID(${item.id})" class="cursor-active">${item.name}</td>
                <td>${item.currency} ${item.cost}</td>
                <td><input type="number" id="${item.id}"class="form-control cantidadItemAgregado " onchange="updatePrice(${item.id}, '${item.currency}', ${item.cost})" value="1" min="1"></td>
                <td id="${item.cost}" class="subtotalProductoAgregado fw-bold">${item.currency} ${item.cost}</td>
                <td><span class="bi bi-cart-x-fill" onclick="removeItem(${item.id})"></span></td>
            </tr>`;
    }
    tbody.innerHTML += htmlContentToAppend;
}

// Function para actualizar precios //

function updatePrice(id, currency, precio) {

    let quantity = parseInt(document.getElementById(id).value);
    let subtotal = document.getElementById(precio);
    let resultado = quantity * precio;

    subtotal.innerHTML = currency + ` ` + resultado;

    return resultado;
}


document.addEventListener("DOMContentLoaded", function () {
    if (usuario != null) {
        getJSONData(carritoDefecto).then(function (resultObj) {
            if (resultObj.status === "ok") {
                productoFetch = resultObj.data
                carritoDeCompras()
                itemsAgregados()
            }
        });
    } else {
        alert("debe iniciar sesion")
        window.location = "index.html"
    }
})