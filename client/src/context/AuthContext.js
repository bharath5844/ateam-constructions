import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('ateam_token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      axios.get('/api/auth/verify')
        .then(r => setAdmin(r.data.admin))
        .catch(() => localStorage.removeItem('ateam_token'))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (username, password) => {
    const { data } = await axios.post('/api/auth/login', { username, password });
    localStorage.setItem('ateam_token', data.token);
    axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
    setAdmin({ username: data.username });
    return data;
  };

  const logout = () => {
    localStorage.removeItem('ateam_token');
    delete axios.defaults.headers.common['Authorization'];
    setAdmin(null);
  };

  return (
    <AuthContext.Provider value={{ admin, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
