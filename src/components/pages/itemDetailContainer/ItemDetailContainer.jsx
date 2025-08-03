import { useParams } from "react-router";
import { useState, useEffect } from "react";

const ItemDetailContainer = ({ products, addToCart }) => {
    const { id } = useParams();
    const [product, setProduct] = useState();

    useEffect(() => {
        const element = products.find((producto) => producto.id === id);
        setProduct(element);
    }, [id, products]);

    if (!product) {
        return <div>Producto no encontrado.</div>;
    }

    return (
        <div className="product-card" style={{ margin: "2rem auto", maxWidth: 400 }}>
            <img src={product.image} alt={product.title} className="product-image" />
            <h3 className="product-title">{product.title}</h3>
            <p className="product-description">{product.description}</p>
            <p className="product-price"><b>Precio:</b> ${product.price}</p>
            <p className="product-category"><b>Categoría:</b> {product.category}</p>
            <p className="product-stock"><b>Stock:</b> {product.stock}</p>
            <button
                className="add-to-cart-btn"
                onClick={() => addToCart(product)}
                disabled={product.stock === 0}
            >
                {product.stock === 0 ? "Sin stock" : "Agregar al carrito"}
            </button>
        </div>
    );
};

export default ItemDetailContainer;