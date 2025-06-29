function ItemListContainer({ greeting, products, addToCart }) {
    return (
        <section className="card">
            <h2>{greeting}</h2>
            <ul className="product-list">
                {products.map((product) => (
                    <li key={product.id} className="product-list-item">
                        <div className="product-info">
                            <strong>{product.name}</strong>
                            <span> - ${product.price}</span>
                        </div>
                        <button
                            className="button"
                            onClick={() => addToCart(product)}
                        >
                            Agregar al carrito
                        </button>
                    </li>
                ))}
            </ul>
        </section>
    );
}

export default ItemListContainer;