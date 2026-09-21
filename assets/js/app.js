/* helpers*/

const $ = (selector) => document.querySelector(selector);

const $$ = (selector) => document.querySelectorAll(selector);


/* estado*/

const state = {

    productos: [],

    carrito: [],

    categoriaActual: "Todos",

    terminoBusqueda: "",

    juegoDestacado: null

};


/* inicio de aplicacion */

document.addEventListener("DOMContentLoaded", () => {

    cargarProductos();

    configurarEventos();

});


/* carga productos desde json con fetch*/

async function cargarProductos() {

    const grid = $("#grid-productos");

    const estado = $("#estado-productos");

    mostrarCargando(
        estado,
        "Cargando catálogo de videojuegos..."
    );

    try {

        const respuesta = await fetch(
            "assets/js/productos.json",
            {
                cache: "no-store"
            }
        );

        /*validacion       */
        if (!respuesta.ok) {

            throw new Error(
                `Error HTTP ${respuesta.status}`
            );

        }

        /* se convierte json   */
        const productos = await respuesta.json();

        /* se valida que el json tenga el catalogo       */
        if (!Array.isArray(productos) || productos.length === 0) {

            throw new Error(
                "El archivo JSON no contiene productos válidos."
            );

        }

        /* se guardan los productos o juegos     */
        state.productos = productos;

        ocultarEstado(estado);

        /* se muestra el catalogo         */
        mostrarProductos();

        /* se muestra un juego aleatorio     */
        iniciarJuegoDestacado();

    } catch (error) {

        console.error(
            "Error al cargar productos:",
            error
        );

        mostrarError(
            estado,
            "No pudimos cargar los juegos. " +
            "Por favor, intenta nuevamente más tarde."
        );

        grid.replaceChildren();

    }

}


/* configuracion de eventos */

function configurarEventos() {


    /* click-  en barras de navegacion */

    $$(".categoria-link").forEach((enlace) => {

        enlace.addEventListener("click", (evento) => {

            evento.preventDefault();

            const categoria =
                enlace.dataset.categoria;

            seleccionarCategoria(categoria);

            /*se cierra el menu movil despues de seleccionar una categoria
             */
            cerrarNavbarMovil();

            /*se desplaza al catalogo             */
            $("#catalogo").scrollIntoView({
                behavior: "smooth"
            });

        });

    });


    /* click- botonoes de filtro por categoria */

    $$(".categoria-btn").forEach((boton) => {

        boton.addEventListener("click", () => {

            const categoria =
                boton.dataset.categoria;

            seleccionarCategoria(categoria);

        });

    });


    /* submit- busqueda */

    $("#form-busqueda").addEventListener(
        "submit",
        (evento) => {

            evento.preventDefault();

            buscarProductos();

        }
    );


    /* click- juego destacado */

    $("#btn-agregar-destacado").addEventListener(
        "click",
        () => {

            if (state.juegoDestacado) {

                agregarAlCarrito(
                    state.juegoDestacado.id
                );

            }

        }
    );


    /* Cambiar manualmente el juego destacado.     */
    $("#btn-ver-destacado").addEventListener(
        "click",
        () => {

            cambiarJuegoDestacado();

        }
    );


    /* click- vaciar carro */

    $("#btn-vaciar-carrito").addEventListener(
        "click",
        vaciarCarrito
    );


    /*eventos para botones dinamicos */

    $("#grid-productos").addEventListener(
        "click",
        (evento) => {

            const boton =
                evento.target.closest(
                    "[data-action='agregar']"
                );

            if (!boton) {
                return;
            }

            const id =
                Number(boton.dataset.id);

            agregarAlCarrito(id);

        }
    );


    /* botones del carro */

    $("#contenido-carrito").addEventListener(
        "click",
        (evento) => {

            const botonEliminar =
                evento.target.closest(
                    "[data-action='eliminar']"
                );

            if (!botonEliminar) {
                return;
            }

            const id =
                Number(
                    botonEliminar.dataset.id
                );

            eliminarDelCarrito(id);

        }
    );

}


/* mostrar juegos */

function mostrarProductos() {

    const grid = $("#grid-productos");

    const contador =
        $("#cantidad-productos");

    grid.replaceChildren();


    /* filtro por categorias     */
    let productosFiltrados =
        obtenerProductosFiltrados();


    /* Actualizamos el contador.    */
    contador.textContent =
        `${productosFiltrados.length} producto(s)`;


    /* Si no existen resultados.     */
    if (productosFiltrados.length === 0) {

        grid.innerHTML = `
            <div class="col-12">

                <div class="estado-gamestore text-center">

                    <i class="bi bi-search fs-2 text-esmeralda"></i>

                    <h3 class="mt-3">
                        No encontramos juegos
                    </h3>

                    <p class="mb-0">
                        Prueba con otro nombre, categoría
                        o palabra.
                    </p>

                </div>

            </div>
        `;

        return;

    }


    /* se contruyen los lelementos antes de agregarlos al dom con fragment   */
    const fragment =
        document.createDocumentFragment();


    productosFiltrados.forEach((producto) => {

        fragment.appendChild(
            crearTarjetaProducto(producto)
        );

    });


    grid.appendChild(fragment);

}


/* crea tarjeta de juego */

function crearTarjetaProducto(producto) {

    const columna =
        document.createElement("div");

    columna.className =
        "col-12 col-sm-6 col-lg-4 col-xl-3";


    columna.innerHTML = `

        <article class="product-card">

            <div class="product-image-container">

                <img
                    src="${producto.imagen}"
                    alt="Portada de ${producto.nombre}"
                    class="product-image"
                    loading="lazy">

                <span class="product-category">
                    ${producto.categoria}
                </span>

            </div>


            <div class="product-body">

                <h3 class="product-title">
                    ${producto.nombre}
                </h3>

                <p class="product-description">
                    ${producto.descripcion}
                </p>

                <div
                    class="d-flex justify-content-between
                    align-items-center gap-2 mt-3">

                    <span class="product-price">
                        ${formatearPrecio(producto.precio)}
                    </span>

                    <button
                        type="button"
                        class="btn btn-esmeralda btn-product"
                        data-action="agregar"
                        data-id="${producto.id}">

                        <i class="bi bi-cart-plus"></i>

                        <span class="d-none d-sm-inline">
                            Agregar
                        </span>

                    </button>

                </div>

            </div>

        </article>

    `;


    return columna;

}


/* filtro de productos */

function obtenerProductosFiltrados() {

    let productos =
        [...state.productos];


    /* por categoria     */
    if (state.categoriaActual !== "Todos") {

        productos =
            productos.filter(
                (producto) =>
                    producto.categoria ===
                    state.categoriaActual
            );

    }


    /*filtro por busqueda, sirve nombre, palabra en descripcion o categoria
     */
    if (state.terminoBusqueda) {

        const termino =
            state.terminoBusqueda.toLowerCase();

        productos =
            productos.filter((producto) => {

                const textoProducto = (

                    producto.nombre +
                    " " +
                    producto.categoria +
                    " " +
                    producto.descripcion

                ).toLowerCase();

                return textoProducto.includes(
                    termino
                );

            });

    }


    return productos;

}


/* busqueda */

function buscarProductos() {

    const input =
        $("#input-busqueda");

    const resultado =
        $("#resultado-busqueda");


    const termino =
        input.value.trim();


    /* validacion
     */
    if (termino.length === 0) {

        resultado.innerHTML = `
            <div class="alert alert-warning mb-0">

                <i class="bi bi-exclamation-circle me-2"></i>

                Escribe un nombre o palabra clave
                para realizar la búsqueda.

            </div>
        `;

        input.focus();

        return;

    }


    /*se guarda la buqueda     */
    state.terminoBusqueda =
        termino;


    /*se vuelven a mostrar los juegos    */
    mostrarProductos();


    const cantidad =
        obtenerProductosFiltrados().length;


    resultado.innerHTML = `
        <div class="small text-secondary">

            <i class="bi bi-check-circle text-esmeralda me-1"></i>

            Se encontraron
            <strong class="text-white">
                ${cantidad}
            </strong>
            resultado(s) para
            <strong class="text-esmeralda">
                "${termino}"
            </strong>.

        </div>
    `;


    $("#catalogo").scrollIntoView({
        behavior: "smooth"
    });

}


/* seleccion de categoria*/

function seleccionarCategoria(categoria) {

    state.categoriaActual =
        categoria;


    /* al cambiar se limpia la busqueda    */
    state.terminoBusqueda = "";

    $("#input-busqueda").value = "";

    $("#resultado-busqueda").innerHTML = "";


    /* se acrualizan los botones     */
    $$(".categoria-btn").forEach((boton) => {

        boton.classList.toggle(
            "active",
            boton.dataset.categoria === categoria
        );

    });


    /* se cambia el titulo     */
    actualizarTituloCategoria(categoria);


    /* se muestran productos     */
    mostrarProductos();

}


/*titulo de categoria */

function actualizarTituloCategoria(categoria) {

    const titulo =
        $("#titulo-catalogo");


    if (categoria === "Todos") {

        titulo.textContent =
            "Todos los videojuegos";

        return;

    }


    titulo.textContent =
        `Videojuegos de ${categoria}`;

}


/* juego destacado, se cambia cada 5 segundos*/

function iniciarJuegoDestacado() {

    cambiarJuegoDestacado();


    setInterval(
        cambiarJuegoDestacado,
        5000
    );

}


/* cambiar el juego destacado */

function cambiarJuegoDestacado() {

    if (state.productos.length === 0) {
        return;
    }


    let nuevoJuego;


    /* evita que se selecciones el mismo juego inmediatamente
     */
    do {

        const indice =
            Math.floor(
                Math.random() *
                state.productos.length
            );

        nuevoJuego =
            state.productos[indice];

    } while (
        state.productos.length > 1 &&
        nuevoJuego.id === state.juegoDestacado?.id
    );


    state.juegoDestacado =
        nuevoJuego;


    /*se actualiza el dom     */
    $("#destacado-imagen").src =
        nuevoJuego.imagen;

    $("#destacado-imagen").alt =
        `Portada de ${nuevoJuego.nombre}`;

    $("#destacado-categoria").textContent =
        nuevoJuego.categoria;

    $("#destacado-nombre").textContent =
        nuevoJuego.nombre;

    $("#destacado-descripcion").textContent =
        nuevoJuego.descripcion;

    $("#destacado-precio").textContent =
        formatearPrecio(
            nuevoJuego.precio
        );

}


/* agregar juego a carrito */

function agregarAlCarrito(id) {

    const producto =
        state.productos.find(
            (item) => item.id === id
        );


    /* se valida si existe     */
    if (!producto) {

        console.error(
            "Producto no encontrado:",
            id
        );

        return;

    }


    /* se valida si ya esta en carro     */
    const productoCarrito =
        state.carrito.find(
            (item) => item.id === id
        );


    if (productoCarrito) {

        /* si ya esta se aumenta la cantidad         */
        productoCarrito.cantidad++;

    } else {

        /* si no, se agrega         */
        state.carrito.push({

            ...producto,

            cantidad: 1

        });

    }


    /* se actualiza */
    actualizarCarrito();

}


/* para ctualizar carrito */

function actualizarCarrito() {

    const contenido =
        $("#contenido-carrito");


    /* se acrualiza contador     */
    const cantidadTotal =
        state.carrito.reduce(
            (total, producto) =>
                total + producto.cantidad,
            0
        );


    $("#contador-carrito").textContent =
        cantidadTotal;


    /* Carrito vacio     */
    if (state.carrito.length === 0) {

        contenido.innerHTML = `

            <div class="text-center py-5">

                <i class="bi bi-cart-x fs-1 text-secondary"></i>

                <h3 class="mt-3">
                    Tu carrito está vacío
                </h3>

                <p class="text-secondary mb-0">
                    Agrega algunos juegos para comenzar.
                </p>

            </div>

        `;

        $("#total-carrito").textContent =
            "$0";

        return;

    }


    /* crear contenido dinamicamente para gregar y elimar juegos del carrito, se agregan a fragment para no hacer append 
    * por cada adicion
     */
    contenido.replaceChildren();


    const fragment =
        document.createDocumentFragment();


    state.carrito.forEach((producto) => {

        const elemento =
            document.createElement("div");

        elemento.className =
            "carrito-item";


        elemento.innerHTML = `

            <img
                src="${producto.imagen}"
                alt="Portada de ${producto.nombre}"
                class="carrito-imagen">


            <div class="carrito-info">

                <h4>
                    ${producto.nombre}
                </h4>

                <div class="carrito-cantidad">
                    Cantidad: ${producto.cantidad}
                </div>

                <div class="carrito-precio">
                    ${formatearPrecio(
                        producto.precio *
                        producto.cantidad
                    )}
                </div>

            </div>


            <button
                type="button"
                class="btn btn-outline-danger
                btn-sm btn-eliminar"
                data-action="eliminar"
                data-id="${producto.id}"
                aria-label="Eliminar ${producto.nombre}">

                <i class="bi bi-trash3"></i>

                <span class="d-none d-md-inline">
                    Eliminar
                </span>

            </button>

        `;


        fragment.appendChild(elemento);

    });


    contenido.appendChild(fragment);


    /*
     * Calcular total.
     */
    const total =
        state.carrito.reduce(
            (suma, producto) =>
                suma +
                (
                    producto.precio *
                    producto.cantidad
                ),
            0
        );


    $("#total-carrito").textContent =
        formatearPrecio(total);

}


/* eliminar solo un juego */

function eliminarDelCarrito(id) {

    const indice =
        state.carrito.findIndex(
            (producto) =>
                producto.id === id
        );


    if (indice === -1) {
        return;
    }


    /* solo se elimina el seleccionado     */
    state.carrito.splice(
        indice,
        1
    );


    actualizarCarrito();

}


/* vaciar o eliminar todo el carrito */

function vaciarCarrito() {

    if (state.carrito.length === 0) {
        return;
    }



    state.carrito = [];


    /* se actualiza el dom     */
    actualizarCarrito();

}


/* formateo de precios */

function formatearPrecio(precio) {

    return new Intl.NumberFormat(
        "es-CL",
        {
            style: "currency",
            currency: "CLP",
            maximumFractionDigits: 0
        }
    ).format(precio);

}


/* mensaje de carga */

function mostrarCargando(
    container,
    mensaje
) {

    container.innerHTML = `

        <div class="estado-gamestore">

            <div class="d-flex
                align-items-center
                gap-3">

                <div
                    class="spinner-border text-success"
                    role="status">

                    <span class="visually-hidden">
                        Cargando...
                    </span>

                </div>

                <span>
                    ${mensaje}
                </span>

            </div>

        </div>

    `;

}


/* mensaje de errores */

function mostrarError(
    container,
    mensaje
) {

    container.innerHTML = `

        <div class="estado-error">

            <i class="bi bi-exclamation-triangle-fill me-2"></i>

            ${mensaje}

        </div>

    `;

}


/* oxultar estado */

function ocultarEstado(container) {

    container.replaceChildren();

}


/* se cierra navbar en movil */

function cerrarNavbarMovil() {

    const navbar =
        $("#menuPrincipal");


    if (
        navbar.classList.contains("show")
    ) {

        const collapse =
            bootstrap.Collapse.getInstance(
                navbar
            );

        if (collapse) {

            collapse.hide();

        }

    }

}