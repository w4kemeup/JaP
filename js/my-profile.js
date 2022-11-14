let form = document.getElementById("formularioPerfil");
let alerta = document.getElementById("liveAlertPlaceholder");
let campoNombre = document.getElementById("nombre");
let campoApellido = document.getElementById("apellido");
let campoMail = document.getElementById("correo");
let campoSegundoNombre = document.getElementById("segundoNombre");
let campoSegundoApellido = document.getElementById("segundoApellido");
let campoFotoPerfil = document.getElementById("imagen");
let campoTelefono = document.getElementById("contacto");
let modificarPerfil = document.getElementById("modificar");
let avatar = document.getElementById("previewImagen");
let camposPerfil = [];
let botonGuardar = document.getElementById("btnGuardar");
let baseNueva = JSON.parse(localStorage.getItem("baseUsuarios"));
let arrayUsuarios = [];
let usuariosModificados = []
let usuarioAvatar = document.getElementById("previewImagen");

// Validar solamente los inputs que son requeridos //

function validarSoloCamposRequeridos() {
    let inputsFormulario = document.querySelectorAll(".form-control");
    inputsFormulario.forEach(input => {
        if (!input.required) {
            input.classList.add('no-validar-feedback');
        }
    })
}

// Almacenar datos de perfil //

function guardarCambiosPerfil() {
    let perfilUsuario = {
        nombre: campoNombre.value,
        segundoNombre: campoSegundoNombre.value,
        apellido: campoApellido.value,
        segundoApellido: campoSegundoApellido.value,
        correo: campoMail.value,
        contacto: campoTelefono.value
    };
    arrayUsuarios.push(perfilUsuario);

    if (!localStorage.getItem("baseUsuarios")) {
        localStorage.setItem("baseUsuarios", JSON.stringify(arrayUsuarios));
    } else {
        baseNueva.push(perfilUsuario);
        localStorage.setItem("baseUsuarios", JSON.stringify(baseNueva));
    }
}

function cambiarDatos() {
    let encontrarUser = baseNueva.find(x => x.correo == usuarioLogIn);
    const index = baseNueva.indexOf(encontrarUser);
    if (index > -1) {
        baseNueva.splice(index, 1);
    }
    localStorage.setItem("baseUsuarios", JSON.stringify(baseNueva));
    guardarCambiosPerfil()
}

// Mostrar datos al iniciar sesion //

function mostrarDatos() {

    let encontrarUsuario = baseNueva.find(x => x.correo === usuarioLogIn);
    if (encontrarUsuario) {
        campoNombre.value = encontrarUsuario.nombre
        campoSegundoNombre.value = encontrarUsuario.segundoNombre
        campoApellido.value = encontrarUsuario.apellido;
        campoSegundoApellido.value = encontrarUsuario.segundoApellido;
        campoMail.value = encontrarUsuario.correo;
        campoTelefono.value = encontrarUsuario.contacto;
        if (!localStorage.getItem(`fotoUsuario_${usuarioLogIn}`)) {
            usuarioAvatar.setAttribute("src", "img/img_perfil.png")
        } else {
            usuarioAvatar.setAttribute("src", localStorage.getItem(`fotoUsuario_${usuarioLogIn}`));
        }
    }
}

document.addEventListener("DOMContentLoaded", function () {
    if (usuarioLogIn == null) {
        alert("debes iniciar sesion")
        window.location.replace("https://w4kemeup.github.io/JaP/");
    }
    if ((baseNueva == undefined) || (baseNueva.find(x => x.correo === usuarioLogIn) == undefined)) {
        campoMail.value = usuarioLogIn;
    } else if (baseNueva.find(x => x.correo === usuarioLogIn)) {
        mostrarDatos()
    }
    form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
        }
        form.classList.add('was-validated')
        validarSoloCamposRequeridos()
        if (form.checkValidity() && (baseNueva == undefined)) {
            guardarCambiosPerfil()
        } else {
            cambiarDatos()
        }
        mostrarDatos()
    });

    // Agregar imagen de perfil //

    campoFotoPerfil.addEventListener("change", () => {

        const fr = new FileReader();

        fr.readAsDataURL(campoFotoPerfil.files[0]);

        fr.addEventListener("load", () => {
            const url = fr.result;
            const fotoAvatar = new Image();
            fotoAvatar.src = url;
            avatar.setAttribute("src", url);
            localStorage.setItem(`fotoUsuario_${usuarioLogIn}`, url);
        })
    })
})