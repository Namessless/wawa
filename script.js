/* =========================================================
   HOUSE OF SPIDERS — BILL
   JavaScript principal
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       CONFIGURACIÓN
       ===================================================== */

    const CONFIG = {
        usuario: "Bill",
        contrasena: "Fly my wings",

        intentosMaximos: 3,

        // Pistas
        pistaUsuario: "Tus 2 primeros nombres",
        pistaContrasena: "Algo de Yi Sang",

        // Nombre utilizado para guardar la sesión
        claveSesion: "houseOfSpidersBill",

        // Guardar textos mientras la página está abierta
        claveTextos: "houseOfSpidersBillTextos"
    };


    /* =====================================================
       ELEMENTOS
       ===================================================== */

    const pantallaLogin = document.getElementById("pantalla-login");
    const contenidoPrincipal = document.getElementById("contenido-principal");

    const formulario = document.getElementById("formulario-login");

    const inputUsuario = document.getElementById("usuario");
    const inputContrasena = document.getElementById("contrasena");

    const mensajeLogin = document.getElementById("mensaje-login");

    const botonEntrar = document.getElementById("boton-entrar");
    const botonMostrarContrasena =
        document.getElementById("mostrar-contrasena");

    const botonMenu = document.getElementById("boton-menu");
    const enlacesNav = document.querySelector(".enlaces-nav");

    const enlacesNavegacion =
        document.querySelectorAll(".enlace-nav");

    const botonArriba =
        document.getElementById("boton-arriba");

    const visorImagen =
        document.querySelector(".visor-imagen");

    const imagenVisor =
        document.querySelector(".visor-contenido img");

    const botonCerrarVisor =
        document.querySelector(".cerrar-visor");

    const itemsGaleria =
        document.querySelectorAll(".galeria-item");

    const elementosReveal =
        document.querySelectorAll("[data-reveal]");

    const textareas =
        document.querySelectorAll(".bloque-escritura textarea");


    /* =====================================================
       ESTADO
       ===================================================== */

    let intentos = 0;


    /* =====================================================
       FUNCIONES AUXILIARES
       ===================================================== */

    function mostrarContenido() {

        if (!pantallaLogin || !contenidoPrincipal) return;

        pantallaLogin.style.opacity = "0";
        pantallaLogin.style.pointerEvents = "none";

        setTimeout(() => {
            pantallaLogin.style.display = "none";

            contenidoPrincipal.style.opacity = "1";
            contenidoPrincipal.style.visibility = "visible";

            document.body.style.overflow = "";
        }, 650);
    }


    function prepararPagina() {

        if (!contenidoPrincipal) return;

        // Ocultar inicialmente el contenido principal
        contenidoPrincipal.style.opacity = "0";
        contenidoPrincipal.style.visibility = "hidden";

        contenidoPrincipal.style.transition =
            "opacity 0.6s ease";

        // Evitar desplazamiento mientras está el login
        document.body.style.overflow = "hidden";
    }


    function mostrarMensaje(texto, tipo = "") {

        if (!mensajeLogin) return;

        mensajeLogin.textContent = texto;

        mensajeLogin.className = "";

        if (tipo) {
            mensajeLogin.classList.add(tipo);
        }
    }


    function limpiarMensaje() {

        if (!mensajeLogin) return;

        mensajeLogin.textContent = "";
        mensajeLogin.className = "";
    }


    /* =====================================================
       SESIÓN
       ===================================================== */

    function comprobarSesion() {

        try {

            const sesionGuardada =
                sessionStorage.getItem(CONFIG.claveSesion);

            if (sesionGuardada === "true") {

                if (pantallaLogin) {
                    pantallaLogin.style.display = "none";
                }

                if (contenidoPrincipal) {
                    contenidoPrincipal.style.opacity = "1";
                    contenidoPrincipal.style.visibility = "visible";
                }

                document.body.style.overflow = "";

                return true;
            }

        } catch (error) {

            console.warn(
                "No se pudo comprobar la sesión:",
                error
            );
        }

        return false;
    }


    function guardarSesion() {

        try {

            sessionStorage.setItem(
                CONFIG.claveSesion,
                "true"
            );

        } catch (error) {

            console.warn(
                "No se pudo guardar la sesión:",
                error
            );
        }
    }


    /* =====================================================
       LOGIN
       ===================================================== */

    function iniciarSesion() {

        if (!inputUsuario || !inputContrasena) return;

        const usuarioEscrito =
            inputUsuario.value.trim();

        const contrasenaEscrita =
            inputContrasena.value;

        const usuarioCorrecto =
            usuarioEscrito.toLowerCase() ===
            CONFIG.usuario.toLowerCase();

        const contrasenaCorrecta =
            contrasenaEscrita ===
            CONFIG.contrasena;


        /* ---------------------------------------------
           TODO CORRECTO
        --------------------------------------------- */

        if (usuarioCorrecto && contrasenaCorrecta) {

            guardarSesion();

            if (botonEntrar) {

                botonEntrar.disabled = true;

                botonEntrar.innerHTML = `
                    <span>BIENVENIDO</span>
                    <i class="fa-solid fa-check"></i>
                `;
            }

            mostrarMensaje(
                "Acceso concedido.",
                "correcto"
            );

            setTimeout(() => {
                mostrarContenido();
            }, 450);

            return;
        }


        /* ---------------------------------------------
           INTENTO INCORRECTO
        --------------------------------------------- */

        intentos++;

        inputContrasena.value = "";


        /* ---------------------------------------------
           USUARIO INCORRECTO
        --------------------------------------------- */

        if (!usuarioCorrecto && !contrasenaCorrecta) {

            mostrarMensaje(
                `Algo no coincide. Pista: ${CONFIG.pistaUsuario}.`,
                "error"
            );

        } else if (!usuarioCorrecto) {

            mostrarMensaje(
                `El usuario no es correcto. Pista: ${CONFIG.pistaUsuario}.`,
                "error"
            );

        } else {

            mostrarMensaje(
                `La contraseña no es correcta. Pista: ${CONFIG.pistaContrasena}.`,
                "error"
            );
        }


        /* ---------------------------------------------
           REVELAR RESPUESTAS DESPUÉS DE 3 INTENTOS
        --------------------------------------------- */

        if (intentos >= CONFIG.intentosMaximos) {

            mostrarMensaje(
                `Ya gastaste los ${CONFIG.intentosMaximos} intentos. 
                Usuario: ${CONFIG.usuario} | 
                Contraseña: ${CONFIG.contrasena}`,
                "revelado"
            );

            // Evitamos seguir contando intentos
            intentos = CONFIG.intentosMaximos;
        }
    }


    if (formulario) {

        formulario.addEventListener("submit", (evento) => {

            evento.preventDefault();

            iniciarSesion();
        });
    }


    /* =====================================================
       MOSTRAR / OCULTAR CONTRASEÑA
       ===================================================== */

    if (botonMostrarContrasena && inputContrasena) {

        botonMostrarContrasena.addEventListener(
            "click",
            () => {

                const mostrando =
                    inputContrasena.type === "text";

                inputContrasena.type =
                    mostrando ? "password" : "text";

                const icono =
                    botonMostrarContrasena.querySelector("i");

                if (icono) {

                    icono.className =
                        mostrando
                            ? "fa-solid fa-eye"
                            : "fa-solid fa-eye-slash";
                }
            }
        );
    }


    /* =====================================================
       MENÚ MÓVIL
       ===================================================== */

    function cerrarMenu() {

        if (!enlacesNav) return;

        enlacesNav.classList.remove("activo");

        if (botonMenu) {

            const icono =
                botonMenu.querySelector("i");

            if (icono) {
                icono.className =
                    "fa-solid fa-bars";
            }
        }
    }


    if (botonMenu && enlacesNav) {

        botonMenu.addEventListener("click", () => {

            const abierto =
                enlacesNav.classList.toggle("activo");

            const icono =
                botonMenu.querySelector("i");

            if (icono) {

                icono.className = abierto
                    ? "fa-solid fa-xmark"
                    : "fa-solid fa-bars";
            }
        });
    }


    /* Cerrar menú después de tocar un enlace */

    enlacesNavegacion.forEach((enlace) => {

        enlace.addEventListener("click", () => {
            cerrarMenu();
        });

    });


    /* =====================================================
       GALERÍA — VISOR
       ===================================================== */

    function abrirImagen(src, alt = "") {

        if (!visorImagen || !imagenVisor) return;

        imagenVisor.src = src;
        imagenVisor.alt = alt;

        visorImagen.classList.add("activo");

        document.body.style.overflow = "hidden";
    }


    function cerrarImagen() {

        if (!visorImagen) return;

        visorImagen.classList.remove("activo");

        document.body.style.overflow = "";
    }


    itemsGaleria.forEach((item) => {

        const imagen = item.querySelector("img");

        if (!imagen) return;

        item.addEventListener("click", () => {

            abrirImagen(
                imagen.src,
                imagen.alt
            );

        });

    });


    if (botonCerrarVisor) {

        botonCerrarVisor.addEventListener(
            "click",
            cerrarImagen
        );
    }


    /* Cerrar tocando fuera de la imagen */

    if (visorImagen) {

        visorImagen.addEventListener(
            "click",
            (evento) => {

                if (
                    evento.target === visorImagen
                ) {
                    cerrarImagen();
                }
            }
        );
    }


    /* =====================================================
       TECLA ESC
       ===================================================== */

    document.addEventListener("keydown", (evento) => {

        if (evento.key === "Escape") {

            cerrarImagen();
            cerrarMenu();
        }
    });


    /* =====================================================
       ANIMACIONES AL HACER SCROLL
       ===================================================== */

    if ("IntersectionObserver" in window) {

        const observer =
            new IntersectionObserver(
                (elementos) => {

                    elementos.forEach((elemento) => {

                        if (
                            elemento.isIntersecting
                        ) {

                            elemento.target.classList.add(
                                "visible"
                            );

                            observer.unobserve(
                                elemento.target
                            );
                        }

                    });

                },
                {
                    threshold: 0.15
                }
            );


        elementosReveal.forEach((elemento) => {

            observer.observe(elemento);

        });

    } else {

        // Compatibilidad con navegadores antiguos
        elementosReveal.forEach((elemento) => {
            elemento.classList.add("visible");
        });
    }


    /* =====================================================
       NAVEGACIÓN ACTIVA
       ===================================================== */

    const secciones =
        document.querySelectorAll("section[id]");


    function actualizarNav() {

        const posicion =
            window.scrollY + 180;

        secciones.forEach((seccion) => {

            const inicio =
                seccion.offsetTop;

            const final =
                inicio + seccion.offsetHeight;

            const id =
                seccion.getAttribute("id");

            const enlace =
                document.querySelector(
                    `.enlace-nav[href="#${id}"]`
                );

            if (!enlace) return;

            if (
                posicion >= inicio &&
                posicion < final
            ) {

                enlacesNavegacion.forEach((nav) => {
                    nav.classList.remove("activo");
                });

                enlace.classList.add("activo");
            }
        });
    }


    window.addEventListener(
        "scroll",
        actualizarNav,
        { passive: true }
    );


    /* =====================================================
       BOTÓN VOLVER ARRIBA
       ===================================================== */

    function actualizarBotonArriba() {

        if (!botonArriba) return;

        if (window.scrollY > 450) {

            botonArriba.classList.add("visible");

        } else {

            botonArriba.classList.remove("visible");
        }
    }


    window.addEventListener(
        "scroll",
        actualizarBotonArriba,
        { passive: true }
    );


    if (botonArriba) {

        botonArriba.addEventListener(
            "click",
            () => {

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });

            }
        );
    }


    /* =====================================================
       GUARDAR LOS TEXTOS
       ===================================================== */

    function guardarTextos() {

        if (!textareas.length) return;

        const textos =
            Array.from(textareas).map(
                (textarea) => textarea.value
            );

        try {

            sessionStorage.setItem(
                CONFIG.claveTextos,
                JSON.stringify(textos)
            );

        } catch (error) {

            console.warn(
                "No se pudieron guardar los textos:",
                error
            );
        }
    }


    function cargarTextos() {

        if (!textareas.length) return;

        try {

            const datos =
                sessionStorage.getItem(
                    CONFIG.claveTextos
                );

            if (!datos) return;

            const textos =
                JSON.parse(datos);

            if (!Array.isArray(textos)) return;


            textareas.forEach(
                (textarea, indice) => {

                    if (
                        typeof textos[indice] ===
                        "string"
                    ) {

                        textarea.value =
                            textos[indice];
                    }

                }
            );

        } catch (error) {

            console.warn(
                "No se pudieron cargar los textos:",
                error
            );
        }
    }


    textareas.forEach((textarea) => {

        textarea.addEventListener(
            "input",
            guardarTextos
        );

    });


    /* =====================================================
       EFECTO SUTIL DE ENTRADA
       ===================================================== */

    function prepararEntrada() {

        if (!pantallaLogin) return;

        pantallaLogin.style.transition =
            "opacity 0.6s ease";
    }


    /* =====================================================
       REDUCIR ANIMACIONES SI EL USUARIO LO PREFIERE
       ===================================================== */

    const reducirMovimiento =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        );

    if (reducirMovimiento.matches) {

        document.documentElement.style.scrollBehavior =
            "auto";
    }


    /* =====================================================
       INICIALIZACIÓN
       ===================================================== */

    prepararEntrada();
    prepararPagina();
    cargarTextos();

    const yaInicioSesion =
        comprobarSesion();

    if (!yaInicioSesion) {

        // Enfocar el usuario después de cargar
        setTimeout(() => {

            if (inputUsuario) {
                inputUsuario.focus();
            }

        }, 350);
    }

    actualizarNav();
    actualizarBotonArriba();

});