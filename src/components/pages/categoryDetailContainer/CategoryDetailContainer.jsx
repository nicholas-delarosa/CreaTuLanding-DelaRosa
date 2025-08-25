import { useParams } from "react-router";
import ProductCard from "../../common/ProductCard";

function CategoryDetailContainer({ products }) {
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
                        <ProductCard key={product.id} product={product} />
                    ))
                )}
            </div>
        </section>
    );
}
export default CategoryDetailContainer;