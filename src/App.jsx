import { useContext } from 'react'
import { BrowserRouter, Routes, Route} from 'react-router'
import NavBar from './components/layout/NavBar'
import ItemListContainer from './components/pages/ItemListContainer/ItemListContainer'
import MusicPlayer from './components/common/MusicPlayer'
import './index.css'
import NotFound404 from './components/pages/notFound404/NotFound404'
import ItemDetailContainer from './components/pages/itemDetailContainer/ItemDetailContainer'
import CategoryDetailContainer from './components/pages/categoryDetailContainer/CategoryDetailContainer'
import Carrito from './components/pages/carrito/Carrito'
import CategoryList from './components/pages/categoryList/CategoryList'
import Checkout from './components/pages/checkout/Checkout'
import CartContextProvider, { CartContext } from './context/CartContext'

function Layout ({ children }){
  return (
    <>
    <MusicPlayer />
    {children}
    </>
  )
}

function AppContent() {
  const {
    cart,
    products,
    setCart,
    addToCart,
    removeFromCart,
    getTotalQuantity,
    clearCartWithStockReturn
  } = useContext(CartContext);

  return (
    <BrowserRouter>
      <NavBar cartCount={getTotalQuantity()} />
      <Routes>
        <Route
          path='/'
          element={
            <Layout>
              <ItemListContainer
                greeting={"¡Bienvenido a la tienda!"}
                products={products}
                addToCart={addToCart}
              />
            </Layout>
          }
        />
        <Route
          path='/categorias'
          element={
            <Layout>
              <CategoryList
                products={products}
              />
            </Layout>
          }
        />
        <Route
          path='/carrito'
          element={
            <Layout>
              <Carrito
                cart={cart}
                setCart={setCart}
                removeFromCart={removeFromCart}
              />
            </Layout>
          }
        />
        <Route
          path='/checkout'
          element={
            <Layout>
              <Checkout
                cart={cart}
                setCart={setCart}
              />
            </Layout>
          }
        />
        <Route
          path='/categorias/:categoria'
          element={
            <Layout>
              <CategoryDetailContainer
                products={products}
                addToCart={addToCart}
              />
            </Layout>
          }
        />
        <Route
          path='/producto/:nombre'
          element={
            <Layout>
              <ItemDetailContainer
                products={products}
                addToCart={addToCart}
              />
            </Layout>
          }
        />
        <Route path='*' element={<NotFound404 />} />
      </Routes>
    </BrowserRouter>
  )
}

function App() {
  return (
    <CartContextProvider>
      <AppContent />
    </CartContextProvider>
  )
}

export default App