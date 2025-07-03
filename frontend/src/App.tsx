import { Route, Routes, Navigate } from "react-router-dom";
import { useEffect } from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SingleThread from "./pages/SingleThread";
import MyThreads from "./pages/MyThread";
import Conversation from "./pages/Conversation";
import ConversationsList from "./pages/ConversationsList";
import CreateConversation from "./pages/CreateConversation";
import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 


function App() {

  const API_BASE = import.meta.env.VITE_API_BASE_URL;
  const GRAPHQL_HTTP = import.meta.env.VITE_GRAPHQL_HTTP_URL;
  const GRAPHQL_WS = import.meta.env.VITE_GRAPHQL_WS_URL;

  console.log('--- FRONTEND DEBUG: ENV VARS ---');
  console.log('VITE_API_BASE_URL:', API_BASE);
  console.log('VITE_GRAPHQL_HTTP_URL:', GRAPHQL_HTTP);
  console.log('VITE_GRAPHQL_WS_URL:', GRAPHQL_WS);
  console.log('--- END FRONTEND DEBUG ---');
  
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
        <Route path="/conversation/:conversationId" element={<Conversation />} />
        <Route path="/conversations" element={<ConversationsList />} />
        <Route path="/conversations/new" element={<CreateConversation />} />
        <Route path="/conversation/new" element={<Navigate to="/conversations/new" replace />} />
        {/* Route pour la création de conversation à venir */}
        {/* <Route path="/conversations/new" element={<CreateConversation />} /> */}

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
