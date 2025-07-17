import { useState } from 'react'
import NavBar from './components/layout/NavBar'
import ItemListContainer from './components/pages/ItemListContainer'
import MusicPlayer from './components/common/MusicPlayer'
import './index.css'
import { products as INITIAL_PRODUCTS } from './data/products'

function App() {
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState(INITIAL_PRODUCTS);

  const addToCart = (product) => {
    // Verifica si hay stock disponible
    const prodIndex = products.findIndex(p => p.id === product.id);
    if (products[prodIndex].stock > 0) {
      // Disminuye el stock
      const updatedProducts = [...products];
      updatedProducts[prodIndex] = {
        ...updatedProducts[prodIndex],
        stock: updatedProducts[prodIndex].stock - 1
      };
      setProducts(updatedProducts);
      setCart([...cart, product]);
    } else {
      alert("No hay stock disponible de este producto.");
    }
  };

  return (
    <div className="app-container">
      <NavBar cartCount={cart.length} />
      <MusicPlayer />
      <ItemListContainer
        greeting="¡Bienvenido a la tienda!"
        products={products}
        addToCart={addToCart}
      />
    </div>
  )
}

export default App
