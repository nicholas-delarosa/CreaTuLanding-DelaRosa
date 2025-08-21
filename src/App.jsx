import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route} from 'react-router'
import NavBar from './components/layout/NavBar'
import ItemListContainer from './components/pages/itemListContainer/ItemListContainer'
import MusicPlayer from './components/common/MusicPlayer'
import './index.css'
import { db } from './firebaseConfig'
import { collection, getDocs, doc, updateDoc, getDoc } from 'firebase/firestore'
import NotFound404 from './components/pages/notFound404/NotFound404'
import ItemDetailContainer from './components/pages/itemDetailContainer/ItemDetailContainer'
import CategoryDetailContainer from './components/pages/categoryDetailContainer/CategoryDetailContainer'
import Carrito from './components/pages/carrito/Carrito'
import CategoryList from './components/pages/categoryList/CategoryList'
import Checkout from './components/pages/checkout/Checkout'

function Layout ({ children }){
  return (
    <>
    <MusicPlayer />
    {children}
    </>
  )
}

function App() {
  // Cargar carrito desde localStorage al iniciar
  const [cart, setCart] = useState(() => {
    const stored = localStorage.getItem('cart');
    return stored ? JSON.parse(stored) : [];
  });
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

  // Guardar carrito en localStorage cada vez que cambie
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = async (product) => {
    try {
      // Obtener el documento actual del producto desde Firebase
      const productRef = doc(db, "products", product.id);
      const productSnap = await getDoc(productRef);
      
      if (productSnap.exists()) {
        const currentProduct = productSnap.data();
        
        // Verificar si hay stock disponible
        if (currentProduct.stock > 0) {
          // Actualizar el stock en Firebase
          await updateDoc(productRef, {
            stock: currentProduct.stock - 1
          });
          
          // Actualizar el estado local de productos
          setProducts(prevProducts => 
            prevProducts.map(p => 
              p.id === product.id 
                ? { ...p, stock: p.stock - 1 }
                : p
            )
          );
          
          // Agregar producto al carrito
          setCart(prevCart => [...prevCart, product]);
          
          console.log(`Stock actualizado en Firebase. Nuevo stock: ${currentProduct.stock - 1}`);
        } else {
          alert("No hay stock disponible de este producto.");
        }
      } else {
        alert("Producto no encontrado en la base de datos.");
      }
    } catch (error) {
      console.error("Error al actualizar el stock:", error);
      alert("Error al procesar la compra. Intenta nuevamente.");
    }
  };

  // Función para devolver stock cuando se elimina del carrito
  const removeFromCart = async (productId) => {
    try {
      // Encuentra el primer producto con ese id y lo elimina del carrito
      const indexToRemove = cart.findIndex(item => item.id === productId);
      if (indexToRemove !== -1) {
        const updatedCart = [...cart];
        updatedCart.splice(indexToRemove, 1);
        setCart(updatedCart);

        // Obtener el documento actual del producto desde Firebase
        const productRef = doc(db, "products", productId);
        const productSnap = await getDoc(productRef);
        
        if (productSnap.exists()) {
          const currentProduct = productSnap.data();
          
          // Devolver el stock en Firebase
          await updateDoc(productRef, {
            stock: currentProduct.stock + 1
          });
          
          // Actualizar el estado local de productos
          setProducts(prevProducts => 
            prevProducts.map(p => 
              p.id === productId 
                ? { ...p, stock: p.stock + 1 }
                : p
            )
          );
          
          console.log(`Stock devuelto en Firebase. Nuevo stock: ${currentProduct.stock + 1}`);
        }
      }
    } catch (error) {
      console.error("Error al devolver el stock:", error);
      alert("Error al eliminar el producto del carrito.");
    }
  };

  return (
    <BrowserRouter>
      <NavBar cartCount={cart.length} />
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

export default App