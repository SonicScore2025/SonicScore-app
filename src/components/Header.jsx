import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { app } from "../firebase";
import axios from "axios";
import { toast } from "react-toastify";
import { Waveform } from "@phosphor-icons/react";

const API_URL = import.meta.env.VITE_API_URL;
const auth = getAuth(app);

const Header = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [role, setRole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setCurrentUser(user);

        try {
          const response = await axios.get(`${API_URL}/users/${user.uid}.json`);
          const userData = response.data;
          setRole(userData?.role || "user");
        } catch (error) {
          console.error("Error fetching user role:", error);
        }
      } else {
        setCurrentUser(null);
        setRole(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success("You have logged out successfully.");
      navigate("/");
    } catch (error) {
      console.error("Error signing out:", error);
      toast.error("Error signing out. Please try again.");
    }
  };

  return (
    <div className="Header py-4 md:py-5 border-b border-gray-100 shadow shadow-gray-100">
      <div className="container max-w-5xl mx-auto flex flex-col md:flex-row gap-3 items-center justify-between">
        <Link to={"/"}>
          <h1 className="text-2xl font-extrabold uppercase text-purple-800 flex items-center gap-2">
            <Waveform size={40} weight="fill" /> Sonic Score
          </h1>
        </Link>

        <ul className="flex md:gap-10 justify-around w-full md:w-auto px-3 md:px-0">
          <li>
            <NavLink to="/">Events</NavLink>
          </li>
          <li>
            <NavLink to="/about">About</NavLink>
          </li>

          {!currentUser && (
            <li>
              <NavLink to="/login">Login</NavLink>
            </li>
          )}

          {currentUser && (
            <>
              {role === "admin" && (
                <li>
                  <NavLink to="/admin/events">Admin</NavLink>
                </li>
              )}
              <li>
                <button
                  onClick={handleLogout}
                  className="hover:text-red-600 cursor-pointer font-semibold"
                >
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Header;
