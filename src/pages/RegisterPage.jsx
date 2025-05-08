import { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { app } from "../firebase";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify"; // اضافه شده برای Toast

const API_URL = import.meta.env.VITE_API_URL;
const auth = getAuth(app);

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: "",
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

    // اول چک کنیم پسورد حداقل ۶ کاراکتر باشه
    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const user = userCredential.user;

      await axios.put(`${API_URL}/users/${user.uid}.json`, {
        name: formData.name,
        email: formData.email,
        role: "user",
      });

      toast.success("User registered successfully & logged in!");
      navigate("/");
    } catch (error) {
      console.error("Error registering user:", error.code);

      if (error.code === "auth/email-already-in-use") {
        toast.info("You already have an account. Please log in.");
        navigate("/login");
      } else if (error.code === "auth/invalid-email") {
        toast.error("Invalid email address.");
      } else {
        toast.error("Registration failed. Please try again.");
      }
    }
  };

  return (
    <div id="RegisterPage">
      <div className="my-10 md:my-20">
        <h1 className="text-center mb-6 text-2xl font-bold text-purple-800">
          Register New User
        </h1>

        <form
          className="md:w-1/3 purple mx-auto p-5 bg-purple-50 border-2 border-purple-200 rounded-2xl space-y-2.5"
          onSubmit={handleSubmit}
        >
          <div className="form-control">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

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
            Register
          </button>
        </form>

        <p className="text-center mt-5">
          Already have an account?{" "}
          <Link to="/login" className="text-purple-800 font-semibold">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
