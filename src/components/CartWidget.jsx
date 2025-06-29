function CartWidget({ cartCount }) {
    return (
        <button className="cart-widget" type="button" aria-label="Ver carrito">
            <span role="img" aria-label="Carrito">🛒</span>
            <span className="cart-count">{cartCount}</span>
        </button>
    );
}

export default CartWidget;
