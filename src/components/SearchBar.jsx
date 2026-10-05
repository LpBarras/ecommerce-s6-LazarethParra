function SearchBar({ terminoBusqueda, setTerminoBusqueda, buscarProductos, cantidadResultados }) {

    /* buscador */
    const manejarSubmit = (evento) => {
        evento.preventDefault()
        buscarProductos()
    }

    return (
        <section className="search-section">
            <div className="container">
                <div className="search-box">
                    <div className="row align-items-center g-3">
                        <div className="col-lg-5">
                            <h2 className="search-title mb-1">
                                <i className="bi bi-search text-esmeralda me-2"></i>
                                Busca tu próximo juego
                            </h2>
                            <p className="search-description mb-0">
                                Busca por nombre, consola o palabras clave.
                            </p>
                        </div>

                        <div className="col-lg-7">
                            <form className="search-form" onSubmit={manejarSubmit} noValidate>
                                <div className="input-group">
                                    <label htmlFor="input-busqueda" className="visually-hidden">
                                        Buscar
                                    </label>
                                    <input
                                        type="search"
                                        id="input-busqueda"
                                        className="form-control search-input"
                                        placeholder="Ej: Mario, fútbol, carreras..."
                                        autoComplete="off"
                                        value={terminoBusqueda}
                                        onChange={(evento) => setTerminoBusqueda(evento.target.value)} />
                                    <button type="submit" className="btn btn-esmeralda">
                                        <i className="bi bi-search me-1"></i>
                                        Buscar
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

                    {cantidadResultados !== null && (
                        <div className="mt-3 small text-secondary" aria-live="polite">
                            <i className="bi bi-check-circle text-esmeralda me-1"></i>
                            Se encontraron <strong className="text-white">{cantidadResultados}</strong> resultado(s) para <strong className="text-esmeralda">"{terminoBusqueda}"</strong>.
                        </div>
                    )}
                </div>
            </div>
        </section>
    )
}

export default SearchBar
