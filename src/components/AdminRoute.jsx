import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "../firebase";
import axios from "axios";
import { toast } from "react-toastify"; // اضافه شد برای toast
import Loading from "../components/Loading"; // فرض گرفتم آدرس Loading درست باشه

const API_URL = import.meta.env.VITE_API_URL;
const auth = getAuth(app);

const AdminRoute = () => {
  const [checking, setChecking] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const response = await axios.get(`${API_URL}/users/${user.uid}.json`);
          const userData = response.data;
          if (userData?.role === "admin") {
            setIsAdmin(true);
          } else {
            toast.error("Access denied. Admins only!");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          toast.error("An error occurred while checking permissions.");
        }
      } else {
        toast.error("You must be logged in.");
      }
      setChecking(false);
    });

    return () => unsubscribe();
  }, []);

  if (checking) {
    return <Loading />; // 🔥 استفاده از کامپوننت Loading که ساختی
  }

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default AdminRoute;
