import api from "../api/axiosApi";

// async function fetchJson(url,options = {}){
//     const response = await fetch(url, options);

//     if(!response.ok){
//         throw new error(`Request failed: ${response.status}`);
//     }

//     return response.json();
// }

export async function getAllProducts () {
  const response = await api.get(`/products`);
  return response.data;
}

export async function getProductsById (id) {
     const response = await api.get(`/products/${id}`);
  return response.data;
}

export async function searchProducts(query) {
  const response = await api.get(`/products/search?q=${encodeURIComponent(query)}`);
  return response.data;
}

export async function getCategories() {
    const response = await api.get("/products/categories");
  return response.data;
}

export async function getProductsByCategory(category) {
  const response = await api.get(`/products/category/${encodeURIComponent(category)}`);
  return response.data;
}