import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/authSlice";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const dispatch = useDispatch();

  const { isAuthenticated } = useSelector(
    (state) => state.auth
  );

  const cartItems = useSelector(
    (state) => state.cart.items
  );

  const handleLogout = () => {
    dispatch(logout());
    setMenuOpen(false);
  };

  const navClass = ({ isActive }) =>
    `block py-2 ${
      isActive
        ? "text-pink-600 font-semibold"
        : "text-gray-700 hover:text-pink-600"
    }`;

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">

        <div className="flex justify-between items-center h-16">

          {/* LOGO */}
          <Link
            to="/"
            className="text-2xl font-bold text-pink-600"
          >
            BabaFly
          </Link>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex items-center gap-6">

            <NavLink to="/" className={navClass}>
              Home
            </NavLink>

            <NavLink to="/products" className={navClass}>
              Products
            </NavLink>

            <NavLink to="/categories" className={navClass}>
              Categories
            </NavLink>

            <NavLink to="/cart" className={navClass}>
              Cart ({cartItems.length})
            </NavLink>

            {isAuthenticated ? (
              <>
                <NavLink to="/orders" className={navClass}>
                  Orders
                </NavLink>

                <button
                  onClick={handleLogout}
                  className="text-red-500 hover:text-red-700"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLink to="/login" className={navClass}>
                  Login
                </NavLink>

                <NavLink
                  to="/register"
                  className="bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700"
                >
                  Register
                </NavLink>
              </>
            )}

          </div>

          {/* MOBILE BUTTON */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-2xl"
          >
            {menuOpen ? "✕" : "☰"}
          </button>

        </div>

        {/* MOBILE MENU */}
        {menuOpen && (
          <div className="md:hidden border-t py-4">

            <NavLink
              to="/"
              className={navClass}
              onClick={() => setMenuOpen(false)}
            >
              Home
            </NavLink>

            <NavLink
              to="/products"
              className={navClass}
              onClick={() => setMenuOpen(false)}
            >
              Products
            </NavLink>

            <NavLink
              to="/categories"
              className={navClass}
              onClick={() => setMenuOpen(false)}
            >
              Categories
            </NavLink>

            <NavLink
              to="/cart"
              className={navClass}
              onClick={() => setMenuOpen(false)}
            >
              Cart ({cartItems.length})
            </NavLink>

            {isAuthenticated ? (
              <>
                <NavLink
                  to="/orders"
                  className={navClass}
                  onClick={() => setMenuOpen(false)}
                >
                  Orders
                </NavLink>

                <button
                  onClick={handleLogout}
                  className="block py-2 text-red-500"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLink
                  to="/login"
                  className={navClass}
                  onClick={() => setMenuOpen(false)}
                >
                  Login
                </NavLink>

                <NavLink
                  to="/register"
                  className="block mt-2 bg-pink-600 text-white text-center px-4 py-2 rounded-lg"
                  onClick={() => setMenuOpen(false)}
                >
                  Register
                </NavLink>
              </>
            )}

          </div>
        )}

      </div>
    </nav>
  );
};

export default Navbar;