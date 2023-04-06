const NUMERO_CONTENIDOS = 15;
const CONTENIDOS_DISPONIBLES = [1, 2, 3, 4, 5, 6, 7, 8, 9];

document.addEventListener("DOMContentLoaded", () => {
    carrusel();
});
window.addEventListener("resize", () => {
    actualizar_paginacion();
});

function carrusel() {
    crear_carrusel();
    crear_flechas();
    crear_paginacion();
}
function crear_carrusel () {
    const recomendaciones = document.querySelectorAll(".recomendaciones");
    // Crear cada carrusel
    recomendaciones.forEach(recomendacion => {
        const recomendaciones_carrusel = document.createElement("DIV");
        recomendaciones_carrusel.classList.add("recomendaciones-carrusel");
        const flecha_izquierda = document.createElement("DIV");
        flecha_izquierda.classList.add("carrusel-flecha-izquierda");
        flecha_izquierda.innerHTML = `<i class="fa-solid fa-chevron-left"></i>`;
        const flecha_derecha = document.createElement("DIV");
        flecha_derecha.classList.add("carrusel-flecha-derecha");
        flecha_derecha.innerHTML = `<i class="fa-solid fa-chevron-right"></i>`;
        const nuevo_carrusel = document.createElement("DIV");
        nuevo_carrusel.classList.add("carrusel");
        let aux = 1;
        let arreglo_aleatorio = CONTENIDOS_DISPONIBLES;
        arreglo_aleatorio = arreglo_aleatorio.sort(() => Math.random() - 0.5);
        for (let i = 0; i < NUMERO_CONTENIDOS; i++) {
            if (aux >= 9) { aux = 1};
            const nuevo_carrusel_contenido = document.createElement("DIV");
            nuevo_carrusel_contenido.classList.add("carrusel-contenido");
            const link = document.createElement("A");
            // const picture = document.createElement("PICTURE");
            // picture.innerHTML = `
            //     <source srcset="build/img/${arreglo_aleatorio[aux]}.avif" type="image/avif">
            //     <source srcset="build/img/${arreglo_aleatorio[aux]}.webp" type="image/webp">
            //     <img loading="lazy"  width="200" height="300" src="build/img/${arreglo_aleatorio[aux]}.jpg" alt="carrusel imagen">
            // `;
            link.innerHTML = `
            <img src="build/img/${arreglo_aleatorio[aux]}.jpg" alt="">
            `;
            // link.appendChild(picture);
            nuevo_carrusel_contenido.appendChild(link);
            nuevo_carrusel.appendChild(nuevo_carrusel_contenido);
            aux = aux + 1;
        }
        recomendaciones_carrusel.appendChild(flecha_izquierda);
        recomendaciones_carrusel.appendChild(nuevo_carrusel);
        recomendaciones_carrusel.appendChild(flecha_derecha);
        recomendacion.appendChild(recomendaciones_carrusel);
    });
}
function crear_flechas() {
    const flechas_izquierdas = document.querySelectorAll(".carrusel-flecha-izquierda")
    const flechas_derechas = document.querySelectorAll(".carrusel-flecha-derecha");
    flechas_izquierdas.forEach(flecha_izquierda => {
        flecha_izquierda.addEventListener("click", (e) => {
            const fila_actual = e.target.parentNode.nextElementSibling;
            fila_actual.scrollLeft = fila_actual.scrollLeft - fila_actual.clientWidth;
        });
    });
    flechas_derechas.forEach(flecha_derecha => {
        flecha_derecha.addEventListener("click", (e) => {
            const fila_actual = e.target.parentNode.previousElementSibling;
            fila_actual.scrollLeft = fila_actual.scrollLeft + fila_actual.clientWidth;
        });
    });
}
function crear_paginacion() {
    const numero_peliculas = document.querySelector(".carrusel").childNodes.length;
    const carrusel = document.querySelector(".carrusel");
    const paginadores = document.querySelectorAll(".indicadores-paginador");
    paginadores.forEach(paginador => {
        let numero_paginas;
        if (carrusel.clientWidth < 480) {
            numero_paginas = Math.ceil(numero_peliculas / 2);
        } else if (carrusel.clientWidth < 768) {
            numero_paginas = Math.ceil(numero_peliculas / 3);
        } else if (carrusel.clientWidth < 996) {
            numero_paginas = Math.ceil(numero_peliculas / 4);
        } else {
            numero_paginas = Math.ceil(numero_peliculas / 5);
        }
        for (let i = 0; i < numero_paginas; i++) {
            const indicador = document.createElement("BUTTON");
            if (i === 0) { indicador.classList.add("activo"); }
            indicador.addEventListener("click", (e) => {
                paginador.querySelector(".activo").classList.remove("activo");
                e.target.classList.add("activo");
                const encabezado_actual = paginador.parentNode;
                const contenedor_carrusel_actual = encabezado_actual.parentNode;
                const carrusel_actual = contenedor_carrusel_actual.querySelector(".recomendaciones-carrusel").querySelector(".carrusel");
                carrusel_actual.scrollLeft = i * carrusel_actual.clientWidth;
            });
            paginador.appendChild(indicador);
        }
    });
}
function actualizar_paginacion() {
    const paginadores = document.querySelectorAll(".indicadores-paginador");
    paginadores.forEach(paginador  => {
        const botones = paginador.querySelectorAll("button");
        botones.forEach(boton => boton.remove());
    });
    crear_paginacion();
}