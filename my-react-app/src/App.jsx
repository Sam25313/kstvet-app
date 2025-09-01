import { useState, useContext} from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation} from 'react-router-dom';
import { Toaster } from "react-hot-toast";
import AdminApp from './AdminApp';
import { Admin, Resource } from 'react-admin';
import PrivateRoute from './components/PrivateRoute';

import NavBar from './components/Navbar'
import Home from './pages/Home'
import Hero from './components/Hero'
import About from './pages/About';
import Ministries from './pages/Ministries'
import Events from './pages/Events'
import Sermons from './pages/Sermons'
import Contact from './pages/Contact'
import Form from './components/Form';
//import LoginForm from './pages/Admin/LoginForm';
import LoginRoute from './pages/Admin/routes/LoginRoutes';
import ForgotPasswordForm from './pages/Admin/ForgotPasswordForm';






import './App.css'


function App() {
  const location = useLocation();
  const isAuthenticated = Boolean(localStorage.getItem('token'));

  const hideNav = location.pathname.startsWith('/admin') || location.pathname === '/login';

   return (
    
    <>
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: "#FFDF00",
            color: "#fff",
            fontWeight: "bold",
          },
        }}
      />
      {!hideNav && <NavBar />}

      <Routes>
        {/* Public Routes (always registered) */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/ministries" element={<Ministries />} />
        <Route path="/events" element={<Events />} />
        <Route path="/sermons" element={<Sermons />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/form" element={<Form />} />
        <Route path="/forgot-password" element={<ForgotPasswordForm />} />
        

        {/* Login Route: redirect if already authenticated */}
        <Route
          path="/login"
          element={
            isAuthenticated 
              ? <Navigate to="/admin" replace /> 
              : <LoginRoute />
          }
        />

        {/* Protected Admin Routes */}
        <Route element={<PrivateRoute />}>
          <Route path="/admin/*" element={<AdminApp />} />
        </Route>

        {/* Catch-All Fallback */}
        <Route 
          path="*" 
          element={
            isAuthenticated 
              ? <Navigate to="/admin" replace /> 
              : <Navigate to="/" replace />
          } 
        />
      </Routes>
    </>
  );
}
export default function WrappedApp() {
  return (
    <Router>
      <App />
    </Router>
  );
}