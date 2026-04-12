import { useState } from "react";
import AppRoutes from "./routes/AppRoutes";

function App() {
  const [cartItems, setCartItems] = useState([]);

  function addToCart(product) {
 
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.id === product.id);

      if (existingItem) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prev, { ...product, quantity: 1 }];
    });
  }

  function removeFromCart(productId) {
    setCartItems((prev) => prev.filter((item) => item.id !== productId));
  }
 function decreaseQuantity(productId) {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }

  function clearCart() {
    setCartItems([]);
  }

  return (
    <AppRoutes
      cartItems={cartItems}
      addToCart={addToCart}
       decreaseQuantity={decreaseQuantity}
        clearCart={clearCart}
        removeFromCart={removeFromCart}
    />
  );
}

export default App;