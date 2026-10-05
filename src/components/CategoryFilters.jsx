function CategoryFilters({ categoriaActual, seleccionarCategoria }) {

    /* filtro de productos por categoria */
    const categorias = [
        { nombre: 'Todos' },
        { nombre: 'PlayStation', icono: 'bi-playstation' },
        { nombre: 'Xbox', icono: 'bi-xbox' },
        { nombre: 'Nintendo', icono: 'bi-nintendo-switch' }
    ]

    return (
        <div className="category-filters mb-4">
            {categorias.map((categoria) => (
                <button
                    key={categoria.nombre}
                    type="button"
                    className={`btn btn-filtro ${categoriaActual === categoria.nombre ? 'active' : ''}`}
                    onClick={() => seleccionarCategoria(categoria.nombre)}>
                    {categoria.icono && <i className={`bi ${categoria.icono} me-1`}></i>}
                    {categoria.nombre}
                </button>
            ))}
        </div>
    )
}

export default CategoryFilters
