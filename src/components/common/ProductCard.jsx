import { Link } from 'react-router';

function ProductCard({ product, addToCart }) {
    return (
        <div className="product-card">
            <img
                src={product.image || "https://via.placeholder.com/200"}
                alt={product.title}
                className="product-image"
            />
            <h3 className="product-title">{product.title}</h3>
            <p className="product-description">{product.description}</p>
            <p className="product-price"><b>Precio:</b> ${product.price}</p>
            <button className="add-to-cart-btn" onClick={() => addToCart(product)}>
                Agregar al carrito
            </button>
            <Link to={`/producto/${encodeURIComponent(product.title.toLowerCase())}`}>
                <button className='view-details-btn'>
                    Ver detalles
                </button>
            </Link>
        </div>
    );
}

export default ProductCard;