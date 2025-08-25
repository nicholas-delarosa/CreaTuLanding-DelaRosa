import './ItemListContainer.css';
import { useContext } from 'react';
import { CartContext } from '../../../context/CartContext';
import ProductCard from '../../common/ProductCard';

function ItemListContainer({ greeting }) {
    const { products, addToCart } = useContext(CartContext);

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