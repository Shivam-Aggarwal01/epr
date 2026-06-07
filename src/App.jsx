import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { EWasteProvider } from './context/EWasteContext';
import { Header } from './components/Header';
import { CollegeSelection } from './pages/CollegeSelection';
import Login from './pages/Login';
import About from './pages/About';
import EPR from './pages/EPR';
import { Dashboard } from './pages/Dashboard';
import { AddEWaste } from './pages/AddEWaste';
import { Inventory } from './pages/Inventory';
import { Categories } from './pages/Categories';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import RequireAdmin from './components/RequireAdmin';
import AdminPanel from './pages/AdminPanel';
import './index2.css';

function App() {
  return (
    <EWasteProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<CollegeSelection />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/add" element={<AddEWaste />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<About />} />
          <Route path="/epr" element={<EPR />} />
          <Route path="/admin/panel" element={<AdminPanel />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Routes>
      </BrowserRouter>
    </EWasteProvider>
  );
}

export default App;
