import React, { useState } from 'react';
import { RideProvider, useRides } from './context/RideContext';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import HistoryList from './components/HistoryList';
import Login from './pages/Login';
import ToastContainer from './components/ToastContainer';

const AppContent = () => {
  const { user } = useRides();
  const [activeTab, setActiveTab] = useState('dashboard');

  if (!user) {
    return <Login />;
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="container mx-auto">
        {activeTab === 'dashboard' ? (
          <Dashboard />
        ) : (
          <div className="pt-28 pb-12 px-4 max-w-6xl mx-auto">
            <HistoryList />
          </div>
        )}
      </main>

      <ToastContainer />
    </div>
  );
};

function App() {
  return (
    <RideProvider>
      <AppContent />
    </RideProvider>
  );
}

export default App;
