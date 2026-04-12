import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    navigate("/login");
  }

  return (
    <nav
      style={{
        padding: "16px",
        borderBottom: "1px solid #ccc",
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        background: "#fff",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxSizing: "border-box",
      }}
    >
      <div>
        <Link to="/" style={{ marginRight: "16px" }}>Home</Link>
        <Link to="/my-product" style={{ marginRight: "16px" }}>Product</Link>
        <Link to="/cart" style={{ marginRight: "16px" }}>Cart</Link>
      </div>

      <button onClick={handleLogout}>Logout</button>
    </nav>
  );
}

export default Navbar;