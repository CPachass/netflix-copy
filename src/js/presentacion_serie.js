document.addEventListener("DOMContentLoaded", function() {
    presentacion_header();
});

function presentacion_header() {
    ocultar_textos();
}

function ocultar_textos() {
    const posicion_hoy = document.querySelector(".overlay p");
    const descripcion = document.querySelector(".descripcion");
    window.addEventListener("DOMContentLoaded", function() {
        if (window.innerWidth < 480) {
            posicion_hoy.classList.add("esconder");
            descripcion.classList.add("esconder");
        }
    });
    window.addEventListener("resize", function() {
        if (window.innerWidth < 480) {
            posicion_hoy.classList.add("esconder");
            descripcion.classList.add("esconder");
        } else {
            try {
                posicion_hoy.classList.remove("esconder");
                descripcion.classList.remove("esconder");
            } catch (error) {
                console.log(error);
            }
        }
    });
}