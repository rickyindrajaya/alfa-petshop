import React, { useState } from 'react';
import { Settings, LogOut } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import Sidebar from './Sidebar';
import Dashboard from './Dashboard';
import ProductManagement from './ProductManagement';
import OrderList from './OrderList';

export default function AdminPanel() {
  const { logout } = useApp();
  const [activeView, setActiveView] = useState('dashboard');

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Admin Header */}
      <header className="bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Settings className="w-10 h-10" />
              <div>
                <h1 className="text-3xl font-bold">Admin Panel</h1>
                <p className="text-sm text-purple-100">ALFA PETSHOP Management</p>
              </div>
            </div>
            <button
              onClick={logout}
              className="bg-white text-purple-600 px-6 py-3 rounded-full font-semibold hover:bg-purple-50 transition-all shadow-lg flex items-center space-x-2"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Sidebar activeView={activeView} onViewChange={setActiveView} />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeView === 'dashboard' && <Dashboard />}
            {activeView === 'products' && <ProductManagement />}
            {activeView === 'orders' && <OrderList />}
          </div>
        </div>
      </div>
    </div>
  );
}