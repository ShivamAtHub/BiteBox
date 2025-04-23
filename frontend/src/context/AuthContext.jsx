import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(localStorage.getItem('authToken'));

  const register = async (userData) => {
    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', userData, {
        headers: { 'Content-Type': 'application/json' },
      });
      localStorage.setItem('authToken', res.data.token);
      setAuthToken(res.data.token);
      return { success: true };
    } catch (err) {
      return {
        success: false,
        error: err.response?.data?.error || 'Registration failed',
      };
    }
  };

  const login = async (credentials) => {
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', credentials, {
        headers: { 'Content-Type': 'application/json' },
      });
      localStorage.setItem('authToken', res.data.token);
      setAuthToken(res.data.token);
      return { success: true };
    } catch (err) {
      return {
        success: false,
        error: err.response?.data?.error || 'Login failed',
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setAuthToken(null);
  };

  return (
    <AuthContext.Provider value={{ authToken, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// ✅ Hook to use auth context
export const useAuth = () => useContext(AuthContext);
