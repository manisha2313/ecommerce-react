import { createContext, useContext, useState, useMemo } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState([]);

    function addToCart(product) {
        setCartItems((prev) => {
            const existingItem = prev.find((item) => item.id === product.id);

            if (existingItem) {
                return prev.map((item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item))
            }
            return [...prev, { ...product, quantity: 1 }];
        });
    }
    function removeFromCart(productId) {
        setCartItems((prev) => prev.filter((item) => item.id !== productId))
    }

    function decreaseQuantity(productId) {
        setCartItems((prev) =>
            prev.map((item) => item.id === productId ? { ...item, quantity: item.quantity - 1 } : item)
                .filter((item) => item.quantity > 0)
        );
    }

    function clearCart() {
        setCartItems([]);
    }

    const cartTotal = useMemo(() => {
        return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    }, [cartItems]);
    return (
        <>
            <CartContext.Provider value={{
                cartItems, addToCart, removeFromCart, decreaseQuantity,
                clearCart,
                cartTotal,
            }}>
                {children}
            </CartContext.Provider>
        </>
    );
}

export function useCart() {
    return useContext(CartContext);
}