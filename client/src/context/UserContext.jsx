import React, { createContext, useContext, useState, useEffect} from "react";
import jwt_decode from "jwt-decode";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const[user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");

        if(token) {
            try {
                const decoded = jwt_decode(token);
                setUser(decoded);
            } catch (err) {
                console.log("Invalid token", err);
                
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