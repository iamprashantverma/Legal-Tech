import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import AuthProvider from "../src/context/AuthProvider.jsx";
import App from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <AuthProvider>
        <App />
        <ToastContainer
        position = 'top-right'
        autoClose = {3000}
        newestOnTop
        closeOnClick
        pauseOnHover
        />
      </AuthProvider>
    </Router>
  </StrictMode>,
)
