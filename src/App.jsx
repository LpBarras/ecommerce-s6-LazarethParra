import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import SearchBar from './components/SearchBar'
import CategoryFilters from './components/CategoryFilters'
import ProductList from './components/ProductList'
import Cart from './components/Cart'
import Footer from './components/Footer'

function App() {

    /* estado */
    const [productos, setProductos] = useState([])
    const [carrito, setCarrito] = useState([])
    const [categoriaActual, setCategoriaActual] = useState('Todos')
    const [terminoBusqueda, setTerminoBusqueda] = useState('')
    const [terminoAplicado, setTerminoAplicado] = useState('')
    const [juegoDestacado, setJuegoDestacado] = useState(null)
    const [estadoCarga, setEstadoCarga] = useState('loading')
    const [cantidadResultados, setCantidadResultados] = useState(null)

    /* carga productos desde json con fetch */
    useEffect(() => {

        const controller = new AbortController()

        async function cargarProductos() {

            setEstadoCarga('loading')

            try {

                const respuesta = await fetch(
                    `${import.meta.env.BASE_URL}data/productos.json`,
                    {
                        cache: 'no-store',
                        signal: controller.signal
                    }
                )

                /* validacion */
                if (!respuesta.ok) {
                    throw new Error(`Error HTTP ${respuesta.status}`)
                }

                /* se convierte json */
                const productosCargados = await respuesta.json()

                /* se valida que el json tenga el catalogo */
                if (!Array.isArray(productosCargados) || productosCargados.length === 0) {
                    throw new Error('El archivo JSON no contiene productos válidos.')
                }

                /* se guardan los productos o juegos */
                setProductos(productosCargados)
                setEstadoCarga('success')

                /* se muestra un juego aleatorio */
                seleccionarJuegoAleatorio(productosCargados)

            } catch (error) {

                if (error.name === 'AbortError') {
                    return
                }

                console.error('Error al cargar productos:', error)
                setEstadoCarga('error')

            }
        }

        cargarProductos()

        /* cleanup para cancelar la peticion si el componente se desmonta */
        return () => controller.abort()

    }, [])

    /* juego destacado, se cambia cada 5 segundos */
    useEffect(() => {

        if (productos.length === 0) {
            return undefined
        }

        const intervalo = setInterval(() => {
            seleccionarJuegoAleatorio(productos)
        }, 5000)

        /* cleanup del temporizador */
        return () => clearInterval(intervalo)

    }, [productos])

    /* filtro de productos */
    const productosFiltrados = (() => {

        let productosResultado = [...productos]

        /* por categoria */
        if (categoriaActual !== 'Todos') {
            productosResultado = productosResultado.filter(
                (producto) => producto.categoria === categoriaActual
            )
        }

        /* filtro por busqueda, sirve nombre, palabra en descripcion o categoria */
        if (terminoAplicado) {
            const termino = terminoAplicado.toLowerCase()

            productosResultado = productosResultado.filter((producto) => {
                const textoProducto = (
                    producto.nombre + ' ' +
                    producto.categoria + ' ' +
                    producto.descripcion
                ).toLowerCase()

                return textoProducto.includes(termino)
            })
        }

        return productosResultado

    })()

    /* agregar juego a carrito */
    function agregarAlCarrito(producto) {

        if (!producto) {
            return
        }

        /* se valida si ya esta en carro */
        const productoYaExiste = carrito.some(
            (item) => item.id === producto.id
        )

           /* si ya existe, se aumenta la cantidad */

        if (productoYaExiste) {

        setCarrito((carritoActual) =>
            carritoActual.map((item) =>
                item.id === producto.id
                    ? {
                        ...item,
                        cantidad: item.cantidad + 1
                    }
                    : item
            )
        )

        return
    }
        /* se agrega usando setCarrito para actualizar el estado */
        setCarrito((carritoActual) => [
            ...carritoActual,
            {
                ...producto,
                cantidad: 1
            }
        ])
    }

    /* eliminar solo un juego */
    function eliminarDelCarrito(id) {

        /* se elimina el seleccionado usando setCarrito */
        setCarrito((carritoActual) =>
            carritoActual.filter((producto) => producto.id !== id)
        )
    }

    /* vaciar o eliminar todo el carrito */
    function vaciarCarrito() {
        if (carrito.length === 0) {
            return
        }

        setCarrito([])
    }

    /* busqueda */
    function buscarProductos() {

        const termino = terminoBusqueda.trim()

        /* validacion */
        if (termino.length === 0) {
            setCantidadResultados(null)
            setTerminoAplicado('')
            return
        }

        /* se guarda la busqueda */
        setTerminoAplicado(termino)

        /* la cantidad se actualiza al renderizar con los estados */
        const terminoMinuscula = termino.toLowerCase()
        const resultados = productos.filter((producto) => {

            const perteneceACategoria =
                categoriaActual === 'Todos' ||
                producto.categoria === categoriaActual

            const textoProducto = (
                producto.nombre + ' ' +
                producto.categoria + ' ' +
                producto.descripcion
            ).toLowerCase()

            return perteneceACategoria && textoProducto.includes(terminoMinuscula)
        })

        setCantidadResultados(resultados.length)

        /* se desplaza al catalogo */
        document.getElementById('catalogo')?.scrollIntoView({
            behavior: 'smooth'
        })
    }

    /* seleccion de categoria */
    function seleccionarCategoria(categoria) {

        setCategoriaActual(categoria)

        /* al cambiar se limpia la busqueda */
        setTerminoBusqueda('')
        setTerminoAplicado('')
        setCantidadResultados(null)

    }

    /* cambiar el juego destacado */
    function seleccionarJuegoAleatorio(listaProductos) {

        if (listaProductos.length === 0) {
            return
        }

        setJuegoDestacado((juegoActual) => {

            let nuevoJuego

            /* evita que se seleccione el mismo juego inmediatamente */
            do {
                const indice = Math.floor(
                    Math.random() * listaProductos.length
                )
                nuevoJuego = listaProductos[indice]
            } while (
                listaProductos.length > 1 &&
                nuevoJuego.id === juegoActual?.id
            )

            return nuevoJuego
        })
    }

    /* cambiar manualmente el juego destacado */
    function cambiarJuegoDestacado() {
        seleccionarJuegoAleatorio(productos)
    }

    /* verifica si un producto ya esta en el carrito */
    function estaEnCarrito(id) {
        return carrito.some((producto) => producto.id === id)
    }

    /* contador del carrito */
    const cantidadTotal = carrito.reduce(
        (total, producto) => total + producto.cantidad,
        0
    )

    /* calcular total */
    const totalCarrito = carrito.reduce(
        (total, producto) => total + producto.precioOferta * producto.cantidad,
        0
    )

    return (
        <>
            <Navbar
                cantidadCarrito={cantidadTotal}
                seleccionarCategoria={seleccionarCategoria} />

            <Hero
                juegoDestacado={juegoDestacado}
                cambiarJuegoDestacado={cambiarJuegoDestacado}
                agregarAlCarrito={agregarAlCarrito}
                estaEnCarrito={estaEnCarrito} />

            <SearchBar
                terminoBusqueda={terminoBusqueda}
                setTerminoBusqueda={setTerminoBusqueda}
                buscarProductos={buscarProductos}
                cantidadResultados={cantidadResultados} />

            {/* catalogo */}
            <main id="catalogo" className="catalogo-section">
                <div className="container">

                    {/* Encabezado */}
                    <div className="section-heading">
                        <div>
                            <span className="section-kicker">CATÁLOGO</span>
                            <h2 id="titulo-catalogo">
                                {categoriaActual === 'Todos'
                                    ? 'Todos los videojuegos'
                                    : `Videojuegos de ${categoriaActual}`}
                            </h2>
                        </div>

                        <div className="text-secondary small">
                            {estadoCarga === 'success'
                                ? `${productosFiltrados.length} producto(s)`
                                : 'Cargando productos...'}
                        </div>
                    </div>

                    <CategoryFilters
                        categoriaActual={categoriaActual}
                        seleccionarCategoria={seleccionarCategoria} />

                    {/* Estado de carga */}
                    {estadoCarga === 'loading' && (
                        <div className="mb-4" aria-live="polite">
                            <div className="estado-gamestore">
                                <div className="d-flex align-items-center gap-3">
                                    <div className="spinner-border text-success" role="status">
                                        <span className="visually-hidden">Cargando...</span>
                                    </div>
                                    <span>Cargando catálogo de videojuegos...</span>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Estado de error */}
                    {estadoCarga === 'error' && (
                        <div className="mb-4" aria-live="polite">
                            <div className="estado-error">
                                <i className="bi bi-exclamation-triangle-fill me-2"></i>
                                No pudimos cargar los juegos. Por favor, intenta nuevamente más tarde.
                            </div>
                        </div>
                    )}

                    {/* Productos */}
                    {estadoCarga === 'success' && (
                        <div className="row g-4">
                            <ProductList
                                productos={productosFiltrados}
                                agregarAlCarrito={agregarAlCarrito}
                                estaEnCarrito={estaEnCarrito} />
                        </div>
                    )}
                </div>
            </main>

            {/* carrito modal */}
            <div
                className="modal fade"
                id="modalCarrito"
                tabIndex="-1"
                aria-labelledby="tituloModalCarrito"
                aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-lg">
                    <div className="modal-content modal-gamestore">
                        <div className="modal-header">
                            <h2 className="modal-title fs-5" id="tituloModalCarrito">
                                <i className="bi bi-cart3 text-esmeralda me-2"></i>
                                Mi carrito
                            </h2>
                            <button
                                type="button"
                                className="btn-close btn-close-white"
                                data-bs-dismiss="modal"
                                aria-label="Cerrar"></button>
                        </div>

                        <div className="modal-body">
                            {/* Carrito dinámico */}
                            <Cart
                                carrito={carrito}
                                eliminarDelCarrito={eliminarDelCarrito}
                                vaciarCarrito={vaciarCarrito} />
                        </div>

                        <div className="modal-footer d-flex justify-content-between">
                            <button
                                id="btn-vaciar-carrito"
                                type="button"
                                className="btn btn-outline-danger"
                                onClick={vaciarCarrito}
                                disabled={carrito.length === 0}>
                                <i className="bi bi-trash3 me-1"></i>
                                Vaciar carrito
                            </button>

                            <div className="d-flex align-items-center gap-3">
                                <div className="total-carrito">
                                    Total: <strong>{formatearPrecio(totalCarrito)}</strong>
                                </div>
                                <button
                                    type="button"
                                    className="btn btn-esmeralda"
                                    data-bs-dismiss="modal">
                                    Seguir comprando
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    )
}

function formatearPrecio(precio) {
    return new Intl.NumberFormat('es-CL', {
        style: 'currency',
        currency: 'CLP',
        maximumFractionDigits: 0
    }).format(precio)
}

export default App
