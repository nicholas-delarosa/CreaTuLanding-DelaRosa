import { useParams } from "react-router";
import { useState, useEffect, useContext } from "react";
import { CartContext } from "../../../context/CartContext";
import './ItemDetailContainer.css';

const ItemDetailContainer = ({ products }) => {
    const { nombre } = useParams();
    const [product, setProduct] = useState();
    const [quantity, setQuantity] = useState(1);
    const { addToCart } = useContext(CartContext);

    useEffect(() => {
        const decodedName = decodeURIComponent(nombre).toLowerCase();
        const element = products.find(
            (producto) => producto.title.toLowerCase() === decodedName
        );
        setProduct(element);
    }, [nombre, products]);

    const handleIncrement = () => {
        if (product && quantity < product.stock) {
            setQuantity(quantity + 1);
        }
    };

    const handleDecrement = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const handleAddToCart = async () => {
        if (product && quantity > 0) {
            // Agregar la cantidad seleccionada al carrito
            for (let i = 0; i < quantity; i++) {
                await addToCart(product);
            }
            
            // Resetear cantidad a 1 después de agregar
            setQuantity(1);
            alert(`Se agregaron ${quantity} unidades de ${product.title} al carrito`);
        }
    };

    if (!product) {
        return (
            <div className="product-card item-detail-container">
                <p>Producto no encontrado.</p>
            </div>
        );
    }

    return (
        <div className="product-card item-detail-container">
            <img src={product.image} alt={product.title} className="product-image" />
            <h3 className="product-title">{product.title}</h3>
            <p className="product-description">{product.description}</p>
            <p className="product-price"><b>Precio:</b> ${product.price}</p>
            <p className="product-category"><b>Categoría:</b> {product.category}</p>
            <p className="product-stock"><b>Stock disponible:</b> {product.stock}</p>
            
            {product.stock > 0 ? (
                <div className="quantity-controls">
                    <div className="quantity-selector">
                        <button
                            onClick={handleDecrement}
                            disabled={quantity <= 1}
                            className={`quantity-btn decrement ${quantity <= 1 ? 'disabled' : ''}`}
                        >
                            -
                        </button>
                        
                        <span className="quantity-display">
                            {quantity}
                        </span>
                        
                        <button
                            onClick={handleIncrement}
                            disabled={quantity >= product.stock}
                            className={`quantity-btn increment ${quantity >= product.stock ? 'disabled' : ''}`}
                        >
                            +
                        </button>
                    </div>
                    
                    <p className="price-total">
                        Total: ${product.price * quantity}
                    </p>
                    
                    <button
                        className="add-to-cart-btn add-to-cart-full"
                        onClick={handleAddToCart}
                    >
                        Agregar {quantity} al carrito
                    </button>
                </div>
            ) : (
                <div className="out-of-stock">
                    <p className="out-of-stock-message">
                        Sin stock disponible
                    </p>
                </div>
            )}
        </div>
    );
};

export default ItemDetailContainer;