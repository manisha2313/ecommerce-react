import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../api/ProductsApi.js";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";

function ProductDetails({addToCart}) {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProduct() {
      try {
        setLoading(true);
        const data = await getProductById(id);
        setProduct(data);
      } catch (err) {
        setError(err.message || "Failed to load product");
      } finally {
        setLoading(false);
      }
    }

    loadProduct();
  }, [id]);

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;
  if (!product) return <p>No product found.</p>;

  return (
    <div style={{ padding: "20px" }}>
      <img
        src={product.thumbnail}
        alt={product.title}
        style={{ width: "300px", objectFit: "cover" }}
      />
      <h1>{product.title}</h1>
      <p>{product.description}</p>
      <p><strong>Price:</strong> ${product.price}</p>
      <p><strong>Category:</strong> {product.category}</p>
      <p><strong>Brand:</strong> {product.brand}</p>
      <button onClick={() => addToCart(product)}>Add to Cart</button>
    </div>
  );
}

export default ProductDetails;