import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import { loginUser } from "@/lib/api/auth";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      await loginUser(email, password); 
      navigate("/");
    } catch (err: any) {
      setError(err.response?.data?.message || "Erreur de connexion");
    }
  };
  
  return (
    <Layout>
      <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 py-10 
        bg-white dark:bg-gray-800 
        text-gray-900 dark:text-gray-100 
        border border-gray-200 dark:border-gray-700 
        rounded-xl shadow-md mt-12 transition-colors">

        <h1 className="text-3xl font-bold text-center text-blue-700 dark:text-blue-400 mb-6">
          Connexion
        </h1>
        <div className="space-y-4">
          <Input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600"
          />
          <Input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleLogin();
              }
            }}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600"
          />
          {error && <p className="text-red-500 text-sm">Erreur de connexion : {error}</p>}
          <Button
            onClick={handleLogin}
            className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white"
          >
            Se connecter
          </Button>

          <p className="text-sm text-center text-gray-600 dark:text-gray-300 mt-4">
            Pas encore de compte ? <Link to="/register" className="text-blue-600 hover:underline">Inscris-toi ici</Link>
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
