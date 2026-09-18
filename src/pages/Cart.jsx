import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  clearCart,
} from "../redux/cartSlice";

const Cart = () => {
  const dispatch = useDispatch();

  const cartItems = useSelector(
    (state) => state.cart.items
  );

  const subtotal = cartItems.reduce(
  (total, item) => total + item.price * item.quantity,
  0
);

const delivery = subtotal > 1000 ? 0 : 99;

const total = subtotal + delivery;

  // EMPTY CART
  if (cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">

        <div className="text-7xl mb-6">
          🛒
        </div>

        <h1 className="text-3xl font-bold">
          Your Cart is Empty
        </h1>

        <p className="text-gray-500 mt-3">
          Looks like you haven't added anything to your cart yet.
        </p>

        <Link
          to="/products"
          className="inline-block mt-8 bg-pink-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-pink-700 transition"
        >
          Start Shopping
        </Link>

      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-10">

        <div>
          <h1 className="text-4xl font-bold">
            Shopping Cart
          </h1>

          <p className="text-gray-500 mt-2">
            {cartItems.length} item
            {cartItems.length !== 1 && "s"} in your cart
          </p>
        </div>

        <button
          onClick={() => dispatch(clearCart())}
          className="text-red-500 hover:text-red-700"
        >
          Clear Cart
        </button>

      </div>


      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* CART ITEMS */}
        <div className="lg:col-span-2 space-y-5">

          {cartItems.map((item) => (

            <div
              key={item.id}
              className="bg-white border rounded-xl p-4 flex flex-col sm:flex-row gap-5"
            >

              {/* IMAGE */}
              <Link to={`/products/${item.id}`}>
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-full sm:w-32 h-32 object-cover rounded-lg bg-gray-50"
                />
              </Link>


              {/* DETAILS */}
              <div className="flex-1">

                <div className="flex justify-between gap-4">

                  <div>
                    <p className="text-sm text-gray-500 capitalize">
                      {item.category}
                    </p>

                    <Link
                      to={`/products/${item.id}`}
                      className="font-semibold text-lg hover:text-pink-600"
                    >
                      {item.title}
                    </Link>
                  </div>

                  <button
                    onClick={() =>
                      dispatch(removeFromCart(item.id))
                    }
                    className="text-gray-400 hover:text-red-500"
                  >
                    ✕
                  </button>

                </div>


                {/* PRICE */}
                <p className="font-bold text-lg mt-3">
                  ₹{item.price.toLocaleString("en-IN")}
                </p>


                {/* QUANTITY */}
                <div className="flex items-center gap-3 mt-4">

                  <button
                    onClick={() =>
                      dispatch(decreaseQuantity(item.id))
                    }
                    className="w-9 h-9 border rounded-lg hover:bg-gray-100"
                  >
                    −
                  </button>

                  <span className="font-semibold w-6 text-center">
                    {item.quantity}
                  </span>

                  <button
                    onClick={() =>
                      dispatch(increaseQuantity(item.id))
                    }
                    className="w-9 h-9 border rounded-lg hover:bg-gray-100"
                  >
                    +
                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>


        {/* ORDER SUMMARY */}
        <div className="lg:col-span-1">

          <div className="bg-gray-50 rounded-2xl p-6 sticky top-24">

            <h2 className="text-2xl font-bold mb-6">
              Order Summary
            </h2>


            <div className="space-y-4">

              <div className="flex justify-between">
                <span className="text-gray-500">
                  Subtotal
                </span>

                <span className="font-medium">
                  ₹{subtotal.toLocaleString("en-IN")}
                </span>
              </div>


              <div className="flex justify-between">
                <span className="text-gray-500">
                  Delivery
                </span>

                <span className="font-medium">
                  {delivery === 0
                    ? "FREE"
                    : `₹${delivery}`}
                </span>
              </div>


              <div className="border-t pt-4 flex justify-between text-lg">

                <span className="font-bold">
                  Total
                </span>

                <span className="font-bold text-pink-600">
                  ₹{total.toLocaleString("en-IN")}
                </span>

              </div>

            </div>


            {/* CHECKOUT */}
            <Link
              to="/checkout"
              className="block text-center w-full bg-pink-600 text-white py-3 rounded-lg font-semibold mt-6 hover:bg-pink-700 transition"
            >
              Proceed to Checkout
            </Link>


            <Link
              to="/products"
              className="block text-center text-gray-500 mt-4 hover:text-pink-600"
            >
              ← Continue Shopping
            </Link>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Cart;