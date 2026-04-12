


function Cart({cartItems,addToCart,clearCart,decreaseQuantity,removeFromCart}) {
const cartTotal = cartItems.reduce(
  (sum, item) => sum + item.price * item.quantity,
  0
);

  if (cartItems.length === 0) {
    return (
      <div style={{ padding: "20px" }}>
        <h1>Cart</h1>
        <p>Your cart is empty.</p>
      </div>
    );
  } 

  return (
    <div style={{ padding: "20px" }}>
      <h1>Cart</h1>

      {cartItems.map((item) => (
        <div
          key={item.id}
          style={{
            borderBottom: "1px solid #ddd",
            padding: "12px 0",
            display: "flex",
            justifyContent: "space-between",
            gap: "12px",
          }}
        >
          <div>
            <h3>{item.title}</h3>
            <p>Price: ${item.price}</p>
            <p>Quantity: {item.quantity}</p>
            <p>Subtotal: ${item.price * item.quantity}</p>
          </div>

          <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
            <button onClick={() => decreaseQuantity(item.id)}>-</button>
            <button onClick={() => addToCart(item)}>+</button>
            <button onClick={() => removeFromCart(item.id)}>Remove</button>
            </div>
        </div>
      ))}

      <h2>Total: ${cartTotal.toFixed(2)}</h2>
      <button onClick={clearCart}>Clear Cart</button>
    </div>
  );
}

export default Cart;