let getID = localStorage.getItem("productoID");
let producto = [];
let productoFotos = [];
let comentarios = [];
let infoProducto = document.getElementById("contenidoProducto");
let cuadroComentarios = document.getElementById("contenidoComentarios");
let botonEnviar = document.getElementById("puntajeBtn");
let usuario = localStorage.getItem("correo");
const fecha = new Date();

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

/* Agregar un 0 para el numero correspondiente */

function formatoFechaHora(num) {
    return num < 10 ? `0${num}` : num;
}
/* Funcion para mostrar los productos */

function mostrarProductos() {

    let row = "";
    row = `
    <tr>
    <td><h1>${producto.name}</h1><br><br><hr></td>
    </tr>
    <tr>
    <td><strong>Precio</strong><br>${producto.currency} ${producto.cost}</td>
    </tr>
    <tr>
    <td><br><strong>Descripción</strong><br>${producto.description}</td>
    </tr>
    <tr>
    <td><br><strong>Categoría</strong><br>${producto.category}</td>
    </tr>
    <tr>
    <td><br><strong>Cantidad de vendidos</strong><br>${producto.soldCount}</td>
    </tr>
    <tr>
    <td><br><strong>Imágenes ilustrativas</strong><br><br>
    <img src="${productoFotos[0]}" style=width:350px>
    <img src="${productoFotos[1]}" style=width:350px>
    <img src="${productoFotos[2]}" style=width:350px>
    <img src="${productoFotos[3]}" style=width:350px>

    </td>
    </tr>   
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