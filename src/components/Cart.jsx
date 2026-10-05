import CartItem from './CartItem'

function Cart({ carrito, eliminarDelCarrito, vaciarCarrito }) {

    /* Carrito vacio */
    if (carrito.length === 0) {
        return (
            <div className="text-center py-5">
                <i className="bi bi-cart-x fs-1 text-secondary"></i>
                <h3 className="mt-3">Tu carrito está vacío</h3>
                <p className="text-secondary mb-0">
                    Agrega algunos juegos para comenzar.
                </p>
            </div>
        )
    }

    /* crear contenido dinamicamente para agregar y eliminar juegos */
    return (
        <>
            {carrito.map((producto) => (
                <CartItem
                    key={producto.id}
                    producto={producto}
                    eliminarDelCarrito={eliminarDelCarrito} />
            ))}
        </>
    )
}

export default Cart
