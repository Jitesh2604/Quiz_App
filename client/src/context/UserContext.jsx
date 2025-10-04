import React, { createContext, useContext, useState, useEffect } from "react";
import jwtDecode from "jwt-decode"; 
import { fetchUser } from "../utils/api";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initUser = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const decoded = jwtDecode(token);

        // Check if token expired
        if (Date.now() >= decoded.exp * 1000) {
          console.log("Token expired");
          localStorage.removeItem("token");
          setUser(null);
        } else {
          // Fetch actual user data from backend
          const userData = await fetchUser(); 
          setUser(userData);
        }
      } catch (err) {
        console.log("Invalid token", err);
        localStorage.removeItem("token");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    initUser();
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, setUser, logout, loading }}>
      {children}
    </UserContext.Provider>
  );
};


// eslint-disable-next-line react-refresh/only-export-components
export const useUser = () => useContext(UserContext);

export default UserContext;
