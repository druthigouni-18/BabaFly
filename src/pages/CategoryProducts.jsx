import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../utils/axios";
import ProductCard from "../components/ProductCard";
import ProductSkeleton from "../components/ProductSkeleton";

const CategoryProducts = () => {
  const { category } = useParams();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get(
          `/products/category/${category}`
        );

        setProducts(response.data.products);
      } catch (error) {
        setError("Failed to load category products.");
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryProducts();
  }, [category]);

  const formattedCategory = category
    ?.replaceAll("-", " ");

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">

      {/* HEADER */}
      <div className="mb-10">

        <Link
          to="/categories"
          className="text-pink-600 hover:underline"
        >
          ← All Categories
        </Link>

        <h1 className="text-4xl font-bold mt-6 capitalize">
          {formattedCategory}
        </h1>

        <p className="text-gray-500 mt-2">
          Explore products in this category.
        </p>

      </div>


      {/* LOADING */}
      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

          {[1, 2, 3, 4].map((item) => (
            <ProductSkeleton key={item} />
          ))}

        </div>
      )}


      {/* ERROR */}
      {!loading && error && (
        <div className="text-center py-20">

          <p className="text-red-500 text-lg">
            {error}
          </p>

        </div>
      )}


      {/* PRODUCTS */}
      {!loading && !error && products.length > 0 && (

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}

        </div>
      )}


      {/* EMPTY */}
      {!loading && !error && products.length === 0 && (

        <div className="text-center py-20">

          <div className="text-5xl mb-4">
            💎
          </div>

          <h2 className="text-2xl font-semibold">
            No products found
          </h2>

          <p className="text-gray-500 mt-2">
            There are no products in this category.
          </p>

          <Link
            to="/products"
            className="inline-block mt-6 bg-pink-600 text-white px-6 py-3 rounded-lg hover:bg-pink-700"
          >
            Browse All Products
          </Link>

        </div>
      )}

    </div>
  );
};

export default CategoryProducts;