import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Switch } from "@/components/ui/switch";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  useEffect(() => {
    const loginStatus = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loginStatus);
    if (loginStatus) {
      setUserInfo({
        firstName: localStorage.getItem("firstName") || "",
        lastName: localStorage.getItem("lastName") || "",
        email: localStorage.getItem("email") || "",
      });
    }
  }, []);

  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("darkMode") === "true");

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("darkMode", String(darkMode));
  }, [darkMode]);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("userId");
    localStorage.removeItem("firstName");
    localStorage.removeItem("lastName");
    localStorage.removeItem("email");
    Object.keys(localStorage)
      .filter((key) => key.startsWith("thread-liked-"))
      .forEach((key) => localStorage.removeItem(key));
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <nav className="w-full bg-white dark:bg-gray-900 border-b shadow-sm py-3 px-6 mb-6 transition-colors">
      <div className="max-w-5xl mx-auto flex gap-6 items-center justify-between">
        <div className="flex gap-6 items-center">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text-blue-600 dark:text-blue-400 font-semibold"
                : "text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition"
            }
          >
            Home
          </NavLink>
          {isLoggedIn ? (
            <>
              <NavLink
                to="/mythreads"
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-600 dark:text-blue-400 font-semibold"
                    : "text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition"
                }
              >
                My Threads
              </NavLink>
              <button
                onClick={handleLogout}
                className="text-gray-600 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-600 dark:text-blue-400 font-semibold"
                    : "text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition"
                }
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-600 dark:text-blue-400 font-semibold"
                    : "text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition"
                }
              >
                Register
              </NavLink>
            </>
          )}
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
          <span>Dark Mode</span>
          <Switch
            checked={darkMode}
            onCheckedChange={setDarkMode}
            className={`
                relative inline-flex h-6 w-11 cursor-pointer rounded-full border border-gray-300 dark:border-gray-600 
                bg-gray-200 dark:bg-gray-700 
                data-[state=checked]:bg-blue-600 transition-colors
                after:content-[''] after:absolute after:h-4 after:w-4 after:rounded-full 
                after:bg-white after:top-1 after:left-1 
                data-[state=checked]:after:translate-x-5 
                after:transition-transform after:duration-300
            `}
          />

          {isLoggedIn && (
            <div className="flex items-center gap-2 text-xs md:text-sm text-gray-700 dark:text-gray-200">
              <span>{userInfo.firstName}</span>
              <span>{userInfo.lastName}</span>
              <span className="text-gray-500 dark:text-gray-400">{userInfo.email}</span>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
