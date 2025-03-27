let indice = 0;
const slides = document.querySelectorAll(".slide");
const totalSlides = slides.length;
const carrusel = document.querySelector(".carrusel");

function moverCarrusel(direccion) {
    indice += direccion;

    if (indice < 0) {
        indice = totalSlides - 1;
    } else if (indice >= totalSlides) {
        indice = 0;
    }

    let desplazamiento = indice * -100; 
    carrusel.style.transform = `translateX(${desplazamiento}%)`;
}

// Mueve el carrusel automáticamente cada 5 segundos
setInterval(() => moverCarrusel(1), 5000);

// Función para agregar la promoción al carrito y redirigir al carrito
function agregarPromoAlCarrito(nombre, precio) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    
    carrito.push({ nombre, precio, cantidad: 1 });

    localStorage.setItem("carrito", JSON.stringify(carrito));

    window.location.href = "carrito.html"; // Redirige al carrito después de seleccionar la promo
}
