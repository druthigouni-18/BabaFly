import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../redux/cartSlice";
import toast from "react-hot-toast";

const schema = yup.object({
  fullName: yup
    .string()
    .required("Full name is required")
    .min(3, "Enter a valid name"),

  phone: yup
    .string()
    .required("Phone number is required")
    .matches(/^[6-9]\d{9}$/, "Enter a valid 10-digit phone number"),

  address: yup
    .string()
    .required("Address is required")
    .min(10, "Please enter your complete address"),

  city: yup
    .string()
    .required("City is required"),

  state: yup
    .string()
    .required("State is required"),

  pincode: yup
    .string()
    .required("Pincode is required")
    .matches(/^\d{6}$/, "Enter a valid 6-digit pincode"),
});

const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cartItems = useSelector(
    (state) => state.cart.items
  );

  const user = useSelector(
    (state) => state.auth.user
  );

  const subtotal = cartItems.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );

  const delivery =
    subtotal > 1000 ? 0 : 99;

  const total = subtotal + delivery;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  // EMPTY CART
  if (cartItems.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">

        <div className="text-6xl mb-5">
          🛒
        </div>

        <h1 className="text-3xl font-bold">
          Your Cart is Empty
        </h1>

        <p className="text-gray-500 mt-3">
          Add some products before proceeding to checkout.
        </p>

        <Link
          to="/products"
          className="inline-block mt-7 bg-pink-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-pink-700"
        >
          Browse Products
        </Link>

      </div>
    );
  }

  const onSubmit = async (data) => {
    try {
      // Create order object
      const order = {
        id: `BF-${Date.now()}`,
        userId: user?.id || null,
        customer: {
          fullName: data.fullName,
          phone: data.phone,
        },
        address: {
          address: data.address,
          city: data.city,
          state: data.state,
          pincode: data.pincode,
        },
        items: cartItems,
        subtotal,
        delivery,
        total,
        status: "Placed",
        createdAt: new Date().toISOString(),
      };

      // Get existing orders
      const existingOrders =
        JSON.parse(
          localStorage.getItem("orders")
        ) || [];

      // Save new order
      localStorage.setItem(
        "orders",
        JSON.stringify([
          order,
          ...existingOrders,
        ])
      );

      // Clear cart
      dispatch(clearCart());

      toast.success("Order placed successfully!");

      navigate("/orders");

    } catch (error) {
      toast.error(
        "Something went wrong. Please try again."
      );
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">

      {/* HEADER */}
      <div className="mb-10">

        <Link
          to="/cart"
          className="text-pink-600 hover:underline"
        >
          ← Back to Cart
        </Link>

        <h1 className="text-4xl font-bold mt-5">
          Checkout
        </h1>

        <p className="text-gray-500 mt-2">
          Enter your delivery details and place your order.
        </p>

      </div>


      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 lg:grid-cols-3 gap-8"
      >

        {/* ADDRESS */}
        <div className="lg:col-span-2">

          <div className="bg-white border rounded-2xl p-6">

            <h2 className="text-2xl font-bold mb-6">
              Delivery Address
            </h2>


            {/* FULL NAME */}
            <div className="mb-5">

              <label className="block font-medium mb-2">
                Full Name
              </label>

              <input
                {...register("fullName")}
                type="text"
                placeholder="Enter your full name"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-pink-500"
              />

              {errors.fullName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.fullName.message}
                </p>
              )}

            </div>


            {/* PHONE */}
            <div className="mb-5">

              <label className="block font-medium mb-2">
                Phone Number
              </label>

              <input
                {...register("phone")}
                type="tel"
                placeholder="10-digit mobile number"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-pink-500"
              />

              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.phone.message}
                </p>
              )}

            </div>


            {/* ADDRESS */}
            <div className="mb-5">

              <label className="block font-medium mb-2">
                Address
              </label>

              <textarea
                {...register("address")}
                rows="4"
                placeholder="House number, street, area..."
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-pink-500"
              />

              {errors.address && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.address.message}
                </p>
              )}

            </div>


            {/* CITY + STATE */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">

              <div>

                <label className="block font-medium mb-2">
                  City
                </label>

                <input
                  {...register("city")}
                  type="text"
                  placeholder="City"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-pink-500"
                />

                {errors.city && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.city.message}
                  </p>
                )}

              </div>


              <div>

                <label className="block font-medium mb-2">
                  State
                </label>

                <input
                  {...register("state")}
                  type="text"
                  placeholder="State"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-pink-500"
                />

                {errors.state && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.state.message}
                  </p>
                )}

              </div>

            </div>


            {/* PINCODE */}
            <div>

              <label className="block font-medium mb-2">
                Pincode
              </label>

              <input
                {...register("pincode")}
                type="text"
                placeholder="6-digit pincode"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-pink-500"
              />

              {errors.pincode && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.pincode.message}
                </p>
              )}

            </div>

          </div>

        </div>


        {/* ORDER SUMMARY */}
        <div>

          <div className="bg-gray-50 rounded-2xl p-6 sticky top-24">

            <h2 className="text-2xl font-bold mb-6">
              Order Summary
            </h2>


            {/* ITEMS */}
            <div className="space-y-4 mb-6">

              {cartItems.map((item) => (

                <div
                  key={item.id}
                  className="flex gap-3"
                >

                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-16 h-16 rounded-lg object-cover"
                  />

                  <div className="flex-1">

                    <p className="font-medium text-sm">
                      {item.title}
                    </p>

                    <p className="text-gray-500 text-sm">
                      Qty: {item.quantity}
                    </p>

                  </div>

                  <p className="font-medium">
                    ₹{(
                      item.price *
                      item.quantity
                    ).toLocaleString("en-IN")}
                  </p>

                </div>

              ))}

            </div>


            {/* TOTALS */}
            <div className="border-t pt-5 space-y-4">

              <div className="flex justify-between">
                <span className="text-gray-500">
                  Subtotal
                </span>

                <span>
                  ₹{subtotal.toLocaleString("en-IN")}
                </span>
              </div>


              <div className="flex justify-between">
                <span className="text-gray-500">
                  Delivery
                </span>

                <span>
                  {delivery === 0
                    ? "FREE"
                    : `₹${delivery}`}
                </span>
              </div>


              <div className="border-t pt-4 flex justify-between text-lg font-bold">

                <span>
                  Total
                </span>

                <span className="text-pink-600">
                  ₹{total.toLocaleString("en-IN")}
                </span>

              </div>

            </div>


            {/* PLACE ORDER */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full mt-7 bg-pink-600 text-white py-3 rounded-lg font-semibold hover:bg-pink-700 transition disabled:opacity-50"
            >
              {isSubmitting
                ? "Placing Order..."
                : "Place Order"}
            </button>

          </div>

        </div>

      </form>

    </div>
  );
};

export default Checkout;