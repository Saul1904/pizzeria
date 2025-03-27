document.addEventListener("DOMContentLoaded", () => {
    console.log("¡Pizza Delivery está en marcha!");
});

window.addEventListener("load", () => {
    const loader = document.getElementById("loader");
    if (loader) {
        loader.style.display = "none";
    }
});

//MENU.js//

document.addEventListener("DOMContentLoaded", () => {
    const botonesAgregar = document.querySelectorAll(".btn-agregar");

    const carrito = [];

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", () => {
            const nombre = boton.getAttribute("data-nombre");
            const precio = parseFloat(boton.getAttribute("data-precio"));

            const productoExistente = carrito.find(item => item.nombre === nombre);

            if (productoExistente) {
                productoExistente.cantidad++;
            } else {
                carrito.push({
                    nombre: nombre,
                    precio: precio,
                    cantidad: 1
                });
            }

            console.log("Carrito actualizado:", carrito);
        });
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const buscador = document.getElementById("buscador");
    const filtroCategoria = document.getElementById("filtroCategoria");
    const pizzas = document.querySelectorAll(".pizza-item");

    // Función para filtrar pizzas
    function filtrarPizzas() {
        const textoBusqueda = buscador.value.toLowerCase().trim();
        const categoriaSeleccionada = filtroCategoria.value;

        pizzas.forEach(pizza => {
            const nombrePizza = pizza.querySelector("h3").textContent.toLowerCase();
            const categoriaPizza = pizza.getAttribute("data-categoria");

            const coincideNombre = nombrePizza.includes(textoBusqueda);
            const coincideCategoria = 
                categoriaSeleccionada === "todas" || 
                categoriaPizza === categoriaSeleccionada;

            if (coincideNombre && coincideCategoria) {
                pizza.style.display = "block";
            } else {
                pizza.style.display = "none";
            }
        });
    }

    // Eventos para activar la búsqueda y el filtrado
    buscador.addEventListener("input", filtrarPizzas);
    filtroCategoria.addEventListener("change", filtrarPizzas);
});


//Carrito//


document.addEventListener("DOMContentLoaded", () => {
    const botonesAgregar = document.querySelectorAll(".btn-agregar");
    const listaCarrito = document.getElementById("listaCarrito");
    const totalCarrito = document.getElementById("totalCarrito");
    const btnVaciarCarrito = document.getElementById("btnVaciarCarrito");

    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    // Agregar producto al carrito
    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", () => {
            const nombre = boton.getAttribute("data-nombre");
            const precio = parseFloat(boton.getAttribute("data-precio"));

            const productoExistente = carrito.find(item => item.nombre === nombre);

            if (productoExistente) {
                productoExistente.cantidad++;
            } else {
                carrito.push({
                    nombre: nombre,
                    precio: precio,
                    cantidad: 1
                });
            }

            guardarCarrito();
            alert(`${nombre} se agregó al carrito.`);
        });
    });

    // Mostrar el contenido del carrito
    function mostrarCarrito() {
        if (!listaCarrito) return;

        listaCarrito.innerHTML = "";

        if (carrito.length === 0) {
            listaCarrito.innerHTML = "<p>Tu carrito está vacío.</p>";
            totalCarrito.textContent = "Total: $0 MXN";
            return;
        }

        let total = 0;
        carrito.forEach(producto => {
            const item = document.createElement("div");
            item.classList.add("carrito-item");
            item.innerHTML = `
                <p>${producto.nombre} (x${producto.cantidad})</p>
                <span>$${producto.precio * producto.cantidad} MXN</span>
            `;
            listaCarrito.appendChild(item);

            total += producto.precio * producto.cantidad;
        });

        totalCarrito.textContent = `Total: $${total} MXN`;
    }

    // Guardar el carrito en localStorage
    function guardarCarrito() {
        localStorage.setItem("carrito", JSON.stringify(carrito));
        mostrarCarrito();
    }

    // Vaciar el carrito
    if (btnVaciarCarrito) {
        btnVaciarCarrito.addEventListener("click", () => {
            carrito.length = 0;
            guardarCarrito();
        });
    }

    // Mostrar carrito al cargar la página
    mostrarCarrito();
});
//Calculado de tiempo
document.addEventListener("DOMContentLoaded", () => {
    const btnCalcularEntrega = document.getElementById("btnCalcularEntrega");

    if (btnCalcularEntrega) {
        btnCalcularEntrega.addEventListener("click", () => {
            const direccion = document.getElementById("direccion").value.trim();
            const tiempoEntrega = document.getElementById("tiempoEntrega");

            if (direccion === "") {
                tiempoEntrega.textContent = "❌ Por favor, ingresa una dirección válida.";
                tiempoEntrega.style.color = "#d9534f";
                return;
            }

            // Simulación de cálculo del tiempo estimado
            const distancia = Math.floor(Math.random() * 15); // Simula una distancia aleatoria (0-15 km)

            let tiempoEstimado;
            if (distancia < 5) {
                tiempoEstimado = "⏳ Aproximadamente 20 minutos.";
            } else if (distancia >= 5 && distancia <= 10) {
                tiempoEstimado = "⏳ Aproximadamente 30 minutos.";
            } else {
                tiempoEstimado = "⏳ Aproximadamente 45 minutos.";
            }

            tiempoEntrega.textContent = `✅ Tu pedido llegará en ${tiempoEstimado}`;
            tiempoEntrega.style.color = "#5cb85c";
        });
    }
});
/*Cupones*/

    document.getElementById("btnAplicarCupon").addEventListener("click", function() {
        let codigoCupon = document.getElementById("codigoCupon").value.trim();
        let totalElement = document.getElementById("totalCarrito");
        let totalTexto = totalElement.innerText.replace("Total:", "").trim();
        let totalActual = parseFloat(totalTexto.replace("$", "").replace("MXN", "").trim());

        let descuento = 0;
        let mensaje = "";

        if (codigoCupon === "PIZZA10") {
            descuento = totalActual * 0.10; // 10% de descuento
            mensaje = "✅ Cupón aplicado: 10% de descuento.";
        } else if (codigoCupon === "PIZZA20") {
            descuento = totalActual * 0.20; // 20% de descuento
            mensaje = "✅ Cupón aplicado: 20% de descuento.";
        } else {
            mensaje = "❌ Cupón no válido.";
        }

        let totalConDescuento = totalActual - descuento;

        // Guardar el descuento en localStorage
        localStorage.setItem("descuentoAplicado", descuento.toFixed(2));
        localStorage.setItem("totalFinal", totalConDescuento.toFixed(2));

        // Mostrar mensaje
        document.getElementById("mensajeCupon").innerText = mensaje;

        // Actualizar total en pantalla
        totalElement.innerHTML = `<strong>Total:</strong> $${totalConDescuento.toFixed(2)} MXN`;
    });

    document.getElementById("btnConfirmarPago").addEventListener("click", function() {
        let totalFinal = localStorage.getItem("totalFinal") || document.getElementById("totalCarrito").innerText.replace("Total:", "").trim();
        let metodoPago = document.querySelector('input[name="metodoPago"]:checked').value;
        let descuento = localStorage.getItem("descuentoAplicado") || "0.00";

        localStorage.setItem("totalPago", totalFinal);
        localStorage.setItem("metodoPago", metodoPago);
        localStorage.setItem("descuentoAplicado", descuento);

        window.location.href = "confirmacion.html";
    });


//ELIGE TU METODO DE PAGO//

document.getElementById("btnConfirmarPago").addEventListener("click", function() {
    let direccionEnvio = document.getElementById("direccionEnvio").value.trim();
    
    if (direccionEnvio === "") {
        document.getElementById("mensajeDireccion").innerText = "❌ Por favor, ingresa tu dirección de envío.";
        return; // No permite continuar sin dirección
    }

    let totalFinal = localStorage.getItem("totalFinal") || document.getElementById("totalCarrito").innerText.replace("Total:", "").trim();
    let metodoPago = document.querySelector('input[name="metodoPago"]:checked').value;
    let descuento = localStorage.getItem("descuentoAplicado") || "0.00";

    localStorage.setItem("direccionEnvio", direccionEnvio);
    localStorage.setItem("totalPago", totalFinal);
    localStorage.setItem("metodoPago", metodoPago);
    localStorage.setItem("descuentoAplicado", descuento);

    window.location.href = "confirmacion.html";
});




//Contacto//

document.addEventListener("DOMContentLoaded", () => {
    const formContacto = document.getElementById("formContacto");

    if (formContacto) {
        formContacto.addEventListener("submit", (e) => {
            e.preventDefault();

            // Mostrar mensaje de éxito
            const mensajeExito = document.getElementById("mensajeExito");
            mensajeExito.style.display = "block";

            // Limpiar el formulario
            formContacto.reset();

            // Ocultar el mensaje después de 5 segundos
            setTimeout(() => {
                mensajeExito.style.display = "none";
            }, 5000);
        });
    }
});



//loader//
window.addEventListener("load", () => {
    const loader = document.getElementById("loader");
    if (loader) {
        loader.style.display = "none";
    }
});

//Comentarios y opiniones //
document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("modal-opiniones");
    const cerrarModal = document.querySelector(".cerrar-modal");
    const listaOpiniones = document.getElementById("lista-opiniones");
    const formOpinion = document.getElementById("form-opinion");

    let pizzaActual = ""; // Guardará el ID de la pizza seleccionada

    // Mostrar modal al hacer clic en "Opiniones"
    document.querySelectorAll(".btn-opiniones").forEach((boton) => {
        boton.addEventListener("click", () => {
            pizzaActual = boton.getAttribute("data-id"); // Obtener ID de la pizza
            cargarOpiniones(pizzaActual);
            modal.style.display = "block";
        });
    });

    // Cerrar modal
    cerrarModal.addEventListener("click", () => {
        modal.style.display = "none";
    });

    // Cerrar modal al hacer clic fuera del contenido
    window.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.style.display = "none";
        }
    });

    // Manejar envío de opiniones
    formOpinion.addEventListener("submit", (e) => {
        e.preventDefault();
        const nombre = document.getElementById("nombre").value.trim();
        const comentario = document.getElementById("comentario").value.trim();
        const calificacion = document.getElementById("calificacion").value;

        if (nombre === "" || comentario === "") {
            alert("Por favor, completa todos los campos.");
            return;
        }

        const nuevaOpinion = { nombre, comentario, calificacion };
        let opiniones = JSON.parse(localStorage.getItem(`opiniones_${pizzaActual}`)) || [];
        opiniones.push(nuevaOpinion);
        localStorage.setItem(`opiniones_${pizzaActual}`, JSON.stringify(opiniones));

        cargarOpiniones(pizzaActual);
        formOpinion.reset();
    });

    // Función para cargar opiniones en la modal
    function cargarOpiniones(pizzaId) {
        listaOpiniones.innerHTML = "";
        let opinionesGuardadas = JSON.parse(localStorage.getItem(`opiniones_${pizzaId}`)) || [];
        
        if (opinionesGuardadas.length === 0) {
            listaOpiniones.innerHTML = "<li>Aún no hay opiniones.</li>";
        } else {
            opinionesGuardadas.forEach(opinion => {
                const li = document.createElement("li");
                li.innerHTML = `<strong>${opinion.nombre}</strong> - ${opinion.calificacion} ⭐<br>${opinion.comentario}`;
                listaOpiniones.appendChild(li);
            });
        }
    }
});

//PROMOCIONES//


//Entregas//
document.addEventListener("DOMContentLoaded", function () {
    const btnEntrega = document.getElementById("btnEntrega");
    const modalEntrega = document.getElementById("modalEntrega");
    const closeBtn = document.querySelector(".close");
    const opcionesEntrega = document.getElementsByName("tipoEntrega");
    const direccionInput = document.getElementById("direccionInput");
    const tiendaInfo = document.getElementById("tiendaInfo");
    const btnConfirmarEntrega = document.getElementById("btnConfirmarEntrega");

    btnEntrega.addEventListener("click", function () {
        modalEntrega.style.display = "flex";
    });

    closeBtn.addEventListener("click", function () {
        modalEntrega.style.display = "none";
    });

    opcionesEntrega.forEach(opcion => {
        opcion.addEventListener("change", function () {
            if (opcion.value === "domicilio") {
                direccionInput.classList.remove("hidden");
                tiendaInfo.classList.add("hidden");
            } else {
                tiendaInfo.classList.remove("hidden");
                direccionInput.classList.add("hidden");
            }
        });
    });

    btnConfirmarEntrega.addEventListener("click", function () {
        let tipoSeleccionado = document.querySelector('input[name="tipoEntrega"]:checked');
        if (!tipoSeleccionado) {
            alert("Selecciona un tipo de entrega");
            return;
        }

        if (tipoSeleccionado.value === "domicilio") {
            let direccion = document.getElementById("direccion").value;
            if (!direccion) {
                alert("Por favor, ingresa tu dirección");
                return;
            }
            alert(`📦 Entrega a domicilio seleccionada. Dirección: ${direccion}`);
        } else {
            alert("📍 Recogerás tu pedido en tienda.");
        }

        modalEntrega.style.display = "none";
    });
});

//INICIO DE SESION77
document.addEventListener("DOMContentLoaded", function () {
    const btnLogin = document.getElementById("btnLogin");
    const btnLogout = document.getElementById("btnLogout");
    const userNameSpan = document.getElementById("userName");

    // Verificar si hay un usuario guardado en localStorage
    const usuarioGuardado = localStorage.getItem("usuario");
    if (usuarioGuardado) {
        mostrarUsuario(usuarioGuardado);
    }

    btnLogout.addEventListener("click", function () {
        localStorage.removeItem("usuario");
        ocultarUsuario();
    });

    function mostrarUsuario(nombre) {
        userNameSpan.textContent = `Bienvenido, ${nombre}`;
        btnLogin.style.display = "none";
        btnLogout.style.display = "inline-block";
    }

    function ocultarUsuario() {
        userNameSpan.textContent = "";
        btnLogin.style.display = "inline-block";
        btnLogout.style.display = "none";
    }
});











