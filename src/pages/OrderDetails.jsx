import { Link, useParams } from "react-router-dom";

const OrderDetails = () => {
  const { id } = useParams();

  const orders =
    JSON.parse(localStorage.getItem("orders")) || [];

  const order = orders.find(
    (item) => item.id === id
  );

  if (!order) {
    return (
      <div className="text-center py-20 px-4">

        <div className="text-6xl mb-5">
          📦
        </div>

        <h1 className="text-3xl font-bold">
          Order Not Found
        </h1>

        <p className="text-gray-500 mt-2">
          We couldn't find this order.
        </p>

        <Link
          to="/orders"
          className="inline-block mt-6 bg-pink-600 text-white px-6 py-3 rounded-lg"
        >
          Back to Orders
        </Link>

      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">

      {/* HEADER */}
      <div className="mb-8">

        <Link
          to="/orders"
          className="text-pink-600 hover:underline"
        >
          ← Back to Orders
        </Link>

        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mt-6">

          <div>
            <h1 className="text-3xl font-bold">
              Order Details
            </h1>

            <p className="text-gray-500 mt-1">
              {order.id}
            </p>
          </div>

          <span className="self-start bg-green-100 text-green-700 px-4 py-2 rounded-full font-medium">
            {order.status}
          </span>

        </div>

      </div>


      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* ORDER ITEMS */}
        <div className="lg:col-span-2">

          <div className="bg-white border rounded-2xl p-6">

            <h2 className="text-2xl font-bold mb-6">
              Ordered Items
            </h2>

            <div className="space-y-5">

              {order.items.map((item) => (

                <div
                  key={item.id}
                  className="flex gap-4 border-b pb-5 last:border-b-0 last:pb-0"
                >

                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-20 h-20 rounded-lg object-cover bg-gray-50"
                  />

                  <div className="flex-1">

                    <h3 className="font-semibold">
                      {item.title}
                    </h3>

                    <p className="text-gray-500 text-sm mt-1">
                      Quantity: {item.quantity}
                    </p>

                    <p className="font-medium mt-2">
                      ₹{item.price.toLocaleString("en-IN")}
                    </p>

                  </div>

                  <p className="font-bold">
                    ₹{(
                      item.price *
                      item.quantity
                    ).toLocaleString("en-IN")}
                  </p>

                </div>

              ))}

            </div>

          </div>

        </div>


        {/* RIGHT SIDE */}
        <div className="space-y-6">

          {/* ADDRESS */}
          <div className="bg-gray-50 rounded-2xl p-6">

            <h2 className="text-xl font-bold mb-4">
              Delivery Address
            </h2>

            <p className="font-medium">
              {order.customer.fullName}
            </p>

            <p className="text-gray-600 mt-2">
              {order.address.address}
            </p>

            <p className="text-gray-600">
              {order.address.city},{" "}
              {order.address.state}
            </p>

            <p className="text-gray-600">
              {order.address.pincode}
            </p>

            <p className="text-gray-600 mt-2">
              📞 {order.customer.phone}
            </p>

          </div>


          {/* SUMMARY */}
          <div className="bg-gray-50 rounded-2xl p-6">

            <h2 className="text-xl font-bold mb-5">
              Price Summary
            </h2>

            <div className="space-y-4">

              <div className="flex justify-between">
                <span className="text-gray-500">
                  Subtotal
                </span>

                <span>
                  ₹{order.subtotal.toLocaleString("en-IN")}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">
                  Delivery
                </span>

                <span>
                  {order.delivery === 0
                    ? "FREE"
                    : `₹${order.delivery}`}
                </span>
              </div>

              <div className="border-t pt-4 flex justify-between text-lg font-bold">

                <span>Total</span>

                <span className="text-pink-600">
                  ₹{order.total.toLocaleString("en-IN")}
                </span>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default OrderDetails;