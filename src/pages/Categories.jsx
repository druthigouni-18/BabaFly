import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../utils/axios";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get("/products/categories");
        setCategories(response.data);
      } catch (error) {
        console.error("Failed to load categories", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">

      {/* HEADER */}
      <div className="text-center mb-12">

        <p className="text-pink-600 font-semibold">
          Explore
        </p>

        <h1 className="text-4xl font-bold mt-2">
          Shop by Category
        </h1>

        <p className="text-gray-500 mt-3">
          Discover products from our different collections.
        </p>

      </div>

      {/* LOADING */}
      {loading ? (
        <div className="text-center py-20">
          <div className="inline-block w-10 h-10 border-4 border-pink-200 border-t-pink-600 rounded-full animate-spin" />
          <p className="mt-4 text-gray-500">
            Loading categories...
          </p>
        </div>
      ) : (

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">

          {categories.map((category) => {

            const categoryName =
              typeof category === "string"
                ? category
                : category.slug;

            return (
              <Link
                key={categoryName}
                to={`/categories/${categoryName}`}
                className="group bg-white border rounded-2xl p-8 text-center shadow-sm hover:shadow-lg hover:border-pink-300 transition"
              >

                <div className="text-5xl mb-5 group-hover:scale-110 transition">
                  💎
                </div>

                <h2 className="font-semibold text-lg capitalize">
                  {categoryName.replaceAll("-", " ")}
                </h2>

                <p className="text-pink-600 text-sm mt-3">
                  View Products →
                </p>

              </Link>
            );
          })}

        </div>

      )}

    </div>
  );
};

export default Categories;