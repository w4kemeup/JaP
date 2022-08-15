let usuario = document.getElementById("usuario");
let password = document.getElementById("password");


// funciones para modificar el borde del cuadro de texto tanto para el usuario como para contraseña, y se indica que se complete el cuadro de texto necesario //
// al ingresar un dato en el cuadro, el mismo cambiara su borde a color verde e ira acompañado de un tick //

function usuarioBien() {
    usuario.setAttribute("style", "border: 0.5px solid green") + 
    (document.getElementById("correctoUser").style.visibility = "visible")
    
}
function passwordBien() {
    password.setAttribute("style", "border: 0.5px solid green") +
    (document.getElementById("correctoPassword").style.visibility = "visible")
}

// al tener un cuadro vacio, su borde cambiara a color rojo y sera acompañado de un icono de alerta //

function usuarioMal() {
    usuario.setAttribute("style", "border: 0.5px solid red") +
        (document.getElementById("mailError").style.visibility = "visible") +
        (document.getElementById("alertaUsuario").style.visibility = "visible")
}


function passwordMal() {
    password.setAttribute("style", "border: 0.5px solid red") +
        (document.getElementById("passError").style.visibility = "visible") +
        (document.getElementById("alertaPassword").style.visibility = "visible")
}


// al hacer click en el boton de id lgnBtn, se agrega una escucha de evento click, que comprueba si las condiciones son las indicadas, se aplicara el estilo correspondiente segun la situacion y en caso de estar todo correcto, se procede a entrar al sitio//

document.getElementById("lgnBtn").addEventListener("click", function () {

    if (usuario.value === "" && password.value === "") {
        (usuarioMal() + passwordMal());
    } else if (usuario.value.length >= 1 && password.value === "") {
        (usuarioBien() + passwordMal());
    } else if (usuario.value === "" && password.value.length >= 1) {
        (usuarioMal() + passwordBien());
    } else if (usuario.value.length >= 1 && password.value.length >= 1) {
        (usuarioBien() + passwordBien() + location.replace("https://w4kemeup.github.io/JaP/portada.html"));
    }
})