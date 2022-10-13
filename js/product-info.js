let getID = localStorage.getItem("productoID");
let catID = localStorage.getItem("catID");
let producto = [];
let productoFotos = [];
let comentarios = [];
let productoRelacionado = [];
let contenedorTarjetas = document.getElementById("contenedorTarjetas");
let infoProducto = document.getElementById("contenidoProducto");
let cuadroComentarios = document.getElementById("contenidoComentarios");
let botonEnviar = document.getElementById("puntajeBtn");
let usuario = localStorage.getItem("correo");
let contenidoRelacionado = document.getElementById("contenedorProductoRelacionado");
let botonComprar = document.getElementById("btnComprar");
const fecha = new Date();
let urlProducto = (PRODUCT_INFO_URL + getID + EXT_TYPE)
let comentariosProducto = (PRODUCT_INFO_COMMENTS_URL + getID + EXT_TYPE)

/* Redireccionar a productos relacionados */

function setCatID(id) {
    localStorage.setItem("productoID", id);
    window.location = "product-info.html"
    console.log(id)
}
/* Agregar un 0 para el numero correspondiente */

function formatoFechaHora(num) {
    return num < 10 ? `0${num}` : num;
}

/* Formato de fecha  */

function fechaActual() {
    let mes = formatoFechaHora(fecha.getMonth() + 1);
    let dia = fecha.getDate();
    let anio = fecha.getFullYear();
    return [anio, mes, dia].join('-');
}

/* Formato de hora */

function horaActual() {
    let minutos = formatoFechaHora(fecha.getMinutes());
    let horas = formatoFechaHora(fecha.getHours());
    let segundos = formatoFechaHora(fecha.getSeconds());
    return [horas, minutos, segundos].join(':');
}

/* Funcion para mostrar los productos */

function mostrarProductos() {
    let nombre = document.getElementById("nombreProducto");
    let precio = document.getElementById("costo");
    let descripcion = document.getElementById("descripcion");
    let categoria = document.getElementById("categoria");
    let vendidos = document.getElementById("cantidadVendidos");

    nombre.innerHTML = producto.name;
    precio.innerHTML = producto.currency + ` ` + producto.cost;
    descripcion.innerHTML = producto.description;
    categoria.innerHTML = producto.category;
    vendidos.innerHTML = producto.soldCount;

    let htmlContentToAppend = "";

    htmlContentToAppend = `
    <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="true">
        <div class="carousel-indicators">
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active"
            aria-current="true" aria-label="Slide 1"></button>
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1"
            aria-label="Slide 2"></button>
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2"
            aria-label="Slide 3"></button>
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="3"
            aria-label="Slide 4"></button>
        </div>
        <div class="carousel-inner">
            <div class="carousel-item active" data-bs-interval="2000">
                <img src=${productoFotos[0]} class="d-block w-100" alt="...">
            </div>
            <div class="carousel-item" data-bs-interval="2000">
                <img src="${productoFotos[1]}" class="d-block w-100" alt="...">
            </div>
            <div class="carousel-item" data-bs-interval="2000">
                <img src="${productoFotos[2]}" class="d-block w-100" alt="...">
            </div>
            <div class="carousel-item" data-bs-interval="2000">
                <img src="${productoFotos[3]}" class="d-block w-100" alt="...">
            </div>
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators"
        data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators"
        data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
        </button>
    </div>
    `;
    document.getElementById("divCarrusel").innerHTML = htmlContentToAppend;

}

/* Funcion para desplegar productos relacionados */

function productosRelacionados() {
    let htmlContentToAppend = "";
    for (let i = 0; i < productoRelacionado.length; i++) {
        let relacionado = productoRelacionado[i];

        htmlContentToAppend = `
        <div onclick="setCatID(${relacionado.id})" class="cursor-active"  style=width:200px>
        <img src="${relacionado.image}"  style=width:200px>
        <p>${relacionado.name}</p>
        </div>
        
        `;
        contenidoRelacionado.innerHTML += htmlContentToAppend;
    }
}
/* Funcion para dibujar las estrellas segun el score correspondiente */

function estrella(num) {
    let estrellaLlena = `<span class="bi bi-star-fill"></span>`;
    let estrellaVacia = `<span class="bi bi-star"></span>`

    if (num == 1) {
        return estrellaLlena.repeat(num) + estrellaVacia.repeat(4);
    } else if (num == 2) {
        return estrellaLlena.repeat(num) + estrellaVacia.repeat(3);
    } else if (num == 3) {
        return estrellaLlena.repeat(num) + estrellaVacia.repeat(2);
    } else if (num == 4) {
        return estrellaLlena.repeat(num) + estrellaVacia.repeat(1);
    } else {
        return estrellaLlena.repeat(num);
    }
}

/* Funcion para mostrar los comentarios de los productos */

function mostrarComentarios() {
    let htmlContentToAppend = "";
    for (let i = 0; i < comentarios.length; i++) {
        let item = comentarios[i];

        htmlContentToAppend = `      
        
        
        <div class="card shadow p-3 mb-5 bg-body rounded border-dark" style="width: 18rem;">
        <h5 class="card-header fw-semibold text">${item.user}</h5>
        <div class="card-body">
        <p class="card-text">${item.description}</p>
        <p class="card-text">${estrella(item.score)}</p>
        <p class="card-text">${item.dateTime}</p>
        </div>
        </div>
        `;

        contenedorTarjetas.innerHTML += htmlContentToAppend;
    }
}

/* Funcion para agregar item al carrito */

function addItemToCart() {

    let canasta = [];
    canasta.push(producto)

    if (!localStorage.getItem("cart")) {
        localStorage.setItem("cart", JSON.stringify(canasta));
    } else {
        let nuevoItem = JSON.parse(localStorage.getItem("cart"));
        nuevoItem.push(producto);
        localStorage.setItem("cart", JSON.stringify(nuevoItem));
    }
}

/* Alerta de compra exitosa */

function compraExitosa() {
    const alertPlaceholder = document.getElementById('liveAlertPlaceholder')

    const alert = (message, type) => {
        const wrapper = document.createElement('div')
        wrapper.innerHTML = [
            `<div class="alert alert-${type} alert-dismissible mt-4" role="alert">`,
            `   <div>${message}</div>`,
            '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
            '</div>'
        ].join('')

        alertPlaceholder.append(wrapper)
    }

    const alertTrigger = document.getElementById('btnComprar')
    if (alertTrigger) {
        alertTrigger.addEventListener('click', () => {
            alert('¡Producto agregado al <a href="cart.html" class="alert-link">carrito</a> correctamente!', 'success')
        })
    }

}

document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(urlProducto).then(function (resultObj) {
        if (resultObj.status === "ok") {
            producto = resultObj.data
            productoFotos = resultObj.data.images
            productoRelacionado = resultObj.data.relatedProducts
            mostrarProductos()
            productosRelacionados()
        }
    });
    getJSONData(comentariosProducto).then(function (comentariosObj) {
        if (comentariosObj.status === "ok") {
            comentarios = comentariosObj.data
            mostrarComentarios()
        }
    });

    /* Funcion para agregar comentarios nuevos en los productos */

    botonEnviar.addEventListener("click", function () {
        let comentarioUsuario = document.getElementById("comentarioNuevo").value;
        let rating = document.getElementById("puntaje").value;

        document.getElementById("comentarioNuevoCarrusel").innerHTML += `      
        
        <div class="card shadow p-3 mb-5 bg-body rounded " style="width: 18rem;">
        <div class="card-body">
        <h5 class="card-title fw-bold" >${usuario}</h5>
        <p class="card-text">${comentarioUsuario}</p>
        <p class="card-text">${estrella(rating)}</p>
        <p class="card-text">${fechaActual()} ${horaActual()}</p>
            </div>
            </div>
            `;

        document.getElementById("comentarioNuevo").value = "";
        document.getElementById("puntaje").value = "1";
    });
    botonComprar.addEventListener("click", addItemToCart)
    compraExitosa()
})