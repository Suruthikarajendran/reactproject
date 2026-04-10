import React from 'react';
import { MapPin, Navigation } from 'lucide-react';

const MapPlaceholder = ({ pickup, drop }) => {
  return (
    <div className="relative w-full h-full min-h-[300px] bg-slate-100 rounded-3xl overflow-hidden border-2 border-dashed border-muted-foreground/20 flex items-center justify-center">
      {/* Abstract Map Grid */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
      
      <div className="z-10 flex flex-col items-center gap-6 p-8 text-center">
        <div className="flex -space-x-4 mb-2">
          <div className="bg-white p-3 rounded-full shadow-xl animate-bounce">
            <MapPin className="w-8 h-8 text-red-500" />
          </div>
          <div className="bg-white p-3 rounded-full shadow-xl animate-bounce delay-150">
            <Navigation className="w-8 h-8 text-primary" />
          </div>
        </div>
        
        <div className="space-y-2">
          <h3 className="text-xl font-bold">Interactive Map Preview</h3>
          <p className="text-muted-foreground text-sm max-w-[250px]">
            {pickup && drop 
              ? `Routing from ${pickup} to ${drop}...` 
              : "Enter locations to see estimated route and traffic data."}
          </p>
        </div>

        {(pickup || drop) && (
          <div className="flex flex-col gap-2 w-full max-w-xs">
            {pickup && (
              <div className="bg-white/80 backdrop-blur-sm p-3 rounded-2xl flex items-center gap-3 border border-border">
                <MapPin className="w-4 h-4 text-red-500" />
                <span className="text-xs font-semibold truncate text-left flex-1">{pickup}</span>
              </div>
            )}
            {drop && (
              <div className="bg-white/80 backdrop-blur-sm p-3 rounded-2xl flex items-center gap-3 border border-border">
                <Navigation className="w-4 h-4 text-primary" />
                <span className="text-xs font-semibold truncate text-left flex-1">{drop}</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Mock Map Decoration */}
      <div className="absolute top-10 right-10 w-32 h-32 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-10 left-10 w-48 h-48 bg-blue-500/5 rounded-full blur-3xl" />
    </div>
  );
};

export default MapPlaceholder;
