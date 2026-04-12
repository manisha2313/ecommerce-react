import { Link } from "react-router-dom";

function ProductCard({ product, addToCart }){

    return (
        <div style={{ border: "1px solid #ddd", padding: "16px", borderRadius: "8px" }}>
            <img 
            src={product.thumbnail}
            alt="product.title"
            style={{width: "100%", maxWidth: "200px", height: "150px",objectFit: "cover"}}
            />
            <h3>{product.title}</h3>
            <p>{product.category}</p>
            <p>${product.price}</p>
            <div>
            <Link to={`/products/${product.id}`}>View Details</Link>
            <button onClick={()=> addToCart(product)}>Add to cart</button>
            </div>
        </div>
    );
}

export default ProductCard;