function ProductCard({ producto, agregarAlCarrito, estaEnCarrito }) {

    /* crea tarjeta de juego */
    const enCarrito = estaEnCarrito(producto.id)

    return (
        <div className="col-12 col-sm-6 col-lg-4 col-xl-3">
            <article className="product-card">
                <div className="product-image-container">
                    <img
                        src={producto.imagen}
                        alt={`Portada de ${producto.nombre}`}
                        className="product-image"
                        loading="lazy" />
                    <span className="product-category">
                        {producto.categoria}
                    </span>
                </div>

                <div className="product-body">
                    <h3 className="product-title">
                        {producto.nombre}
                    </h3>

                    <p className="product-description">
                        {producto.descripcion}
                    </p>

                    <div className="product-prices mt-3">
                        <span className="price-original">
                            {formatearPrecio(producto.precio)}
                        </span>
                        <span className="product-price">
                            {formatearPrecio(producto.precioOferta)}
                        </span>
                    </div>

                    <div className="d-flex justify-content-end mt-3">
                        <button
                            type="button"
                            className={`btn ${enCarrito ? 'btn-en-carrito' : 'btn-esmeralda'} btn-product`}
                            onClick={() => agregarAlCarrito(producto)}
>
                            <i className={`bi ${enCarrito ? 'bi-check-circle' : 'bi-cart-plus'}`}></i>
                            <span className="d-none d-sm-inline">
                                {enCarrito ? 'En el carrito' : 'Agregar'}
                            </span>
                        </button>
                    </div>
                </div>
            </article>
        </div>
    )
}

function formatearPrecio(precio) {
    return new Intl.NumberFormat('es-CL', {
        style: 'currency',
        currency: 'CLP',
        maximumFractionDigits: 0
    }).format(precio)
}

export default ProductCard
