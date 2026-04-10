import React, { useState } from 'react';
import RideForm from '../components/RideForm';
import RideCard from '../components/RideCard';
import MapPlaceholder from '../components/MapPlaceholder';
import { useRides } from '../context/RideContext';
import { motion } from 'framer-motion';
import { TrendingUp, Clock, ShieldCheck } from 'lucide-react';

const Dashboard = () => {
  const { rides } = useRides();
  const [pickup, setPickup] = useState('');
  const [drop, setDrop] = useState('');

  const activeRides = rides.filter(r => r.status !== 'Completed');

  return (
    <div className="max-w-6xl mx-auto px-4 pt-28 pb-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Form & Map */}
        <div className="lg:col-span-8 space-y-8">
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            <div className="glass p-8 rounded-[3rem] space-y-6">
              <div className="space-y-2">
                <h2 className="text-3xl font-black tracking-tight">Where to?</h2>
                <p className="text-muted-foreground text-sm font-medium">Book a premium ride in seconds.</p>
              </div>
              <RideForm />
            </div>

            <div className="h-full">
              <MapPlaceholder />
            </div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
             <div className="glass p-6 rounded-3xl flex items-center gap-4">
                <div className="bg-amber-100 p-3 rounded-2xl text-amber-600">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                   <span className="text-[10px] font-bold text-muted-foreground uppercase block">Avg. Wait</span>
                   <span className="text-sm font-bold">~4 mins</span>
                </div>
             </div>
             <div className="glass p-6 rounded-3xl flex items-center gap-4">
                <div className="bg-emerald-100 p-3 rounded-2xl text-emerald-600">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                   <span className="text-[10px] font-bold text-muted-foreground uppercase block">Verified</span>
                   <span className="text-sm font-bold">Top Rated</span>
                </div>
             </div>
             <div className="glass p-6 rounded-3xl flex items-center gap-4">
                <div className="bg-blue-100 p-3 rounded-2xl text-blue-600">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div>
                   <span className="text-[10px] font-bold text-muted-foreground uppercase block">Price</span>
                   <span className="text-sm font-bold">Standard</span>
                </div>
             </div>
          </div>
        </div>

        {/* Right Column: Active Rides */}
        <div className="lg:col-span-4 space-y-6">
          <div className="flex items-center justify-between px-2">
            <h3 className="text-xl font-black">Active Rides</h3>
            <span className="bg-primary/10 text-primary text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-tighter">
              {activeRides.length} Live
            </span>
          </div>

          <div className="space-y-4">
            {activeRides.length === 0 ? (
              <div className="glass p-10 rounded-[3.5rem] text-center space-y-4 border-dashed border-2 border-border/50">
                <div className="bg-muted w-16 h-16 rounded-full flex items-center justify-center mx-auto opacity-50">
                  <Clock className="w-8 h-8" />
                </div>
                <p className="text-sm font-medium text-muted-foreground">No active trips. Start exploring!</p>
              </div>
            ) : (
              activeRides.map(ride => (
                <RideCard key={ride.id} ride={ride} />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
