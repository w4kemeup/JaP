let getID = JSON.parse(localStorage.getItem("productoID"));
let catID = localStorage.getItem("catID");
let producto = [];
let productoFotos = [];
let comentarios = [];
let productoRelacionado = [];
let contenedorTarjetas = document.getElementById("contenedorTarjetas");
let infoProducto = document.getElementById("contenidoProducto");
let cuadroComentarios = document.getElementById("contenidoComentarios");
let botonEnviar = document.getElementById("puntajeBtn");
let contenidoRelacionado = document.getElementById("contenedorProductoRelacionado");
let botonComprar = document.getElementById("btnComprar");
const fecha = new Date();
let urlProducto = (PRODUCT_INFO_URL + getID + EXT_TYPE);
let comentariosProducto = (PRODUCT_INFO_COMMENTS_URL + getID + EXT_TYPE);

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

/* Alerta de compra fallida */

function compraFallida() {
  let alerta = document.getElementById('liveAlertPlaceholder');

  htmlContentToAppend = "";
  htmlContentToAppend = `
        <div class="alert alert alert-warning alert-dismissible fade show" role="alert">
            <strong>¡Oops!</strong> ¡El producto ya existe en el <a href="cart.html" class="alert-link">carrito</a>!
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
        `;
  alerta.innerHTML = htmlContentToAppend;
}

/* Alerta de compra exitosa */

function compraExitosa() {
  let alerta = document.getElementById('liveAlertPlaceholder');

  htmlContentToAppend = "";
  htmlContentToAppend = `
    <div class="alert alert-success alert-dismissible fade show" role="alert">
        <strong>¡Felicidades!</strong> ¡Su producto fue agregado al <a href="cart.html" class="alert-link">carrito</a> con éxito!
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
    `;
  alerta.innerHTML = htmlContentToAppend;
}

/* Funcion para mostrar los productos */

function mostrarProductos() {
  let nombre = document.getElementById("nombreProducto");
  let htmlContentToAppend = "";

  htmlContentToAppend = `
    <div id="carouselExampleCaptions" class="carousel slide" data-bs-ride="carousel">
    <div class="carousel-indicators">
      <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
      <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
      <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
      <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="3" aria-label="Slide 4"></button>
    </div>
    <div class="carousel-inner">
      <div class="carousel-item active" data-bs-interval="2000">
        <img src="${productoFotos[0]}" class="d-block w-100" alt="...">
        <div class="carousel-caption d-none d-md-block">
            <button class="btn btn-dark mb-3" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="true" aria-controls="collapseExample">
                Más información
            </button>       
            
            <div class="collapse" id="collapseExample">
                <div class="text-start">
                    
                <ol class="list-group">
                <li class="list-group-item d-flex justify-content-between align-items-start">
                  <div class="ms-2 me-auto">
                    <div class="fw-bold">Precio</div>
                    ${producto.currency} ${producto.cost}
                  </div>
                  
                </li>
          
                <li class="list-group-item d-flex justify-content-between align-items-start">
                <div class="ms-2 me-auto">
                  <div class="fw-bold">Descripción</div>
                  ${producto.description}
                </div>
                
              </li>
          
                <li class="list-group-item d-flex justify-content-between align-items-start">
                  <div class="ms-2 me-auto">
                    <div class="fw-bold">Categoría</div>
                    ${producto.category}
                  </div>
                  
                </li>
                <li class="list-group-item d-flex justify-content-between align-items-start">
                  <div class="ms-2 me-auto">
                    <div class="fw-bold">Cantidad de vendidos</div>
                    ${producto.soldCount}
                  </div>
                  
                </li>
                
              </ol>
                </div>
            </div>
        </div>
      </div>
      <div class="carousel-item" data-bs-interval="2000">
        <img src="${productoFotos[1]}" class="d-block w-100" alt="...">
        <div class="carousel-caption d-none d-md-block">
            <button class="btn btn-dark mb-3" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="true" aria-controls="collapseExample">
                Más información
            </button>
            <div class="collapse" id="collapseExample">
                <div class="text-start">
                    
                <ol class="list-group">
                <li class="list-group-item d-flex justify-content-between align-items-start">
                  <div class="ms-2 me-auto">
                    <div class="fw-bold">Precio</div>
                    ${producto.currency} ${producto.cost}
                  </div>
                  
                </li>
          
                <li class="list-group-item d-flex justify-content-between align-items-start">
                <div class="ms-2 me-auto">
                  <div class="fw-bold">Descripción</div>
                  ${producto.description}
                </div>
                
              </li>
          
                <li class="list-group-item d-flex justify-content-between align-items-start">
                  <div class="ms-2 me-auto">
                    <div class="fw-bold">Categoría</div>
                    ${producto.category}
                  </div>
                  
                </li>
                <li class="list-group-item d-flex justify-content-between align-items-start">
                  <div class="ms-2 me-auto">
                    <div class="fw-bold">Cantidad de vendidos</div>
                    ${producto.soldCount}
                  </div>
                  
                </li>
                
              </ol>
                </div>
            </div>
        </div>
      </div>
      <div class="carousel-item" data-bs-interval="2000">
        <img src="${productoFotos[2]}" class="d-block w-100" alt="...">
        <div class="carousel-caption d-none d-md-block">
            <button class="btn btn-dark mb-3" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="true" aria-controls="collapseExample">
                 Más información
            </button>
            <div class="collapse" id="collapseExample">
                <div class="text-start">
                    
                <ol class="list-group">
                <li class="list-group-item d-flex justify-content-between align-items-start">
                  <div class="ms-2 me-auto">
                    <div class="fw-bold">Precio</div>
                    ${producto.currency} ${producto.cost}
                  </div>
                  
                </li>
          
                <li class="list-group-item d-flex justify-content-between align-items-start">
                <div class="ms-2 me-auto">
                  <div class="fw-bold">Descripción</div>
                  ${producto.description}
                </div>
                
              </li>
          
                <li class="list-group-item d-flex justify-content-between align-items-start">
                  <div class="ms-2 me-auto">
                    <div class="fw-bold">Categoría</div>
                    ${producto.category}
                  </div>
                  
                </li>
                <li class="list-group-item d-flex justify-content-between align-items-start">
                  <div class="ms-2 me-auto">
                    <div class="fw-bold">Cantidad de vendidos</div>
                    ${producto.soldCount}
                  </div>
                  
                </li>
                
              </ol>
                </div>
            </div>
        </div>
      </div>
      <div class="carousel-item" data-bs-interval="2000">
        <img src="${productoFotos[3]}" class="d-block w-100" alt="...">
        <div class="carousel-caption d-none d-md-block">
            <button class="btn btn-dark mb-3" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="true" aria-controls="collapseExample">
                Más información
            </button>
            <div class="collapse" id="collapseExample">
                <div class="text-start">
                    
                <ol class="list-group">
                <li class="list-group-item d-flex justify-content-between align-items-start">
                  <div class="ms-2 me-auto">
                    <div class="fw-bold">Precio</div>
                    ${producto.currency} ${producto.cost}
                  </div>
                  
                </li>
          
                <li class="list-group-item d-flex justify-content-between align-items-start">
                <div class="ms-2 me-auto">
                  <div class="fw-bold">Descripción</div>
                  ${producto.description}
                </div>
                
              </li>
          
                <li class="list-group-item d-flex justify-content-between align-items-start">
                  <div class="ms-2 me-auto">
                    <div class="fw-bold">Categoría</div>
                    ${producto.category}
                  </div>
                  
                </li>
                <li class="list-group-item d-flex justify-content-between align-items-start">
                  <div class="ms-2 me-auto">
                    <div class="fw-bold">Cantidad de vendidos</div>
                    ${producto.soldCount}
                  </div>
                  
                </li>
                
              </ol>
                </div>
            </div>
        </div>
      </div>
    </div>
    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </button>
  </div>
  
        `;
  nombre.innerHTML = producto.name;
  document.getElementById("divCarrusel").innerHTML = htmlContentToAppend;
}

/* Funcion para agregar item al carrito */

function agregarItemCarro() {
  let canasta = [];
  canasta.push(producto)
  compraExitosa()

  if (!localStorage.getItem("cart")) {
    localStorage.setItem("cart", JSON.stringify(canasta));
  } else {
    let nuevoItem = JSON.parse(localStorage.getItem("cart"));
    if (nuevoItem.find(x => x.id === getID)) {
      compraFallida()
    } else {
      nuevoItem.push(producto);
      localStorage.setItem("cart", JSON.stringify(nuevoItem));
      compraExitosa()
    }
  }
}

/* Funcion para mostrar los comentarios de los productos */

function mostrarComentarios() {
  let htmlContentToAppend = "";
  for (let i = 0; i < comentarios.length; i++) {
    let item = comentarios[i];

    htmlContentToAppend = `      
        
        <div class="card shadow bg-body rounded">
          <div class="card-header fw-bold bg-dark text-white">${item.user}</div>
            <div class="card-body">
              <blockquote class="blockquote mb-0">
                <p>${item.description}</p>
                <p>${estrella(item.score)}</p>
                <p>${item.dateTime}</p>
              </blockquote>                    
            </div>
        </div>
        `;

    contenedorTarjetas.innerHTML += htmlContentToAppend;
  }
}

/* Funcion para desplegar productos relacionados */

function productosRelacionados() {
  let htmlContentToAppend = "";
  for (let i = 0; i < productoRelacionado.length; i++) {
    let relacionado = productoRelacionado[i];

    htmlContentToAppend = `
        <div onclick="setCatID(${relacionado.id})" class="cursor-active"  style=width:200px>
        <img src="${relacionado.image}" class="img-fluid" style=width:200px>
        <p class="fs-5">${relacionado.name}</p>
        </div>
        
        `;
    contenidoRelacionado.innerHTML += htmlContentToAppend;
  }
}

/* Funcion para agregar comentarios nuevos en los productos */

function agregarComentario() {
  let comentarioUsuario = document.getElementById("comentarioNuevo").value;
  let rating = document.getElementById("puntaje").value;

  document.getElementById("contenedorTarjetas").innerHTML += `      
          
        <div class="card shadow bg-body rounded">
          <div class="card-header fw-bold bg-dark text-white">${usuarioLogIn}</div>
          <div class="card-body">
            <blockquote class="blockquote mb-0">
             <p>${comentarioUsuario}</p>
             <p>${estrella(rating)}</p>
             <footer class="blockquote-footer">${fechaActual()} ${horaActual()}</footer>
            </blockquote>                    
          </div>
        </div>
              `;

  document.getElementById("comentarioNuevo").value = "";
  document.getElementById("puntaje").value = "1";
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

  botonEnviar.addEventListener("click", agregarComentario)

  botonComprar.addEventListener("click", agregarItemCarro)
})