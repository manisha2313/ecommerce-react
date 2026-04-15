// import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../api/ProductsApi.js";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";
import { useQuery } from "@tanstack/react-query";
function ProductDetails({addToCart}) {
  const { id } = useParams();
  const { data: productData, isPending, isError, error: productError } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProductById(id),
  });

  if (isPending && !productData) return <Loader />;
  if (isError) return <ErrorMessage message={productError.message} />;

  return (
    <div style={{ padding: "20px" }}>
      <img
        src={productData.thumbnail}
        alt={productData.title}
        style={{ width: "300px", objectFit: "cover" }}
      />
      <h1>{productData.title}</h1>
      <p>{productData.description}</p>
      <p><strong>Price:</strong> ${productData.price}</p>
      <p><strong>Category:</strong> {productData.category}</p>
      <p><strong>Brand:</strong> {productData.brand}</p>
      <button onClick={() => addToCart(productData)}>Add to Cart</button>
    </div>
  );
}

export default ProductDetails;