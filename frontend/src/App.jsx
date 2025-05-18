import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import ProductGallery from "./pages/ProductGallery";
import OrderForm from "./pages/OrderForm";
import OrderTracking from "./pages/OrderTracking";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import CustomDesign from "./pages/CustomDesign";
import "./index.css";
import Navbar from "./pages/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductGallery />} />
        <Route path="/order" element={<OrderForm />} />
        <Route path="/track" element={<OrderTracking />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/custom-design" element={<CustomDesign />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;
