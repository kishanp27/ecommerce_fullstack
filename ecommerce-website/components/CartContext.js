const { createContext, useState, useEffect } = require("react");
import dynamic from "next/dynamic";

export const CartContext = createContext({});

function CartContextProvider({ children }) {
  const ls = typeof window !== "undefined" ? window.localStorage : null;
  const defaultProducts = ls ? JSON.parse(ls.getItem('cart')) : [];

  const [cartProducts, setCartProducts] = useState(
     defaultProducts || []
  );

  useEffect(() => {
    if (cartProducts?.length > 0) {
      ls?.setItem('cart', JSON.stringify(cartProducts));
    }else if(ls.getItem('cart')){
      ls.removeItem('cart');
    }
  }, [cartProducts]);

  
  function addProductToCart({...productInfo}) {
    setCartProducts((prev) => [...prev, {...productInfo}]);
  }

  function removeProductFromCart(productInfo){
    const pos = cartProducts.indexOf(productInfo);
    setCartProducts(prev => {
      if(pos === -1){
        return prev;
      }
      return prev.filter((value,index) => pos !== index)
    })
  }

  function clearCart() {
    setCartProducts([]);
  }

  return (
    <CartContext.Provider
      value={{ cartProducts, setCartProducts, addProductToCart, removeProductFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default dynamic (() => Promise.resolve(CartContextProvider), {ssr: false})
