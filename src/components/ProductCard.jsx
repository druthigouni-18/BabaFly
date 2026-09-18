import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import toast from "react-hot-toast";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    toast.success("Added to cart!");
  };

  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">

      {/* Image */}
      <Link to={`/products/${product.id}`}>
        <div className="bg-gray-50 overflow-hidden">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      </Link>

      {/* Content */}
      <div className="p-5">

        <p className="text-xs uppercase tracking-wider text-pink-600 font-medium">
          {product.category}
        </p>

        <Link to={`/products/${product.id}`}>
          <h3 className="text-lg font-semibold mt-2 line-clamp-1 hover:text-pink-600">
            {product.title}
          </h3>
        </Link>

        <p className="text-sm text-gray-500 mt-2">
          {product.brand || "Premium Collection"}
        </p>

        <div className="flex items-center justify-between mt-4">

          <p className="text-xl font-bold">
            ₹{product.price.toLocaleString("en-IN")}
          </p>

          <span className="text-sm bg-yellow-50 text-yellow-700 px-2.5 py-1 rounded-full">
            ⭐ {product.rating}
          </span>

        </div>

        <button
          onClick={handleAddToCart}
          className="w-full mt-5 bg-gray-900 text-white py-3 rounded-xl font-medium hover:bg-pink-600"
        >
          Add to Cart
        </button>

      </div>
    </div>
  );
};

export default ProductCard;