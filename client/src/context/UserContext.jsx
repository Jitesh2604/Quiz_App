import React, { createContext, useContext, useState, useEffect} from "react";
// The fix is on the next line:
import jwtDecode from "jwt-decode"; 

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const[user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
    
        if (token) {
          try {
            const decoded = jwtDecode(token); 
            // Optional: Check if the token is expired
            if (Date.now() >= decoded.exp * 1000) {
              console.log("Token expired");
              localStorage.removeItem("token");
              setUser(null);
            } else {
              setUser(decoded);
            }
          } catch (err) {
            console.log("Invalid token", err);
            localStorage.removeItem("token");
            setUser(null);
          }
        }
      }, []);

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
    };

    return(
        <UserContext.Provider value={{ user, setUser, logout}}>
            {children}
        </UserContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useUser = () => useContext(UserContext);

export default UserContext;
