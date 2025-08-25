import { useState, useContext } from "react";
import { db } from "../../../firebaseConfig";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { CartContext } from '../../../context/CartContext';
import './Checkout.css';

const Checkout = () => {
  const { 
    cart, 
    getTotalAmount, 
    getGroupedCart, 
    resetCart 
  } = useContext(CartContext);

  const [user, setUser] = useState({
    nombre: "",
    telefono: "",
    email: "",
  });
  const [orderId, setOrderId] = useState(null);

  const handleSubmit = async (evento) => {
    evento.preventDefault();
    
    if (!user.nombre || !user.telefono || !user.email) {
      alert("Por favor completa todos los campos");
      return;
    }

    try {
      // Usar la función del contexto para agrupar productos
      const groupedCart = getGroupedCart();
      let total = getTotalAmount();
      
      let objetoCompra = {
        buyer: user,
        items: groupedCart,
        total: total,
        fecha: new Date().toISOString()
      };

      // Crear la orden en Firebase
      let ordersCollection = collection(db, "orders");
      let res = await addDoc(ordersCollection, objetoCompra);
      
      setOrderId(res.id);
      resetCart(); // Usar resetCart del contexto (no devuelve stock porque ya se descontó al agregar)

      // Nota: No necesitamos actualizar stock aquí porque ya se descontó al agregar al carrito
      // El stock ya fue actualizado en Firebase cuando se agregaron los productos

    } catch (error) {
      alert("Ocurrió un error al procesar la compra");
      console.error(error);
    }
  };

  const handleChange = (evento) => {
    setUser({ ...user, [evento.target.name]: evento.target.value });
  };

  // Usar la función del contexto para agrupar
  const groupedCart = getGroupedCart();

  return (
    <section className="checkout-container card">
      {orderId ? (
        <div className="order-success">
          <h2 className="success-title">¡Compra realizada con éxito! 🎉</h2>
          <p className="order-number">
            Tu número de orden es: <span className="order-id">{orderId}</span>
          </p>
          <p className="success-message">
            Recibirás un email de confirmación en breve.
          </p>
        </div>
      ) : (
        <>
          <header>
            <h2 className="checkout-title">Finalizar Compra</h2>
          </header>
          
          {cart.length === 0 ? (
            <p className="empty-cart">No hay productos en el carrito para comprar.</p>
          ) : (
            <>
              {/* Resumen de la compra */}
              <div className="order-summary">
                <h3 className="summary-title">Resumen de tu pedido</h3>
                <ul className="checkout-items">
                  {groupedCart.map((item) => (
                    <li key={item.id} className="checkout-item">
                      <span className="item-name">{item.title}</span>
                      <span className="item-details">
                        ${item.price} x {item.qty} = ${item.price * item.qty}
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="total-amount">
                  <strong>Total: ${getTotalAmount()}</strong>
                </div>
              </div>

              {/* Formulario de datos del comprador */}
              <form onSubmit={handleSubmit} className="checkout-form">
                <h3 className="form-title">Datos del comprador</h3>
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Nombre completo"
                    name="nombre"
                    value={user.nombre}
                    onChange={handleChange}
                    className="form-input"
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="tel"
                    placeholder="Teléfono"
                    name="telefono"
                    value={user.telefono}
                    onChange={handleChange}
                    className="form-input"
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    value={user.email}
                    onChange={handleChange}
                    className="form-input"
                    required
                  />
                </div>
                <button type="submit" className="checkout-button">
                  Confirmar Compra
                </button>
              </form>
            </>
          )}
        </>
      )}
    </section>
  );
};

export default Checkout;