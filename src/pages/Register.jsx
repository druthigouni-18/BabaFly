import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../utils/axios";

const schema = yup.object({
  firstName: yup
    .string()
    .required("First name is required")
    .min(2, "Minimum 2 characters"),

  lastName: yup
    .string()
    .required("Last name is required")
    .min(2, "Minimum 2 characters"),

  username: yup
    .string()
    .required("Username is required")
    .min(4, "Minimum 4 characters"),

  password: yup
    .string()
    .required("Password is required")
    .min(6, "Minimum 6 characters"),

  confirmPassword: yup
    .string()
    .required("Please confirm your password")
    .oneOf([yup.ref("password")], "Passwords must match"),
});

const Register = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      await api.post("/users/add", {
        firstName: data.firstName,
        lastName: data.lastName,
        username: data.username,
        password: data.password,
      });

      toast.success("Registration successful!");

      navigate("/login");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Registration failed. Please try again."
      );
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 bg-gray-50">

      <div className="w-full max-w-md bg-white rounded-2xl shadow-sm p-8">

        {/* HEADER */}
        <div className="text-center mb-8">

          <h1 className="text-3xl font-bold text-gray-900">
            Create Account
          </h1>

          <p className="text-gray-500 mt-2">
            Join BabaFly today
          </p>

        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
        >

          {/* FIRST NAME */}
          <div>
            <label className="block text-sm font-medium mb-2">
              First Name
            </label>

            <input
              {...register("firstName")}
              type="text"
              placeholder="Enter first name"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-pink-500"
            />

            {errors.firstName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.firstName.message}
              </p>
            )}
          </div>


          {/* LAST NAME */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Last Name
            </label>

            <input
              {...register("lastName")}
              type="text"
              placeholder="Enter last name"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-pink-500"
            />

            {errors.lastName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.lastName.message}
              </p>
            )}
          </div>


          {/* USERNAME */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Username
            </label>

            <input
              {...register("username")}
              type="text"
              placeholder="Choose a username"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-pink-500"
            />

            {errors.username && (
              <p className="text-red-500 text-sm mt-1">
                {errors.username.message}
              </p>
            )}
          </div>


          {/* PASSWORD */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Password
            </label>

            <input
              {...register("password")}
              type="password"
              placeholder="Create a password"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-pink-500"
            />

            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>


          {/* CONFIRM PASSWORD */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Confirm Password
            </label>

            <input
              {...register("confirmPassword")}
              type="password"
              placeholder="Confirm your password"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-pink-500"
            />

            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>


          {/* SUBMIT */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-pink-600 text-white py-3 rounded-lg font-semibold hover:bg-pink-700 transition disabled:opacity-50"
          >
            {isSubmitting ? "Creating Account..." : "Create Account"}
          </button>

        </form>


        {/* LOGIN LINK */}
        <p className="text-center text-gray-500 mt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-pink-600 font-semibold hover:underline"
          >
            Login
          </Link>
        </p>

      </div>

    </div>
  );
};

export default Register;