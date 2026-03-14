import React, { createContext, useContext, useState, useEffect } from 'react';
import { loginAdmin, logoutAdmin, onAuthChange } from '../firebaseService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthChange(user => { setAdmin(user); setLoading(false); });
    return unsub;
  }, []);

  return (
    <AuthContext.Provider value={{ admin, login: loginAdmin, logout: logoutAdmin, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
