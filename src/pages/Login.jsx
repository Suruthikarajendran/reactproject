import React, { useState } from 'react';
import { useRides } from '../context/RideContext';
import { Car, Lock, User, ArrowRight, Globe } from 'lucide-react';
import { motion } from 'framer-motion';

const Login = () => {
  const { login } = useRides();
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      login({ name });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-slate-50 relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-0 -left-20 w-80 h-80 bg-primary/10 rounded-full blur-[100px]" />
      <div className="absolute bottom-0 -right-20 w-80 h-80 bg-blue-500/10 rounded-full blur-[100px]" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full glass p-8 sm:p-12 rounded-[3rem] card-shadow z-10"
      >
        <div className="flex flex-col items-center mb-10 text-center">
          <div className="bg-primary p-4 rounded-3xl shadow-2xl shadow-primary/40 mb-6">
            <Car className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-black tracking-tight mb-2">QuickCab</h1>
          <p className="text-muted-foreground font-medium uppercase tracking-widest text-xs">Premium Urban Mobility</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-bold ml-1 uppercase tracking-wider text-muted-foreground">Full Name</label>
            <div className="relative group">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full bg-muted/50 border-2 border-transparent focus:border-primary/30 focus:bg-background outline-none py-4 pl-12 pr-4 rounded-2xl transition-all font-medium"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold ml-1 uppercase tracking-wider text-muted-foreground">Access Code</label>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <input
                type="password"
                placeholder="Password (any)"
                className="w-full bg-muted/50 border-2 border-transparent focus:border-primary/30 focus:bg-background outline-none py-4 pl-12 pr-4 rounded-2xl transition-all font-medium"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-5 rounded-3xl transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-3 group"
          >
            Start Booking <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        <div className="mt-10 flex flex-col items-center gap-4">
          <div className="flex items-center gap-2 w-full text-muted-foreground">
            <div className="h-px bg-border flex-1" />
            <span className="text-[10px] font-black uppercase tracking-widest">Or connect with</span>
            <div className="h-px bg-border flex-1" />
          </div>
          <button type="button" className="flex items-center gap-2 px-6 py-3 rounded-full hover:bg-muted transition-colors text-sm font-bold">
            <Globe className="w-4 h-4" /> Provider
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
