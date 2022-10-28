let getID = localStorage.getItem("productoID");
let cart = JSON.parse(localStorage.getItem("cart"));
let tbody = document.getElementById("testRow");
let productoFetch = [];
let carritoDefecto = (CART_INFO_URL + 25801 + EXT_TYPE);
let usuario = localStorage.getItem("correo");
let btnComprar = document.getElementById("finalizarCompra");
let form = document.getElementById("formularioComprar");
let subtotalUnitario = document.getElementById("subtotal");
let costoEnvio = document.getElementById("costoEnvio");
let precioTotal = document.getElementById("precioTotal");
let metodoTarjeta = document.getElementById("tarjeta");
let metodoBanco = document.getElementById("banco");
let subtotal = 0;
let envio;
let metodoPago = document.getElementById("metodoPago");
let metodoSeleccionado = document.getElementById("metodoSeleccionado");
let precioSubtotal;

let metodoPremium = document.getElementById("premium");
let metodoExpress = document.getElementById("express");
let metodoStandard = document.getElementById("standard");

let numeroTarjeta = document.getElementById("numeroTarjeta")
let codigoSeguridad = document.getElementById("codigoSeguridad")
let vencimientoTarjeta = document.getElementById("vencimientoTarjeta")
let numeroCuenta = document.getElementById("numeroCuenta")

let totalEnvio = 0;

function setCatID(id) {
    localStorage.setItem("productoID", id);
    window.location = "product-info.html"
}

// Funcion para remover item de carrito //

function removeItem(getID) {
    let filtrados = cart.filter(function (el) {
        return el.id != getID;
    });
    localStorage.setItem("cart", JSON.stringify(filtrados));
    location.reload();
}

// Funcion para agregar items deseados al carrito de compras //

function agregarItems() {

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
                <td><button type="button" class="btn btn-outline-danger"><span class="bi bi-trash-fill" onclick="removeItem(${item.id})"></td>
            </tr>`;
    }
    tbody.innerHTML += htmlContentToAppend;
}

// Funcion para actualizar precios en TABLA //

function updatePrice(id, currency, precio) {

    let quantity = parseInt(document.getElementById(id).value);
    let subtotal = document.getElementById(precio);
    let resultado = quantity * precio;
    subtotal.innerHTML = currency + ` ` + resultado;
    calcularSubtotal()
    mostrarTotal()
}

// Funcion para calcular precios en SUBTOTAL //

function calcularSubtotal() {

    cart.forEach((item => {
        subtotal += item.cost
        subtotalUnitario.innerHTML = `USD` + ` ` + subtotal;
    }))
}

// Funcion para calcular costo de ENVIO y TOTAL //

function agregarListenersTipoEnvio() {

    let inputs = document.querySelectorAll(".controlTipoEnvio");

    inputs.forEach(input => {
        input.addEventListener("click", function () {
            calcularCostoEnvio()
            mostrarCostoEnvio()
            mostrarTotal()
        })
    })
}


function calcularCostoEnvio() {
    let inputs = document.querySelectorAll(".controlTipoEnvio");
    let metodoEnvio;

    inputs.forEach(input => {
        if (input.checked) {
            metodoEnvio = input
        }
    })
    totalEnvio = metodoEnvio.value * subtotal
}

// Funcion compra exitosa //

function compraExitosa() {

    let alerta = document.getElementById('liveAlertPlaceholder');

    htmlContentToAppend = "";
    htmlContentToAppend = `
    <div class="alert alert-success alert-dismissible fade show" role="alert">
        ¡Has comprado con éxito!
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
    `;
    alerta.innerHTML = htmlContentToAppend;
}

// Funcion para deshabilitar los inputs segun opcion de pago deseada  y desplegar la opcion de pago deseada //

function disableInputs() {

    let inputTarjeta = document.querySelectorAll(".metodo1");
    let inputBanco = document.querySelectorAll(".metodo2");

    if (metodoBanco.checked) {
        inputTarjeta.forEach(input => {
            input.disabled = true;
        })
        inputBanco.forEach(input => {
            input.disabled = !true;
        })
        metodoSeleccionado.innerHTML = `Transferencia bancaria`;
    } else if (metodoTarjeta.checked) {
        inputBanco.forEach(input => {
            input.disabled = true;
        })
        inputTarjeta.forEach(input => {
            input.disabled = !true;
        })
        metodoSeleccionado.innerHTML = `Tarjeta de crédito`;
    }
}

function errorModal() {

    let inputsModal = document.querySelectorAll(".inputModal");

    if ((!metodoTarjeta.checked) && (!metodoBanco.checked)) {
        metodoSeleccionado.classList.add("is-invalid")
        inputsModal.forEach(input => {
            input.classList.add("is-invalid");
        })

    } else if ((metodoTarjeta.checked) || (metodoBanco.checked)) {
        metodoSeleccionado.classList.remove("is-invalid", "error-compra")
        inputsModal.forEach(input => {
            input.classList.remove("is-invalid");
        })
    }
}

function mostrarCostoEnvio() {
    costoEnvio.innerHTML = `USD` + ` ` + Math.round(totalEnvio);
}


function mostrarTotal() {
    precioTotal.innerHTML = `USD` + ` ` + (Math.round(totalEnvio) + subtotal);
}

document.addEventListener("DOMContentLoaded", function () {
    if (usuario != null) {
        agregarItems()
        calcularSubtotal()
    } else {
        alert("debe iniciar sesion")
        window.location = "index.html"
    };

    form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
            errorModal();
            event.preventDefault()
            event.stopPropagation()
        }
        form.classList.add('was-validated')
        if (form.checkValidity()) {
            event.preventDefault()
            compraExitosa()
        }
    });

    metodoBanco.addEventListener("click", disableInputs)

    metodoTarjeta.addEventListener("click", disableInputs)

    agregarListenersTipoEnvio()
    calcularCostoEnvio()
    mostrarCostoEnvio()
    mostrarTotal()
}) 
