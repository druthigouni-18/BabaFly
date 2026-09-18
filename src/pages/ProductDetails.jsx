import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import toast from "react-hot-toast";
import api from "../utils/axios";
import ProductSkeleton from "../components/ProductSkeleton";

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);

        const response = await api.get(`/products/${id}`);

        setProduct(response.data);
      } catch (err) {
        setError("Failed to load product.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    toast.success("Added to cart!");
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <ProductSkeleton />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-semibold">
          Product not found
        </h2>

        <Link
          to="/products"
          className="inline-block mt-5 bg-pink-600 text-white px-5 py-3 rounded-lg"
        >
          Back to Products
        </Link>
      </div>
    );
  }

  const metalTypes = ["Gold", "Silver", "Rose Gold", "Platinum"];
  const polishTypes = ["Glossy", "Matte", "Antique"];

  const productMetal =
    metalTypes[product.id % metalTypes.length];

  const productPolish =
    polishTypes[product.id % polishTypes.length];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">

      {/* BREADCRUMB */}
      <div className="text-sm text-gray-500 mb-8">
        <Link to="/" className="hover:text-pink-600">
          Home
        </Link>

        <span className="mx-2">/</span>

        <Link to="/products" className="hover:text-pink-600">
          Products
        </Link>

        <span className="mx-2">/</span>

        <span>{product.title}</span>
      </div>


      {/* PRODUCT */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

        {/* IMAGE */}
        <div className="bg-gray-50 rounded-2xl p-6">

          <img
            src={product.thumbnail}
            alt={product.title}
            className="w-full h-[400px] md:h-[500px] object-contain rounded-xl"
          />

        </div>


        {/* DETAILS */}
        <div>

          <p className="text-pink-600 font-medium capitalize">
            {product.category}
          </p>

          <h1 className="text-3xl md:text-4xl font-bold mt-2">
            {product.title}
          </h1>


          {/* RATING */}
          <div className="flex items-center gap-3 mt-4">

            <span className="text-yellow-500 text-lg">
              ⭐ {product.rating}
            </span>

            <span className="text-gray-500">
              Customer Rating
            </span>

          </div>


          {/* PRICE */}
          <p className="text-3xl font-bold mt-6">
            ₹{product.price.toLocaleString("en-IN")}
          </p>


          {/* DESCRIPTION */}
          <p className="text-gray-600 leading-7 mt-6">
            {product.description}
          </p>


          {/* PRODUCT INFO */}
          <div className="border-t border-b mt-8 py-6 space-y-4">

            <div className="flex justify-between">
              <span className="text-gray-500">
                Metal Type
              </span>

              <span className="font-medium">
                {productMetal}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500">
                Polish
              </span>

              <span className="font-medium">
                {productPolish}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500">
                Brand
              </span>

              <span className="font-medium">
                {product.brand || "BabaFly Collection"}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500">
                Availability
              </span>

              <span className="text-green-600 font-medium">
                {product.stock > 0
                  ? `In Stock (${product.stock})`
                  : "Out of Stock"}
              </span>
            </div>

          </div>


          {/* ADD TO CART */}
          <button
            onClick={handleAddToCart}
            disabled={product.stock <= 0}
            className="w-full mt-8 bg-pink-600 text-white py-4 rounded-xl font-semibold text-lg hover:bg-pink-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {product.stock > 0
              ? "Add to Cart"
              : "Out of Stock"}
          </button>


          {/* BACK */}
          <Link
            to="/products"
            className="block text-center mt-4 text-gray-600 hover:text-pink-600"
          >
            ← Continue Shopping
          </Link>

        </div>

      </div>

    </div>
  );
};

export default ProductDetails;