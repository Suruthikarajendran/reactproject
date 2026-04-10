import React from 'react';
import { useRides } from '../context/RideContext';
import { Car, History, LogOut, User } from 'lucide-react';

const Navbar = ({ activeTab, setActiveTab }) => {
  const { user, logout } = useRides();

  if (!user) return null;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/40 px-4 py-3">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div 
          className="flex items-center gap-2 cursor-pointer" 
          onClick={() => setActiveTab('dashboard')}
        >
          <div className="bg-primary p-2 rounded-xl">
            <Car className="w-6 h-6 text-white" />
          </div>
          <span className="font-bold text-xl tracking-tight hidden sm:block">QuickCab</span>
        </div>

        <div className="flex items-center gap-2 sm:gap-6">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
              activeTab === 'dashboard' 
                ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                : 'hover:bg-muted'
            }`}
          >
            <Car className="w-4 h-4" />
            <span className="text-sm font-medium hidden sm:block">Book Ride</span>
          </button>
          
          <button
            onClick={() => setActiveTab('history')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
              activeTab === 'history' 
                ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                : 'hover:bg-muted'
            }`}
          >
            <History className="w-4 h-4" />
            <span className="text-sm font-medium hidden sm:block">History</span>
          </button>

          <div className="h-8 w-px bg-border mx-2" />

          <div className="flex items-center gap-3 pl-2">
            <div className="flex flex-col items-end hidden md:flex">
              <span className="text-xs font-semibold text-muted-foreground uppercase leading-none mb-1">Passanger</span>
              <span className="text-sm font-bold">{user.name}</span>
            </div>
            <button 
              onClick={logout}
              className="p-2 hover:bg-destructive/10 hover:text-destructive rounded-full transition-colors"
              title="Logout"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
