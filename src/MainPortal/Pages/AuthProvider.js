import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../../firebaseConfig"; 
import { onAuthStateChanged } from "firebase/auth";

// Create context
const AuthContext = createContext();

// Provide the Auth Context
export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
        });

        return unsubscribe;
    }, []);

    return (
        <AuthContext.Provider value={{ currentUser }}>
            {children}
        </AuthContext.Provider>
    );
}

// Custom hook to use the AuthContext
export function useAuth() {
    return useContext(AuthContext);
}
