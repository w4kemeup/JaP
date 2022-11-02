let usuario = localStorage.getItem("correo");
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

// Validar solamente los inputs que son requeridos //

function validarSoloCamposRequeridos() {
    let inputsFormulario = document.querySelectorAll(".form-control");
    inputsFormulario.forEach(input => {
        if (!input.required) {
            input.classList.add('no-validar-feedback');
        }
    })
}

// Alertar al entrar sin iniciar sesion //

function alertarInicioSesion() {

    let htmlContentToAppend = "";

    htmlContentToAppend = `
         
        <div class="alert alert-danger text-center" role="alert">
        Parece que no tienes iniciada la sesión. Hazlo <a href="index.html" class="alert-link">aquí</a>.
        </div>
        `;

    alerta.innerHTML = htmlContentToAppend;
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
    localStorage.setItem("usuario", JSON.stringify(perfilUsuario));
}

// Mostrar datos al iniciar sesion //

function mostrarDatos() {
    let dataAlmacenada = JSON.parse(localStorage.getItem("usuario"));

    campoNombre.value = dataAlmacenada.nombre
    campoSegundoNombre.value = dataAlmacenada.segundoNombre
    campoApellido.value = dataAlmacenada.apellido;
    campoSegundoApellido.value = dataAlmacenada.segundoApellido;
    campoMail.value = dataAlmacenada.correo;
    campoTelefono.value = dataAlmacenada.contacto;

    let miNuevoAvatar = localStorage.getItem("nuevoAvatar");

    const newPicture = new Image();
    newPicture.src = miNuevoAvatar;
    avatar.setAttribute("src", miNuevoAvatar);

}

// Modificar datos //

function editarPerfil() {
    let inputsEditar = document.querySelectorAll(".form-control");
    inputsEditar.forEach(input => {
        input.disabled = !true;
    })
}

document.addEventListener("DOMContentLoaded", function () {
    if (usuario != null) {
        campoMail.value = usuario;
        if (JSON.parse(localStorage.getItem("usuario")) != null) {
            mostrarDatos()
        }
    } else {
        alertarInicioSesion()
        /* window.location = "index.html" */
    }
    form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
        }
        form.classList.add('was-validated')
        validarSoloCamposRequeridos()
        if (form.checkValidity()) {
            guardarCambiosPerfil()
            mostrarDatos()
        }
    });
    modificarPerfil.addEventListener("click", editarPerfil)

    // Agregar imagen de perfil //

    campoFotoPerfil.addEventListener("change", () => {

        const fr = new FileReader();

        fr.readAsDataURL(campoFotoPerfil.files[0]);

        fr.addEventListener("load", () => {
            const url = fr.result;
            const fotoAvatar = new Image();
            fotoAvatar.src = url;
            avatar.setAttribute("src", url);
            localStorage.setItem("nuevoAvatar", url);
        })
    })

})