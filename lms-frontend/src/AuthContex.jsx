// AuthContext.js
import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userRole, setUserRole] = useState(null);
  const [Id, setId] = useState(undefined);
  const [token, setToken] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    setAuthenticated(sessionStorage.getItem('isLoggedIn'));
  }, [authenticated])

  const login = (role,Id) => {
    setUserRole(role);
    setId(Id);
   // setToken(token);
    setAuthenticated(true);
  };

  const logout = () => {
    sessionStorage.clear();
    setUserRole(null);
    setId(null);
   // setToken(null);
    setAuthenticated(false);
    console.log('logout called -------------------')
  };

  return (
    <AuthContext.Provider value={{ userRole, Id, authenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

