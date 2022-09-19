let getID = localStorage.getItem("productoID");
let producto = [];
let productoFotos = [];
let comentarios = [];
let infoProducto = document.getElementById("contenidoProducto");
let cuadroComentarios = document.getElementById("contenidoComentarios");
let botonEnviar = document.getElementById("puntajeBtn");
let usuario = localStorage.getItem("correo");
const fecha = new Date();

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

    let row = "";
    row = `
       <h1>${producto.name}</h1><br><hr>
       
       <strong>Precio</strong><br>${producto.currency} ${producto.cost}
      
        <br><strong>Descripción</strong><br>${producto.description}
        
        <br><strong>Categoría</strong><br>${producto.category}
        
        <td><br><strong>Productos Relacionados</strong><br>${producto.relatedProducts[0].name}
       
        <br><strong>Cantidad de vendidos</strong><br>${producto.soldCount}
       
        <br><strong>Imágenes ilustrativas</strong><br><br>
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
    infoProducto.innerHTML += row;
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
        <tr>
        <td><strong>${item.user}</strong> - ${item.dateTime} - ${estrella(item.score)}<br>
        ${item.description}</td>
        </tr> 
        `;
        cuadroComentarios.innerHTML += htmlContentToAppend;
    }
}

document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCT_INFO_URL + getID + EXT_TYPE).then(function (resultObj) {
        if (resultObj.status === "ok") {
            producto = resultObj.data
            productoFotos = resultObj.data.images
            mostrarProductos()
            console.log(producto)
            console.log(productoFotos)
        }
    });
    getJSONData(PRODUCT_INFO_COMMENTS_URL + getID + EXT_TYPE).then(function (comentariosObj) {
        if (comentariosObj.status === "ok") {
            comentarios = comentariosObj.data
            console.log(comentarios)
            mostrarComentarios()
        }
    });

    /* Funcion para agregar comentarios nuevos en los productos */

    botonEnviar.addEventListener("click", function () {
        let comentarioUsuario = document.getElementById("comentarioNuevo").value;
        let rating = document.getElementById("puntaje").value;

        cuadroComentarios.innerHTML += `
            <li class="list-group-item"><strong>${usuario}</strong> - ${fechaActual()} ${horaActual()} - ${estrella(rating)} <br>${comentarioUsuario}</li>
            `;

        document.getElementById("comentarioNuevo").value = "";
    });
})