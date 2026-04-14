import api from "../api/axiosApi";

export async function getProducts({
  page = 1,
  limit = 12,
  search = "",
  category = "",
}) {
  const skip = (page - 1) * limit;

  if (search) {
    const response = await api.get("/products/search", {
      params: {
        q: search,
        limit,
        skip,
      },
    });
    return response.data;
  }

  if (category) {
    const response = await api.get(`/products/category/${encodeURIComponent(category)}`, {
      params: {
        limit,
        skip,
      },
    });
    return response.data;
  }

  const response = await api.get("/products", {
    params: {
      limit,
      skip,
    },
  });

  return response.data;
}


export async function getProductById(id) {
  const response = await api.get(`/products/${id}`);
  return response.data;
}

export async function getCategories() {
  const response = await api.get("/products/categories");
  return response.data;
}

// export async function searchProducts(query) {
//   const response = await api.get(`/products/search?q=${encodeURIComponent(query)}`);
//   return response.data;
// }


// export async function getProductsByCategory(category) {
//   const response = await api.get(`/products/category/${encodeURIComponent(category)}`);
//   return response.data;
// }


