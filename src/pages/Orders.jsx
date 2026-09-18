import { Link } from "react-router-dom";

const Orders = () => {
  const orders =
    JSON.parse(localStorage.getItem("orders")) || [];

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">

      {/* HEADER */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold">
          My Orders
        </h1>

        <p className="text-gray-500 mt-2">
          View and track your recent orders.
        </p>
      </div>

      {/* EMPTY */}
      {orders.length === 0 ? (
        <div className="text-center py-20">

          <div className="text-6xl mb-5">
            📦
          </div>

          <h2 className="text-2xl font-semibold">
            No Orders Yet
          </h2>

          <p className="text-gray-500 mt-2">
            Your placed orders will appear here.
          </p>

          <Link
            to="/products"
            className="inline-block mt-6 bg-pink-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-pink-700"
          >
            Start Shopping
          </Link>

        </div>
      ) : (

        <div className="space-y-5">

          {orders.map((order) => (

            <div
              key={order.id}
              className="bg-white border rounded-2xl p-6 shadow-sm"
            >

              <div className="flex flex-col sm:flex-row sm:justify-between gap-4">

                <div>
                  <p className="text-sm text-gray-500">
                    Order ID
                  </p>

                  <h2 className="font-bold text-lg">
                    {order.id}
                  </h2>

                  <p className="text-sm text-gray-500 mt-1">
                    {new Date(
                      order.createdAt
                    ).toLocaleDateString("en-IN")}
                  </p>
                </div>

                <span className="self-start bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                  {order.status}
                </span>

              </div>


              {/* ITEMS */}
              <div className="border-t mt-5 pt-5 space-y-3">

                {order.items
                  .slice(0, 3)
                  .map((item) => (

                    <div
                      key={item.id}
                      className="flex items-center gap-3"
                    >

                      <img
                        src={item.thumbnail}
                        alt={item.title}
                        className="w-14 h-14 rounded-lg object-cover bg-gray-50"
                      />

                      <div className="flex-1">

                        <p className="font-medium">
                          {item.title}
                        </p>

                        <p className="text-sm text-gray-500">
                          Quantity: {item.quantity}
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


              {/* FOOTER */}
              <div className="border-t mt-5 pt-5 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">

                <div>
                  <span className="text-gray-500">
                    Total:
                  </span>{" "}
                  <span className="font-bold text-lg">
                    ₹{order.total.toLocaleString("en-IN")}
                  </span>
                </div>

                <Link
                  to={`/orders/${order.id}`}
                  className="bg-pink-600 text-white px-5 py-2.5 rounded-lg text-center hover:bg-pink-700"
                >
                  View Details
                </Link>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
};

export default Orders;