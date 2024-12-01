import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthProvider"; 

const ProtectedRoute = ({ children }) => {
    const { currentUser } = useAuth();  

    // If the currentUser is not defined (not authenticated)
    if (!currentUser) {
        // Redirect the user to the sign-in page
        return <Navigate to="/signin" replace />;
    }

    // If the currentUser exists (authenticated), render the protected content
    return children;  // Render the child components passed to ProtectedRoute
};

export default ProtectedRoute;
