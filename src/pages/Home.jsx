import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../utils/axios";
import ProductCard from "../components/ProductCard";
import ProductSkeleton from "../components/ProductSkeleton";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const [productsResponse, categoriesResponse] =
          await Promise.all([
            api.get("/products?limit=8"),
            api.get("/products/categories"),
          ]);

        setProducts(productsResponse.data.products);
        setCategories(categoriesResponse.data);
      } catch (error) {
        console.error("Failed to load home data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHomeData();
  }, []);

  return (
    <div>

      {/* HERO SECTION */}
      <section className="bg-pink-50">
        <div className="max-w-7xl mx-auto px-4 py-20 md:py-28">

          <div className="max-w-2xl">

            <p className="text-pink-600 font-semibold mb-3">
              ✨ Timeless Beauty
            </p>

            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
              Discover Jewellery
              <span className="text-pink-600">
                {" "}That Tells Your Story
              </span>
            </h1>

            <p className="text-gray-600 text-lg mt-6">
              Explore our beautiful collection of jewellery
              designed to make every moment special.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-8">

              <Link
                to="/products"
                className="bg-pink-600 text-white px-6 py-3 rounded-lg text-center font-medium hover:bg-pink-700 transition"
              >
                Shop Now
              </Link>

              <Link
                to="/categories"
                className="border border-pink-600 text-pink-600 px-6 py-3 rounded-lg text-center font-medium hover:bg-pink-100 transition"
              >
                Explore Categories
              </Link>

            </div>

          </div>

        </div>
      </section>


      {/* CATEGORIES */}
      <section className="max-w-7xl mx-auto px-4 py-16">

        <div className="text-center mb-10">

          <h2 className="text-3xl font-bold">
            Shop by Category
          </h2>

          <p className="text-gray-500 mt-2">
            Find something perfect for every occasion
          </p>

        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

          {categories.slice(0, 8).map((category) => {

            const categoryName =
              typeof category === "string"
                ? category
                : category.slug;

            return (
              <Link
                key={categoryName}
                to={`/categories/${categoryName}`}
                className="bg-gray-50 rounded-xl p-6 text-center hover:bg-pink-50 hover:shadow-md transition"
              >
                <div className="text-3xl mb-3">
                  💎
                </div>

                <h3 className="font-semibold capitalize">
                  {categoryName.replaceAll("-", " ")}
                </h3>
              </Link>
            );
          })}

        </div>

      </section>


      {/* FEATURED PRODUCTS */}
      <section className="bg-gray-50">

        <div className="max-w-7xl mx-auto px-4 py-16">

          <div className="flex justify-between items-center mb-10">

            <div>
              <h2 className="text-3xl font-bold">
                Featured Products
              </h2>

              <p className="text-gray-500 mt-2">
                Explore some of our popular products
              </p>
            </div>

            <Link
              to="/products"
              className="hidden sm:block text-pink-600 font-medium hover:underline"
            >
              View All →
            </Link>

          </div>


          {loading ? (

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

              {[1, 2, 3, 4].map((item) => (
                <ProductSkeleton key={item} />
              ))}

            </div>

          ) : (

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                />
              ))}

            </div>

          )}

        </div>

      </section>


      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 py-16">

        <div className="bg-pink-600 text-white rounded-2xl p-8 md:p-12 text-center">

          <h2 className="text-3xl font-bold">
            Find Your Perfect Piece
          </h2>

          <p className="mt-3 text-pink-100">
            Discover jewellery that makes every moment
            memorable.
          </p>

          <Link
            to="/products"
            className="inline-block mt-6 bg-white text-pink-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
          >
            Browse Collection
          </Link>

        </div>

      </section>

    </div>
  );
};

export default Home;