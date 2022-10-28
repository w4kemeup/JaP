let usuario = document.getElementById("usuario");
let form = document.getElementById("formularioLogIn");

document.addEventListener("DOMContentLoaded", function () {
    form.addEventListener('submit', event => {
        event.preventDefault()
        if (!form.checkValidity()) {
            event.stopPropagation()
        }
        form.classList.add('was-validated')
        if (form.checkValidity()) {
            localStorage.setItem("correo", usuario.value)
            location.replace("portada.html");
        }
    })
})

// funcion para modo oscuro //


let boton = document.getElementById("botonOscuro");
let fondo = document.body;

boton.addEventListener("click", function () {
    let tema = fondo.classList.toggle("oscuro")
    localStorage.setItem("modo-oscuro", tema)
})

// mantener modo aunque se refresque la pagina // 

let dark = localStorage.getItem("modo-oscuro");

if (dark == "true") {
    fondo.classList.add("oscuro")
} else {
    fondo.classList.remove("oscuro")
}

// sign in con google //

/* function handleCredentialResponse(response) {
    location.replace("portada.html")
}
window.onload = function () {
    google.accounts.id.initialize({
        client_id: "721921174938-p0e3kmvhgasha3v828mtf3tgatiro3vh.apps.googleusercontent.com",
        callback: handleCredentialResponse
    });
    google.accounts.id.renderButton(
        document.getElementById("buttonDiv"),
        {
            theme: "filled_black", size: "large", type: "standard", shape: "pill", text: "$ {button.text}", logo_alignment: "left", width: "300"
        }
    );
    google.accounts.id.prompt();
}
 */
