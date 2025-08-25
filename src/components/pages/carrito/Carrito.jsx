import { useContext } from 'react';
import { Link } from 'react-router';
import { CartContext } from '../../../context/CartContext';

function Carrito() {
    const { 
        cart, 
        removeFromCart, 
        getTotalAmount, 
        getGroupedCart,
        clearCartWithStockReturn 
    } = useContext(CartContext);

    // Usar la función del contexto que agrupa productos
    const groupedCart = getGroupedCart();
    const total = getTotalAmount();

    const handleClearCart = async () => {
        if (window.confirm("¿Estás seguro de que quieres vaciar el carrito?")) {
            await clearCartWithStockReturn();
        }
    };

    return (
        <section className="card">
            <header>
                <h2 className="cart-title">Carrito</h2>
            </header>
            <main>
                {groupedCart.length === 0 ? (
                    <p className="empty-cart">Tu carrito está vacío.</p>
                ) : (
                    <>
                        <ul className="cart-list">
                            {groupedCart.map((item) => (
                                <li key={item.id} className="cart-item">
                                    <span className="item-name">{item.title}</span>
                                    <span className="item-price" style={{ marginLeft: 8 }}>
                                        ${item.price}
                                        {item.qty > 1 && (
                                            <>
                                                {" x" + item.qty}
                                                <span style={{ color: "#64748b", marginLeft: 8 }}>
                                                    (Total: ${item.price * item.qty})
                                                </span>
                                            </>
                                        )}
                                    </span>
                                    <button
                                        className="remove-btn"
                                        onClick={() => removeFromCart(item.id)}
                                        title="Eliminar uno"
                                    >
                                        🗑️
                                    </button>
                                </li>
                            ))}
                        </ul>
                        <div className="total">
                            <strong>Total: ${total}</strong>
                        </div>
                        <div className="cart-actions">
                            <button className="remove-btn-cart" onClick={handleClearCart}>
                                Vaciar Carrito
                            </button>
                            <Link to="/checkout">
                                <button className="pay-button">
                                    Proceder al Checkout
                                </button>
                            </Link>
                        </div>
                    </>
                )}
            </main>
        </section>
    );
}

export default Carrito;