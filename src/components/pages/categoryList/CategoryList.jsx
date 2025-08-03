import { Link } from "react-router";

function CategoryList({ products }) {
    // Obtiene categorías únicas
    const categories = Array.from(new Set(products.map(p => p.category)));
    const categoryImages = {
        "Ropa": "https://res.cloudinary.com/dw2auacau/image/upload/v1754262269/categoria-ropa.jpg",
        "Calzado": "https://res.cloudinary.com/dw2auacau/image/upload/v1754262320/categoria-calzado.jpg",
        "Electrónica": "https://res.cloudinary.com/dw2auacau/image/upload/v1754262380/categoria-electronica.jpg",
        "Hogar": "https://res.cloudinary.com/dw2auacau/image/upload/v1754262526/categoria-hogar.jpg"
    };

    return (
        <section className="item-list-container">
            <h2>Categorías</h2>
            <div className="products-grid">
                {categories.map(cat => (
                    <Link key={cat} to={`/categorias/${encodeURIComponent(cat.toLowerCase())}`}>
                        <div className="product-card" style={{ cursor: "pointer" }}>
                            <img
                                src={categoryImages[cat] || "https://via.placeholder.com/200"}
                                alt={cat}
                                className="product-image"
                            />
                            <h3 className="product-title">{cat}</h3>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}

export default CategoryList;