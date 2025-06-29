import { useState } from 'react'
import NavBar from './components/NavBar'
import ItemListContainer from './components/ItemListContainer'
import MusicPlayer from './components/MusicPlayer'
import './index.css'

const PRODUCTS = [
  { id: 1, name: 'Remera', price: 20 },
  { id: 2, name: 'Pantalón', price: 35 },
  { id: 3, name: 'Zapatillas', price: 50 },
  { id: 4, name: 'Campera', price: 80 },
  { id: 5, name: 'Gorra', price: 15 },
  { id: 6, name: 'Bufanda', price: 18 },
  { id: 7, name: 'Medias', price: 8 },
  { id: 8, name: 'Short', price: 22 },
  { id: 9, name: 'Camisa', price: 30 },
  { id: 10, name: 'Cinturón', price: 12 }
];

function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  return (
    <div className="app-container">
      <NavBar cartCount={cart.length} />
      <MusicPlayer />
      <ItemListContainer
        greeting="¡Bienvenido a la tienda!"
        products={PRODUCTS}
        addToCart={addToCart}
      />
    </div>
  )
}

export default App
