let getID = localStorage.getItem("productoID");
let producto = [];
let productoFotos = [];
let comentarios = [];
let infoProducto = document.getElementById("contenidoProducto");
let cuadroComentarios = document.getElementById("contenidoComentarios");
let botonEnviar = document.getElementById("puntajeBtn");
let comentarioUsuario = document.getElementById("comentarioNuevo");
let usuario = localStorage.getItem("correo");
let agregarComentario = [];
const fecha = new Date();
let calificacion = document.getElementById("puntaje");
let i = 0;

function formatoFechaHora(num) {
    return num < 10 ? `0${num}` : num;
}

function fechaActual() {
    let mes = formatoFechaHora(fecha.getMonth() + 1);
    let dia = fecha.getDate();
    let anio = fecha.getFullYear();
    return [anio, mes, dia].join('-');
}

function horaActual() {
    let minutos = formatoFechaHora(fecha.getMinutes());
    let horas = formatoFechaHora(fecha.getHours());
    let segundos = formatoFechaHora(fecha.getSeconds());
    return [horas, minutos, segundos].join(':');
}

function agregarLista(valor, listado) {
    if (valor !== "") {
        listado.innerHTML += `
        <li class="list-group-item"><strong>${usuario}</strong> - ${fechaActual()} ${horaActual()} - ${estrella(calificacion.value)} <br>${valor}</li>
        `;
    }
}

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


function mostrarFotos() {
    for (let i = 0; i < productoFotos.length; i++) {
        let foto = productoFotos[i];
        return `<img src="${foto.images}" style=width:350px>`;
    }
}

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

    while (localStorage.getItem(i)) {
        agregarLista(localStorage.getItem(i), cuadroComentarios);
        i++;
    }

    botonEnviar.addEventListener("click", function () {
        let valor = comentarioUsuario.value;
        localStorage.setItem(i.toString(), valor)
        i++;

        agregarLista(valor, cuadroComentarios);
        comentarioUsuario.value = "";
    });

})