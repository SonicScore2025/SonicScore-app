import { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "../firebase";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const API_URL = import.meta.env.VITE_API_URL;
const auth = getAuth(app);

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const user = userCredential.user;

      const response = await axios.get(`${API_URL}/users/${user.uid}.json`);
      const userData = response.data;

      if (!userData) {
        toast.error("User data not found!");
        return;
      }

      toast.success("Logged in successfully!");

      if (userData.role === "admin") {
        navigate("/admin/events");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error("Error logging in:", error.message);
      if (
        error.code === "auth/user-not-found" ||
        error.code === "auth/wrong-password"
      ) {
        toast.error("Wrong email or password!");
      } else {
        toast.error("Wrong email or password!");
      }
    }
  };

  return (
    <div id="LoginPage">
      <div className="my-10 md:my-20">
        <h1 className="text-center mb-6 text-2xl font-bold text-purple-800">
          Login Your Account
        </h1>

        <form
          className="md:w-1/3 purple mx-auto p-5 bg-purple-50 border-2 border-purple-200 rounded-2xl space-y-2.5"
          onSubmit={handleSubmit}
        >
          <div className="form-control">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-control">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary-fill mt-2.5 w-full">
            Login
          </button>
        </form>

        <p className="text-center mt-5">
          Don&apos;t have an account?{" "}
          <Link to="/register" className="text-purple-800 font-semibold">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
