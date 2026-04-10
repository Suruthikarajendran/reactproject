import React, { createContext, useContext, useState, useEffect } from 'react';

const RideContext = createContext();

export const useRides = () => {
  const context = useContext(RideContext);
  if (!context) throw new Error('useRides must be used within a RideProvider');
  return context;
};

export const RideProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('cab_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [rides, setRides] = useState(() => {
    const savedRides = localStorage.getItem('cab_rides');
    return savedRides ? JSON.parse(savedRides) : [];
  });

  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    localStorage.setItem('cab_user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('cab_rides', JSON.stringify(rides));
  }, [rides]);

  const addToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  };

  const login = (userData) => {
    setUser({ ...userData, isLoggedIn: true });
    addToast('Welcome back, ' + userData.name + '!');
  };

  const logout = () => {
    setUser(null);
    addToast('Logged out successfully');
  };

  const bookRide = (pickup, drop) => {
    const drivers = ['Alex Johnson', 'Sarah Miller', 'David Wilson', 'Emma Davis', 'Michael Brown'];
    const randomDriver = drivers[Math.floor(Math.random() * drivers.length)];
    const mockDistance = (Math.random() * 10 + 2).toFixed(1); // 2km to 12km
    const fare = (mockDistance * 15).toFixed(2); // $15 per km

    const newRide = {
      id: Date.now(),
      pickup,
      drop,
      fare,
      distance: mockDistance,
      status: 'Booked',
      driver: randomDriver,
      date: new Date().toLocaleString(),
    };

    setRides((prev) => [newRide, ...prev]);
    addToast('Ride booked! Driver ' + randomDriver + ' is on the way.');

    // Simulate Ride Progress
    simulateRide(newRide.id);
  };

  const simulateRide = (rideId) => {
    // Booked -> Ongoing after 5 seconds
    setTimeout(() => {
      updateRideStatus(rideId, 'Ongoing');
      addToast('Your ride is now ongoing.');
      
      // Ongoing -> Completed after 8 seconds
      setTimeout(() => {
        updateRideStatus(rideId, 'Completed');
        addToast('Ride completed! Hope you had a great trip.');
      }, 8000);
    }, 5000);
  };

  const updateRideStatus = (id, status) => {
    setRides((prev) =>
      prev.map((ride) => (ride.id === id ? { ...ride, status } : ride))
    );
  };

  return (
    <RideContext.Provider
      value={{
        user,
        rides,
        toasts,
        login,
        logout,
        bookRide,
        addToast,
      }}
    >
      {children}
    </RideContext.Provider>
  );
};
