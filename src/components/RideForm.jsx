import React, { useState, useEffect } from 'react';
import { MapPin, Navigation, DollarSign, ArrowRight, Loader2 } from 'lucide-react';
import { useRides } from '../context/RideContext';

const RideForm = () => {
  const { bookRide } = useRides();
  const [pickup, setPickup] = useState('');
  const [drop, setDrop] = useState('');
  const [isEstimating, setIsEstimating] = useState(false);
  const [estimation, setEstimation] = useState(null);

  useEffect(() => {
    if (pickup && drop) {
      setIsEstimating(true);
      const timer = setTimeout(() => {
        const fare = (Math.random() * 20 + 10).toFixed(2);
        const time = Math.floor(Math.random() * 20 + 5);
        setEstimation({ fare, time });
        setIsEstimating(false);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setEstimation(null);
    }
  }, [pickup, drop]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!pickup || !drop) return;
    bookRide(pickup, drop);
    setPickup('');
    setDrop('');
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-4">
          <div className="relative group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors">
              <MapPin className="w-5 h-5" />
            </div>
            <input
              type="text"
              placeholder="Enter pickup location"
              className="w-full bg-muted/50 border-2 border-transparent focus:border-primary/30 focus:bg-background outline-none py-4 pl-12 pr-4 rounded-2xl transition-all font-medium"
              value={pickup}
              onChange={(e) => setPickup(e.target.value)}
              required
            />
          </div>

          <div className="relative group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors">
              <Navigation className="w-5 h-5" />
            </div>
            <input
              type="text"
              placeholder="Enter destination"
              className="w-full bg-muted/50 border-2 border-transparent focus:border-primary/30 focus:bg-background outline-none py-4 pl-12 pr-4 rounded-2xl transition-all font-medium"
              value={drop}
              onChange={(e) => setDrop(e.target.value)}
              required
            />
          </div>
        </div>

        {estimation && (
          <div className="bg-primary/5 border border-primary/20 p-5 rounded-3xl animate-in fade-in slide-in-from-top-4 duration-500">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-semibold text-primary/80 flex items-center gap-1 uppercase tracking-wider">
                <DollarSign className="w-4 h-4" /> Estimated Fare
              </span>
              <span className="text-2xl font-black text-primary">${estimation.fare}</span>
            </div>
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Duration</span>
              <span className="font-bold text-foreground">~{estimation.time} mins</span>
            </div>
          </div>
        )}

        {isEstimating && (
          <div className="flex items-center justify-center gap-2 py-4 text-muted-foreground animate-pulse">
            <Loader2 className="w-4 h-4 animate-spin text-primary" />
            <span className="text-sm font-medium">Calculating best route...</span>
          </div>
        )}

        <button
          type="submit"
          disabled={!pickup || !drop || isEstimating}
          className="w-full bg-primary hover:bg-primary/90 disabled:opacity-50 disabled:bg-muted text-white font-bold py-5 rounded-3xl transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-3 group"
        >
          Book Your Ride <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </form>
    </div>
  );
};

export default RideForm;
