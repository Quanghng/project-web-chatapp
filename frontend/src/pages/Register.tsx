import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import { registerUser } from "@/lib/api/auth"

const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async () => {
    try {
      const data = await registerUser(email, password);
      if (data?.accessToken) {
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);
        localStorage.setItem("isLoggedIn", "true");
        navigate("/login");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <Layout>
      <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 py-10 
        bg-white dark:bg-gray-800 
        text-gray-900 dark:text-gray-100 
        border border-gray-200 dark:border-gray-700 
        rounded-xl shadow-md mt-12 transition-colors">
        <h1 className="text-3xl font-bold text-center text-blue-700 dark:text-blue-400 mb-6">📝 Register</h1>
        <div className="space-y-4">
          <Input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600"
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleRegister();
              }
            }}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600"
          />
          {error && <p className="text-red-500 text-sm">Registration error: {error}</p>}
          <Button
            onClick={handleRegister}
            className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white"
          >
            Register
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default Register;
