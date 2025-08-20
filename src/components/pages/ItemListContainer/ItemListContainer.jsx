import './ItemListContainer.css';
import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { db } from '../../../firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
// import { products } from '../../../data/products';

// const cargarProductos =  () => {
//     let productsCollection = collection(db, "products");
//     products.forEach((producto) => {
//         addDoc(productsCollection, producto);
//     });
// }

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
            {/* <button onClick={cargarProductos}>Cargar Productos</button> */}
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