import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { ToastContainer, Zoom } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

// Minimalist, Elegant ve Glassmorphism Stili
const contextClass = {
  success: "border-teal-500 shadow-xl shadow-teal-900/20",
  error: "border-gray-500 shadow-xl shadow-red-900/20",
  info: "border-cyan-500 shadow-xl shadow-cyan-900/20",
  warning: "border-yellow-500  shadow-xl shadow-yellow-900/20",
  default: "border-gray-300 shadow-xl shadow-gray-900/30",
  dark: "border-gray-700 shadow-xl shadow-neutral-800/30",
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <ToastContainer
      toastClassName={(context) =>
        contextClass[context?.type || "default"] +
        " relative flex p-6 mb-4 min-h-12 lg:rounded-t-sm text-gray-800 text-semibold lg:rounded-b-xl justify-between overflow-hidden cursor-pointer bg-transparent " +
        " backdrop-blur-md bg-transparent"
      }
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}  
      pauseOnFocusLoss={false}
      pauseOnHover={true}
      transition={Zoom}
    />
  </StrictMode>,
);
