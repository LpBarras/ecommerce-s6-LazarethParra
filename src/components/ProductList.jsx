import ProductCard from './ProductCard'

function ProductList({ productos, agregarAlCarrito, estaEnCarrito }) {

    /* mostrar juegos */
    if (productos.length === 0) {
        return (
            <div className="col-12">
                <div className="estado-gamestore text-center">
                    <i className="bi bi-search fs-2 text-esmeralda"></i>
                    <h3 className="mt-3">No encontramos juegos</h3>
                    <p className="mb-0">
                        Prueba con otro nombre, categoría o palabra.
                    </p>
                </div>
            </div>
        )
    }

    /* se muestran los productos usando .map() */
    return (
        <>
            {productos.map((producto) => (
                <ProductCard
                    key={producto.id}
                    producto={producto}
                    agregarAlCarrito={agregarAlCarrito}
                    estaEnCarrito={estaEnCarrito} />
            ))}
        </>
    )
}

export default ProductList
