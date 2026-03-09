import { getTokenFromStorage, removeTokenFromStorage, setTokenInStorage } from "@/services/storageService";
import { createContext, useContext, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    // initialize isAuthenticated by checking if token already exists in storage
    // !! converts the token string to a boolean (null = false, token string = true)
    const [isAuthenticated, setIsAuthenticated] = useState(!!getTokenFromStorage());
    
    const login = token => {
        setTokenInStorage(token);
        setIsAuthenticated(true);
    }
    
    const logout = () => {
        removeTokenFromStorage();
        setIsAuthenticated(false);
    }
    
    // provides isAuthenticated, login, and logout to all child components
    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);