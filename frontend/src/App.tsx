import { Route, Routes, Navigate } from "react-router-dom";
import { useEffect } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Conversation from "./pages/Conversation";
import ConversationsList from "./pages/ConversationsList";
import CreateConversation from "./pages/CreateConversation";
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
        <Route path="/" element={<Navigate to="/conversations" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/conversation/:conversationId" element={<Conversation />} />
        <Route path="/conversations" element={<ConversationsList />} />
        <Route path="/conversations/new" element={<CreateConversation />} />
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
