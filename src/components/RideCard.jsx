import React from 'react';
import { MapPin, Navigation, User, Calendar, Trash2, Clock, CheckCircle2, Car } from 'lucide-react';
import { motion } from 'framer-motion';

const RideCard = ({ ride, variant = 'compact' }) => {
  const getStatusConfig = (status) => {
    switch (status) {
      case 'Booked':
        return { 
          color: 'bg-blue-100 text-blue-700', 
          icon: <Clock className="w-3 h-3" />,
          label: 'Booked'
        };
      case 'Ongoing':
        return { 
          color: 'bg-amber-100 text-amber-700 animate-pulse', 
          icon: <Car className="w-3 h-3" />,
          label: 'In Progress'
        };
      case 'Completed':
        return { 
          color: 'bg-emerald-100 text-emerald-700', 
          icon: <CheckCircle2 className="w-3 h-3" />,
          label: 'Completed'
        };
      default:
        return { color: 'bg-gray-100 text-gray-700', icon: null, label: status };
    }
  };

  const statusConfig = getStatusConfig(ride.status);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`glass group hover:bg-white transition-all card-shadow p-5 rounded-[2rem] border border-border/50`}
    >
      <div className="flex justify-between items-start mb-6">
        <div className="flex items-center gap-3">
          <div className="bg-primary/10 p-2.5 rounded-2xl">
            <Car className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h4 className="font-bold text-lg leading-tight">${ride.fare}</h4>
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">{ride.distance} km</span>
          </div>
        </div>
        <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${statusConfig.color}`}>
          {statusConfig.icon}
          {statusConfig.label}
        </div>
      </div>

      <div className="relative space-y-6 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-gradient-to-b before:from-red-400 before:via-primary/20 before:to-primary">
        <div className="flex gap-4 relative">
          <div className="z-10 bg-white p-1">
             <MapPin className="w-4 h-4 text-red-500 shrink-0" />
          </div>
          <div className="flex-1">
            <span className="text-[10px] font-bold text-muted-foreground uppercase block mb-1">Pickup</span>
            <p className="text-sm font-bold line-clamp-1">{ride.pickup}</p>
          </div>
        </div>

        <div className="flex gap-4 relative">
          <div className="z-10 bg-white p-1">
            <Navigation className="w-4 h-4 text-primary shrink-0" />
          </div>
          <div className="flex-1">
            <span className="text-[10px] font-bold text-muted-foreground uppercase block mb-1">Destination</span>
            <p className="text-sm font-bold line-clamp-1">{ride.drop}</p>
          </div>
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-border/50 grid grid-cols-2 gap-4">
        <div className="flex items-center gap-2 group/info">
          <div className="p-2 bg-muted rounded-xl transition-colors group-hover/info:bg-primary/10 group-hover/info:text-primary">
            <User className="w-3.5 h-3.5" />
          </div>
          <div>
             <span className="text-[9px] font-bold text-muted-foreground uppercase block">Driver</span>
             <span className="text-[11px] font-bold truncate block max-w-[80px]">{ride.driver}</span>
          </div>
        </div>
        <div className="flex items-center gap-2 group/info">
          <div className="p-2 bg-muted rounded-xl transition-colors group-hover/info:bg-primary/10 group-hover/info:text-primary">
            <Calendar className="w-3.5 h-3.5" />
          </div>
          <div>
            <span className="text-[9px] font-bold text-muted-foreground uppercase block">Date</span>
            <span className="text-[11px] font-bold truncate block">{ride.date.split(',')[0]}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default RideCard;
