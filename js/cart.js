let carrito = [];
let imagen = document.getElementById("fotoProducto");
let nombre = document.getElementById("nombreProducto");
let costo = document.getElementById("costoProducto");
let subtotal = document.getElementById("subtotalProdcuto");

function carritoDeCompras() {

    let fotoProducto = `<img src="${carrito.articles[0].image}" style=width:50px></img>`
    let nombreProducto = carrito.articles[0].name;
    let moneda = carrito.articles[0].currency;
    let costoProducto = carrito.articles[0].unitCost;
    let cantidad = document.getElementById("cantidadProducto").value;

    imagen.innerHTML = fotoProducto;
    nombre.innerHTML = nombreProducto;
    costo.innerHTML = moneda + ` ` + costoProducto;
    subtotal.innerHTML = moneda + ` ` + (costoProducto * cantidad);

}

function updatePrice() {
    let quantity = document.getElementById("cantidadProducto").value;
    let productCost = carrito.articles[0].unitCost;
    let currency = carrito.articles[0].currency;
    subtotal.innerHTML = currency + ` ` + (productCost * quantity);
}

document.addEventListener("DOMContentLoaded", function () {
    getJSONData(CART_INFO_URL + 25801 + EXT_TYPE).then(function (resultObj) {
        if (resultObj.status === "ok") {
            carrito = resultObj.data
            console.log(carrito);
            carritoDeCompras()
        }
    })
    let cantidad = document.getElementById("cantidadProducto");
    cantidad.addEventListener("change", updatePrice)
})
