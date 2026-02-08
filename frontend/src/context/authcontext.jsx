import React, { createContext, useContext, useState, useEffect } from 'react'

export const AuthContext = createContext();          

export const AuthContextProvider = ({ children }) => { 
    const [user, setUser] = useState(() => localStorage.getItem("email"));
    const [token, setToken] = useState(() => localStorage.getItem("token"));
    const [role, setRole] = useState(() => localStorage.getItem("role"));

    const login = (email, token, role) => {
        setUser(email);
        setToken(token);
        setRole(role);
        localStorage.setItem("email", email);
        localStorage.setItem("token", token);
        localStorage.setItem("role", role);
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        setRole(null);
        localStorage.removeItem("email");    
        localStorage.removeItem("token");
        localStorage.removeItem("role");
    };

    return (
        <AuthContext.Provider value={{ user, token, role, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};