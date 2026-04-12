import { BrowserRouter, Routes, Route, Navigate  } from "react-router-dom";
import AppLayout from "../layouts/AppLayout";
import AuthLayout from "../layouts/AuthLayout"
import ProtectedRoute from "../components/ProtectedRoute";

import Login from "../pages/Login";
import Home from "../pages/Home";
import MyProducts from "../pages/MyProducts";
import ProductDetails from "../pages/ProductDetails";
import Cart from "../pages/Cart.jsx";


function AppRoutes({ cartItems, addToCart, clearCart,decreaseQuantity,removeFromCart }) {

    return (    
        <>
            <BrowserRouter>
                <Routes>
                    {/* public routes */}
                    <Route element={<AuthLayout />}>
                        <Route path="/login" element={<Login />} />
                    </Route>
                    {/* Protected Route */}
                    <Route element={<ProtectedRoute />} >
                        <Route element={<AppLayout />}>
                            <Route path="/" element={<Home />} />
                            <Route path="/my-product" element={<MyProducts addToCart={addToCart}/>}  />
                            <Route path="/products/:id" element={<ProductDetails addToCart={addToCart}/>}  />
                            <Route path="/cart" element={<Cart addToCart={addToCart} cartItems={cartItems} clearCart={clearCart} decreaseQuantity={decreaseQuantity} removeFromCart={removeFromCart}/>}  />
                        </Route>
                    </Route>
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default AppRoutes;