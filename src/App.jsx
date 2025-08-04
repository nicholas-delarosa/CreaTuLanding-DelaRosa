import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route} from 'react-router'
import NavBar from './components/layout/NavBar'
import ItemListContainer from './components/pages/ItemListContainer/ItemListContainer'
import MusicPlayer from './components/common/MusicPlayer'
import './index.css'
import { products as INITIAL_PRODUCTS } from './data/products'
import NotFound404 from './components/pages/notFound404/NotFound404'
import ItemDetailContainer from './components/pages/itemDetailContainer/ItemDetailContainer'
import CategoryDetailContainer from './components/pages/categoryDetailContainer/CategoryDetailContainer'
import Carrito from './components/pages/carrito/Carrito'
import CategoryList from './components/pages/categoryList/CategoryList'

function App() {
  // Cargar carrito desde localStorage al iniciar
  const [cart, setCart] = useState(() => {
    const stored = localStorage.getItem('cart');
    return stored ? JSON.parse(stored) : [];
  });
  const [products, setProducts] = useState(INITIAL_PRODUCTS);

  // Guardar carrito en localStorage cada vez que cambie
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

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

  // Nueva función para borrar un producto del carrito
  const removeFromCart = (productId) => {
    // Encuentra el primer producto con ese id y lo elimina
    const indexToRemove = cart.findIndex(item => item.id === productId);
    if (indexToRemove !== -1) {
      const updatedCart = [...cart];
      updatedCart.splice(indexToRemove, 1);
      setCart(updatedCart);

      // Devuelve el stock al producto
      const prodIndex = products.findIndex(p => p.id === productId);
      if (prodIndex !== -1) {
        const updatedProducts = [...products];
        updatedProducts[prodIndex] = {
          ...updatedProducts[prodIndex],
          stock: updatedProducts[prodIndex].stock + 1
        };
        setProducts(updatedProducts);
      }
    }
  };

  return (
    <BrowserRouter>
      <NavBar cartCount={cart.length} />
      <Routes>
        <Route path='/' element={[<MusicPlayer />, <ItemListContainer greeting={"¡Bienvenido a la tienda!"} products={products} addToCart={addToCart}/>]} />
        <Route path='/categorias' element={[<MusicPlayer />, <CategoryList products={products} />]} />
        <Route path='/carrito' element={[<MusicPlayer />, <Carrito cart={cart} setCart={setCart} removeFromCart={removeFromCart} />]} />
        <Route path='/categorias/:categoria' element={[<MusicPlayer />, <CategoryDetailContainer products={products} addToCart={addToCart} />]} />
        <Route path='/producto/:nombre' element={[<MusicPlayer />, <ItemDetailContainer products={products} addToCart={addToCart} />]} />
        <Route path='*' element={<NotFound404 />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
