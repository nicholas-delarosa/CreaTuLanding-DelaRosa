import './ItemListContainer.css';

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
            <p className="product-category"><b>Categoría:</b> {product.category}</p>
            <p className="product-stock"><b>Stock:</b> {product.stock}</p>
            <button className="add-to-cart-btn" onClick={() => addToCart(product)}>
                Agregar al carrito
            </button>
        </div>
    );
}

function ItemListContainer({ greeting, products, addToCart }) {
    return (
        <section className="item-list-container">
            <h2>{greeting}</h2>
            <div className="products-grid">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} addToCart={addToCart} />
                ))}
            </div>
        </section>
    );
}

export default ItemListContainer;