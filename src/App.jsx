import React from 'react';
import { AppProvider, useApp } from './contexts/AppContext';
import CustomerView from './components/customer/CustomerView';
import AdminPanel from './components/admin/AdminPanel';

function AppContent() {
  const { isAdmin } = useApp();
  
  return isAdmin ? <AdminPanel /> : <CustomerView />;
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}