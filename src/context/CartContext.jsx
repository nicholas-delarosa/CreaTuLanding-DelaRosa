import { createContext, useState, useEffect } from 'react';
import { db } from '../firebaseConfig';
import { collection, getDocs, doc, updateDoc, getDoc } from 'firebase/firestore';

export const CartContext = createContext();

const CartContextProvider = ({ children }) => {
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

  // Función para limpiar el carrito completamente y devolver todo el stock
  const clearCartWithStockReturn = async () => {
    try {
      // Agrupar productos para devolver stock correctamente
      const groupedCart = getGroupedCart();
      
      // Devolver stock de cada producto
      for (const item of groupedCart) {
        const productRef = doc(db, "products", item.id);
        const productSnap = await getDoc(productRef);
        
        if (productSnap.exists()) {
          const currentProduct = productSnap.data();
          
          // Devolver el stock en Firebase
          await updateDoc(productRef, {
            stock: currentProduct.stock + item.qty
          });
          
          // Actualizar el estado local de productos
          setProducts(prevProducts => 
            prevProducts.map(p => 
              p.id === item.id 
                ? { ...p, stock: p.stock + item.qty }
                : p
            )
          );
        }
      }
      
      // Limpiar el carrito después de devolver el stock
      setCart([]);
      
    } catch (error) {
      console.error("Error al devolver el stock:", error);
      alert("Error al limpiar el carrito.");
    }
  };

  const resetCart = () => {
    setCart([]);
  };

  // Calcular total del carrito agrupado
  const getTotalAmount = () => {
    const groupedCart = cart.reduce((acc, item) => {
      const found = acc.find((prod) => prod.id === item.id);
      if (found) {
        found.qty += 1;
      } else {
        acc.push({ ...item, qty: 1 });
      }
      return acc;
    }, []);

    return groupedCart.reduce((sum, item) => sum + item.price * item.qty, 0);
  };

  // Obtener cantidad total de productos en el carrito
  const getTotalQuantity = () => {
    return cart.length;
  };

  // Agrupar productos del carrito para mostrar
  const getGroupedCart = () => {
    return cart.reduce((acc, item) => {
      const found = acc.find((prod) => prod.id === item.id);
      if (found) {
        found.qty += 1;
      } else {
        acc.push({ ...item, qty: 1 });
      }
      return acc;
    }, []);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        products,
        setCart,
        addToCart,
        removeFromCart,
        resetCart,
        clearCartWithStockReturn,
        getTotalAmount,
        getTotalQuantity,
        getGroupedCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;