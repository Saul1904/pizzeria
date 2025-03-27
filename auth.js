document.addEventListener("DOMContentLoaded", () => {
    const btnRegistro = document.getElementById("btnRegistro");
    const btnLogin = document.getElementById("btnLogin");

    // REGISTRO
    if (btnRegistro) {
        btnRegistro.addEventListener("click", () => {
            const nombre = document.getElementById("nombre").value;
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;

            if (nombre && email && password) {
                localStorage.setItem(email, JSON.stringify({ nombre, password }));
                alert("Registro exitoso, ahora puedes iniciar sesión.");
                window.location.href = "login.html";
            } else {
                alert("Por favor, completa todos los campos.");
            }
        });
    }

    // LOGIN
    if (btnLogin) {
        btnLogin.addEventListener("click", () => {
            const email = document.getElementById("loginEmail").value;
            const password = document.getElementById("loginPassword").value;
            const usuario = JSON.parse(localStorage.getItem(email));

            if (usuario && usuario.password === password) {
                localStorage.setItem("sesion", email);
                alert("Inicio de sesión exitoso.");
                window.location.href = "index.html"; // Redirige a la página principal
            } else {
                alert("Correo o contraseña incorrectos.");
            }
        });
    }

    // CERRAR SESIÓN
    const btnCerrarSesion = document.getElementById("cerrarSesion");
    if (btnCerrarSesion) {
        btnCerrarSesion.addEventListener("click", () => {
            localStorage.removeItem("sesion");
            alert("Sesión cerrada.");
            window.location.href = "login.html";
        });
    }

    // VERIFICAR SESIÓN ACTIVA
    const sesionActiva = localStorage.getItem("sesion");
    if (sesionActiva) {
        document.getElementById("usuario").textContent = `Bienvenido, ${JSON.parse(localStorage.getItem(sesionActiva)).nombre}`;
    }
});
