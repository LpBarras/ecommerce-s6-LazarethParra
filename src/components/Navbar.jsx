function Navbar({ cantidadCarrito, seleccionarCategoria }) {

    /* barra */
    const manejarCategoria = (categoria) => {

        seleccionarCategoria(categoria)

        const catalogo = document.getElementById('catalogo')

        if (catalogo) {
            catalogo.scrollIntoView({
                behavior: 'smooth'
            })
        }

        /*se desplaza al catalogo             */
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark navbar-gamestore sticky-top">
            <div className="container">

                <a className="navbar-brand fw-bold d-flex align-items-center gap-2" href="#inicio">
                    <span className="brand-icon">
                        <i className="bi bi-controller"></i>
                    </span>
                    <span>GAME<span className="text-esmeralda">STORE</span></span>
                </a>

                {/* Botón menu móvil */}
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#menuPrincipal"
                    aria-controls="menuPrincipal"
                    aria-expanded="false"
                    aria-label="Abrir menú">
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* Menú */}
                <div className="collapse navbar-collapse" id="menuPrincipal">
                    <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a className="nav-link active" href="#inicio">Inicio</a>
                        </li>
                        {['PlayStation', 'Xbox', 'Nintendo'].map((categoria) => (
                            <li className="nav-item" key={categoria}>
                                <button
                                    type="button"
                                    className="nav-link btn btn-link categoria-link"
                                    onClick={() => manejarCategoria(categoria)}>
                                    {categoria}
                                </button>
                            </li>
                        ))}
                    </ul>

                    {/* Botón carrito */}
                    <button
                        id="btn-carrito"
                        className="btn btn-carrito position-relative"
                        type="button"
                        data-bs-toggle="modal"
                        data-bs-target="#modalCarrito">
                        <i className="bi bi-cart3"></i>
                        Carrito
                        <span className="badge rounded-pill contador-carrito">
                            {cantidadCarrito}
                        </span>
                    </button>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
