import React, { createContext, useState, useContext } from 'react';

const AuthContext =createContext()

export const AuthProvider = ({ children }) => {
    const [isLogin, setIsLogin] = useState(false);

    return (
        <AuthContext.Provider value={{
            isLogin,setIsLogin
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }

    return context;
};
