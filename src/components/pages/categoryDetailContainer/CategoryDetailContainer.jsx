import { useParams } from "react-router";
import { Link } from "react-router"; // Agrega esta línea

function CategoryDetailContainer({ products, addToCart }) {
    const { categoria } = useParams();
    const filtered = products.filter(
        (prod) => prod.category.toLowerCase() === decodeURIComponent(categoria).toLowerCase()
    );
    return (
        <section className="item-list-container">
            <h2>Productos de la categoría: {categoria}</h2>
            <div className="products-grid">
                {filtered.length === 0 ? (
                    <p>No hay productos en esta categoría.</p>
                ) : (
                    filtered.map((product) => (
                        <div key={product.id} className="product-card">
                            <img src={product.image} alt={product.title} className="product-image" />
                            <h3 className="product-title">{product.title}</h3>
                            <p className="product-description">{product.description}</p>
                            <p className="product-price"><b>Precio:</b> ${product.price}</p>
                            <p className="product-stock"><b>Stock:</b> {product.stock}</p>
                            <button
                                className="add-to-cart-btn"
                                onClick={() => addToCart(product)}
                                disabled={product.stock === 0}
                            >
                                {product.stock === 0 ? "Sin stock" : "Agregar al carrito"}
                            </button>
                            <Link to={`/producto/${encodeURIComponent(product.title.toLowerCase())}`}>
                                <button className='view-details-btn'>
                                    Ver detalles
                                </button>
                            </Link>
                        </div>
                    ))
                )}
            </div>
        </section>
    );
}
export default CategoryDetailContainer;