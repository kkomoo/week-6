import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import NavigationBar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Cart from './pages/Cart';
import AddProduct from './pages/AddProduct';
import SellerDashboard from './pages/SellerDashboard';
import SellerInventory from './pages/SellerInventory';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

  return (
    <div className="min-vh-100 d-flex flex-column">
      {!isAuthPage && <NavigationBar />}
      <main className="flex-grow-1">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          
          {/* Seller Routes */}
          <Route path="/seller/dashboard" element={<SellerDashboard />} />
          <Route path="/seller/add-product" element={<AddProduct />} />
          <Route path="/seller/inventory" element={<SellerInventory />} />
          
          {/* Legacy Route - can be removed later */}
          <Route path="/add-product" element={<AddProduct />} />
          
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
