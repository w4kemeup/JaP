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
let metodoPago = document.getElementById("metodoPago");
let metodoSeleccionado = document.getElementById("metodoSeleccionado");
let metodoPremium = document.getElementById("premium");
let metodoExpress = document.getElementById("express");
let metodoStandard = document.getElementById("standard");
let numeroTarjeta = document.getElementById("numeroTarjeta")
let codigoSeguridad = document.getElementById("codigoSeguridad")
let vencimientoTarjeta = document.getElementById("vencimientoTarjeta")
let numeroCuenta = document.getElementById("numeroCuenta")
const dolares = 'USD';
let nuevoSubtotal = 0;
let nuevoCostoEnvio = 0;

function setCatID(id) {
    localStorage.setItem("productoID", id);
    window.location = "product-info.html"
}

// Remover item de carrito //

function removeItem(getID) {
    let filtrados = cart.filter(function (el) {
        return el.id != getID;
    });
    localStorage.setItem("cart", JSON.stringify(filtrados));
    location.reload();
}

// Convertir pesos uruguayos a dolares // 

function convertirDolares(currency, cost) {
    let conversion;
    if (currency !== dolares) {
        currency = dolares;
        conversion = Math.round(cost / 42);
        return currency + ` ` + conversion
    } else {
        return currency + ` ` + cost;
    }
}

// Agregar items deseados al carrito de compras //

function mostrarCarritoDeCompras() {
    let htmlContentToAppend = "";

    for (let i = 0; i < cart.length; i++) {
        let item = cart[i];

        htmlContentToAppend += `

            <tr>
                <td class="col-1"><img class="ms-3" src="${item.images[0]}"style=width:50px></img></td>
                <td onclick="setCatID(${item.id})" class="cursor-active">${item.name}</td>
                <td> ${convertirDolares(item.currency, item.cost)}</td>
                <td><input type="number" id="cantidad_${item.id}"class="form-control cantidadItemAgregado " onchange="actualizarPrecio(${item.id}, '${item.currency}', ${item.cost})" value="1" min="1"></td>
                <td id="costo_${item.id}" class="subtotalProductoAgregado fw-bold">${convertirDolares(item.currency, item.cost)}</td>
                <td><button type="button" class="btn btn-outline-danger"><span class="bi bi-trash-fill" onclick="removeItem(${item.id})"></td>
            </tr>`;

    }
    tbody.innerHTML += htmlContentToAppend;
}

// Actualizar precios en TABLA //

function actualizarPrecio(id, currency, precio) {
    let quantity = parseInt(document.getElementById(`cantidad_${id}`).value);
    let subtotal = document.getElementById(`costo_${id}`);

    if (currency !== dolares) {
        let resultadoConvertido = quantity * Math.round(precio / 42);
        subtotal.innerHTML = dolares + ` ` + resultadoConvertido;

    } else {
        let resultadoNormal = quantity * precio;
        subtotal.innerHTML = currency + ` ` + resultadoNormal;
    }

    calcularSubtotal()
    mostrarTotal()
}

// Calcular precios en SUBTOTAL //

function calcularSubtotal() {
    let sumatoriaPrecios = cart.reduce((acumulador, item) => {
        let quantity = parseInt(document.getElementById(`cantidad_${item.id}`).value);
        if (item.currency === dolares) {
            return acumulador + (item.cost * quantity);
        } else {
            return acumulador + (quantity * Math.round(item.cost / 42));
        }
    }, 0)
    nuevoSubtotal = sumatoriaPrecios;
    mostrarSubtotal();
    calcularCostoEnvio();
}

// Agregar escuchas de evento segun tipo de envio seleccionado //

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

// Calcular costo de envio //

function calcularCostoEnvio() {
    let inputs = document.querySelectorAll(".controlTipoEnvio");
    let metodoEnvio;

    inputs.forEach(input => {
        if (input.checked) {
            metodoEnvio = input
        }
    })
    nuevoCostoEnvio = Math.round(metodoEnvio.value * nuevoSubtotal);
    mostrarCostoEnvio();
}

// Compra exitosa //

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

// Deshabilitar los inputs segun opcion de pago deseada  y desplegar la opcion de pago deseada //

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

// Modal no valido //

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

// Mostrar Subtotal //

function mostrarSubtotal() {
    subtotalUnitario.innerHTML = dolares + ` ` + nuevoSubtotal;
}

// Mostrar Costo de envio //

function mostrarCostoEnvio() {
    costoEnvio.innerHTML = dolares + ` ` + nuevoCostoEnvio;
}

// Mostrar Total //

function mostrarTotal() {
    precioTotal.innerHTML = dolares + ` ` + (nuevoCostoEnvio + nuevoSubtotal);
}

document.addEventListener("DOMContentLoaded", function () {
    if (usuario != null) {
        mostrarCarritoDeCompras()
        agregarListenersTipoEnvio()
        calcularSubtotal()
        mostrarTotal()
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
}) 
