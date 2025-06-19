import { Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SingleThread from "./pages/SingleThread";
import MyThreads from "./pages/MyThread";
import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 


function App() {
  
  useEffect(() => {
    const dark = localStorage.getItem("darkMode") === "true";
    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/thread/:threadId" element={<SingleThread />} />
        <Route path="/mythreads" element={<MyThreads />} />

      </Routes>
      <ToastContainer
        position="bottom-center"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Bounce}
      />
    </>
  );
}

export default App;
