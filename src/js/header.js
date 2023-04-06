document.addEventListener("DOMContentLoaded", function () {
    header();
});
function header() {
    ocultar_links();
    pintar_header();
}
function ocultar_links() {
    const navegacion_barra = document.querySelector(".navegacion-barra");
    const navegacion_notificaciones = document.querySelector(".navegacion-notificaciones");
    const navegacion_niños = document.querySelector(".navegacion-extra P");
    //Cuando se cargue la página reviso si el width require de hacer el cambio
    window.addEventListener("DOMContentLoaded", () => {
        if (window.innerWidth < 996) {
            crear_link_explorar(navegacion_barra);
            navegacion_niños.classList.add("esconder");
            navegacion_notificaciones.classList.add("esconder");
        }
    });
    // Cuando se redimensione la página reviso el width
    window.addEventListener("resize", function () {
        // Al redimensionar necesita este try para que solo aparezca uno
        try {
            const eliminar = document.querySelector(".para-eliminar");
            eliminar.remove();
        } catch (error) {
            console.log(error);
        }
        if (window.innerWidth < 996) {
            crear_link_explorar(navegacion_barra);
            navegacion_niños.classList.add("esconder");
            navegacion_notificaciones.classList.add("esconder");
        } else {
            const links = document.querySelectorAll(".navegacion-link");
            links.forEach(link => link.classList.remove("esconder"));
            navegacion_niños.classList.remove("esconder");
            navegacion_notificaciones.classList.remove("esconder");
        }
    });
}
function crear_link_explorar(navegacion_barra) {
    const links = document.querySelectorAll(".navegacion-link");
    links.forEach(link => link.classList.add("esconder"));
    const nuevo_link = document.createElement("A");
    // esta clase solo es para reconocerlo
    nuevo_link.classList.add("para-eliminar");
    nuevo_link.innerHTML = `
        <p>Explorar</p>
        <i class="fa-solid fa-caret-down navegacion-perfil-desplegar"></i>
    `;
    nuevo_link.classList.add("nuevo-link");
    nuevo_link.addEventListener("click", desplegar_links);
    navegacion_barra.appendChild(nuevo_link);
}
function desplegar_links() {
    console.log(`Hola amigos`);
}
function pintar_header() {
    const presentacion_serie = document.querySelector(".presentacion-serie");
    const header = document.querySelector(".header");
    document.addEventListener("scroll", () => {
        try {
            header.classList.remove("bg-negro");
        } catch (error) {
            console.log(error);
        }
        if (presentacion_serie.getBoundingClientRect().top < 0) {
            header.classList.add("bg-negro");
        }
    });
}