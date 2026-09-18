import api from "../utils/axios";

export const getProducts = async () => {
  const response = await api.get("/products?limit=100");
  return response.data.products;
};

export const getProductById = async (id) => {
  const response = await api.get(`/products/${id}`);
  return response.data;
};

export const searchProducts = async (query) => {
  const response = await api.get(
    `/products/search?q=${query}`
  );

  return response.data.products;
};

export const getCategories = async () => {
  const response = await api.get("/products/categories");
  return response.data;
};

export const getProductsByCategory = async (category) => {
  const response = await api.get(
    `/products/category/${category}`
  );

  return response.data.products;
};