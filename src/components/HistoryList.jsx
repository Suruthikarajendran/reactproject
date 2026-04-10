import React from 'react';
import RideCard from './RideCard';
import { useRides } from '../context/RideContext';
import { Search, Filter } from 'lucide-react';

const HistoryList = () => {
  const { rides } = useRides();

  if (rides.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
        <div className="bg-muted p-6 rounded-full">
          <Search className="w-10 h-10 text-muted-foreground" />
        </div>
        <div>
          <h3 className="text-xl font-bold">No rides yet</h3>
          <p className="text-muted-foreground">Your booking history will appear here once you take your first trip.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-black">All Rides</h2>
        <div className="flex gap-2">
           <button className="p-2.5 rounded-2xl bg-muted hover:bg-muted/80 transition-colors">
              <Filter className="w-4 h-4" />
           </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rides.map((ride) => (
          <RideCard key={ride.id} ride={ride} />
        ))}
      </div>
    </div>
  );
};

export default HistoryList;
