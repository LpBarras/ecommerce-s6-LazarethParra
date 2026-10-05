function CartItem({ producto, eliminarDelCarrito }) {

    return (
        <div className="carrito-item">
            <img
                src={producto.imagen}
                alt={`Portada de ${producto.nombre}`}
                className="carrito-imagen" />

            <div className="carrito-info">
                <h4>{producto.nombre}</h4>
                <div className="carrito-cantidad">
                    Cantidad: {producto.cantidad}
                </div>
                <div className="carrito-precio">
                    {formatearPrecio(producto.precioOferta * producto.cantidad)}
                </div>
            </div>

            <button
                type="button"
                className="btn btn-outline-danger btn-sm btn-eliminar"
                onClick={() => eliminarDelCarrito(producto.id)}
                aria-label={`Eliminar ${producto.nombre}`}>
                <i className="bi bi-trash3"></i>
                <span className="d-none d-md-inline">Eliminar</span>
            </button>
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

export default CartItem
