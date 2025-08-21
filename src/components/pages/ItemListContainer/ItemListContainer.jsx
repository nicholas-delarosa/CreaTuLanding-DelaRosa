import './ItemListContainer.css';
import { useEffect, useState } from 'react';
import { db } from '../../../firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import ProductCard from '../../common/ProductCard';

function ItemListContainer({ greeting, addToCart }) {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const productsCollection = collection(db, "products");
            const snapshot = await getDocs(productsCollection);
            const productsFromDB = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setProducts(productsFromDB);
        };
        fetchProducts();
    }, []);

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