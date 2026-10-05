function Hero({ juegoDestacado, cambiarJuegoDestacado, agregarAlCarrito, estaEnCarrito }) {

    return (
        /* portada */
        <header id="inicio" className="hero-section">
            <div className="container">
                <div className="row align-items-center g-5">

                    {/* Texto */}
                    <div className="col-lg-6">
                        <span className="badge badge-esmeralda mb-3">
                            <i className="bi bi-controller me-1"></i>
                            Especialmente para ti
                        </span>

                        <h1 className="hero-title">
                            Vive la experiencia <span className="text-esmeralda">gaming</span>
                        </h1>

                        <p className="hero-text">
                            Encuentra tus videojuegos favoritos para PlayStation, Xbox y Nintendo.
                        </p>

                        <div className="d-flex flex-wrap gap-3">
                            <a href="#catalogo" className="btn btn-esmeralda btn-lg">
                                <i className="bi bi-grid-3x3-gap me-2"></i>
                                Ver catálogo
                            </a>

                            <button
                                id="btn-ver-destacado"
                                className="btn btn-outline-light btn-lg"
                                onClick={cambiarJuegoDestacado}>
                                <i className="bi bi-stars me-2"></i>
                                Juego destacado
                            </button>
                        </div>
                    </div>

                    {/* Juego destacado */}
                    <div className="col-lg-6">
                        <div id="juego-destacado" className="featured-card">
                            <div className="featured-image-container">
                                <img
                                    src={juegoDestacado?.imagen || ''}
                                    alt={juegoDestacado ? `Portada de ${juegoDestacado.nombre}` : 'Juego destacado'} />
                                <div className="featured-overlay"></div>
                                <span className="featured-label">
                                    <i className="bi bi-stars me-1"></i>
                                    DESTACADO
                                </span>
                            </div>

                            <div className="featured-content">
                                <span className="small text-esmeralda fw-semibold">
                                    {juegoDestacado?.categoria || 'Cargando...'}
                                </span>
                                <h2>{juegoDestacado?.nombre || 'Cargando...'}</h2>
                                <p>
                                    {juegoDestacado?.descripcion || 'Cargando juego destacado...'}
                                </p>

                                <div className="d-flex justify-content-between align-items-center gap-3">
                                    <div>
                                        {juegoDestacado && (
                                            <>
                                                <span className="price-original featured-original-price">
                                                    {formatearPrecio(juegoDestacado.precio)}
                                                </span>
                                                <strong className="featured-price d-block">
                                                    {formatearPrecio(juegoDestacado.precioOferta)}
                                                </strong>
                                            </>
                                        )}
                                    </div>

                                    <button
                                        className="btn btn-esmeralda"
                                        onClick={() => juegoDestacado && agregarAlCarrito(juegoDestacado)}
>
                                        <i className="bi bi-cart-plus me-1"></i>
                                        {juegoDestacado && estaEnCarrito(juegoDestacado.id) ? 'En el carrito' : 'Agregar'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}

function formatearPrecio(precio) {
    return new Intl.NumberFormat('es-CL', {
        style: 'currency',
        currency: 'CLP',
        maximumFractionDigits: 0
    }).format(precio)
}

export default Hero
