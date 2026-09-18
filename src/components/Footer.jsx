import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white mt-20">

      <div className="max-w-7xl mx-auto px-4 py-12">

        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* Brand */}
          <div>
            <h2 className="text-2xl font-bold">
              Baba<span className="text-pink-400">Fly</span>
            </h2>

            <p className="text-gray-400 mt-4 leading-relaxed">
              Discover jewellery that tells your story.
              Elegant designs for every special moment.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h3 className="font-semibold text-lg mb-4">
              Shop
            </h3>

            <div className="space-y-3 text-gray-400">
              <Link
                to="/products"
                className="block hover:text-white"
              >
                All Products
              </Link>

              <Link
                to="/categories"
                className="block hover:text-white"
              >
                Categories
              </Link>

              <Link
                to="/cart"
                className="block hover:text-white"
              >
                Cart
              </Link>
            </div>
          </div>

          {/* Account */}
          <div>
            <h3 className="font-semibold text-lg mb-4">
              Account
            </h3>

            <div className="space-y-3 text-gray-400">
              <Link
                to="/login"
                className="block hover:text-white"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="block hover:text-white"
              >
                Register
              </Link>

              <Link
                to="/orders"
                className="block hover:text-white"
              >
                My Orders
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-lg mb-4">
              Contact
            </h3>

            <p className="text-gray-400">
              Email: support@babafly.com
            </p>

            <p className="text-gray-400 mt-2">
              Hyderabad, India
            </p>
          </div>

        </div>

        <div className="border-t border-gray-800 mt-10 pt-6 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} BabaFly. All rights reserved.
        </div>

      </div>

    </footer>
  );
};

export default Footer;