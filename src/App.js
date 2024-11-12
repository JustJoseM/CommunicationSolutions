import React from "react";
import {
    BrowserRouter as Router,
    createBrowserRouter,
    RouterProvider,
    Outlet,
    Navigate,
} from "react-router-dom";

import './SiteCss/App.css';
import './SiteCss/AdminApp.css';
import './MainPortal/PagesCSS/Footer.css';

/* Regular Site imports */
import Navbar from "./MainPortal/Components/Navbar";
import Sidebar from './MainPortal/Components/Sidebar';
import Home from './MainPortal/Pages/Home';
import Footer from './MainPortal/Components/Footer';

import SignIn from "./MainPortal/Pages/SignIn";
import AboutUs from "./MainPortal/Pages/AboutUs";
import Testimonial from "./MainPortal/Pages/Testimonial";
import Contact from "./MainPortal/Pages/Contact";
import ScheduleAppt from "./MainPortal/Pages/ScheduleAppt";
import ProtectedRoute from "./MainPortal/Pages/ProtectedRoute";
import { AuthProvider, useAuth } from "./MainPortal/Pages/AuthProvider";
/* Admin imports */
import AdminHome from './AdminPortal/AdminHome/AdminHome';
import Clients from "./AdminPortal/AdminPages/AdminClients/Clients";
import AppointmentsHome from './AdminPortal/AdminPages/AdminAppointments/AppointmentsHome';
import AdminFooter from './AdminPortal/AdminComponents/AdminFooter/AdminFooter';
import AdminNavbar from './AdminPortal/AdminComponents/AdminNavbar/AdminNavbar';
import Menu from './AdminPortal/AdminComponents/AdminMenu/Menu';
import Profile from "./AdminPortal/AdminPages/AdminProfile/Profile";
import ChartsPage from "./AdminPortal/AdminPages/AdminCharts/ChartsPage";
import Notes from "./AdminPortal/AdminPages/AdminNotes/NotesHome";
import AdminSettings from "./AdminPortal/AdminPages/AdminSettings/AdminSettings";


/* Admin Settings imports */
import GeneralSettings from "./AdminPortal/AdminPages/AdminSettings/SettingsPages/GeneralSettings";
import NotificationSettings from "./AdminPortal/AdminPages/AdminSettings/SettingsPages/NotificationSettings";
import ProfileSettings from "./AdminPortal/AdminPages/AdminSettings/SettingsPages/ProfileSettings";
import SchedulingSettings from "./AdminPortal/AdminPages/AdminSettings/SettingsPages/SchedulingSettings";
import CancelAppointment from "./Appointment/CancelAppointment";
import RescheduleAppointment from "./Appointment/RescheduleAppointment";

function App() {
    const issign = false;
    const MainLayout = () => {
        return (
            
            <div className="MainApp">
                <Navbar />
                <Sidebar />
                <Outlet />
                <Footer />
            </div>
        )
    }

    const AdminLayout = () => {
        const { currentUser } = useAuth();
    
        if (currentUser === undefined) {
            // Display a loading state until currentUser is available
            return <div>Loading...</div>;
        }
    
        return (
            <div className="AdminApp">
                <AdminNavbar />
                <div className="container">
                    <div className="menuContainer">
                        <Menu />
                    </div>
                    <div className="contentContainer">
                        <Outlet />
                    </div>
                </div>
                <AdminFooter />
            </div>
        );
    };
    
    
    const AdminProtectedRoute = () => {
        return (
                <ProtectedRoute>
                <AdminLayout />
                </ProtectedRoute>
        );
    };
    
    
    
    

    const router = createBrowserRouter([
        {
            path: "/",
            element: <MainLayout />,
            children: [
                { index: true, element: <Home /> },
                { path: "/schedule", element: <ScheduleAppt /> },
                { path: "/signin", element: <SignIn /> },
                { path: "/about", element: <AboutUs /> },
                { path: "/testimonial", element: <Testimonial /> },
                { path: "/contact", element: <Contact /> },
                { path: "*", element: <Navigate to="/" /> },
                { path: "/Reschedule", element: <RescheduleAppointment /> },
                { path: "/Cancel", element: <CancelAppointment /> },
            ]
        },
        {
            path: "/admin",
            element: <AdminProtectedRoute />,  
            children: [
                { 
                    index: true, 
                    element: <AdminHome /> 
                },
                { 
                    path: "clients", 
                    element: <Clients /> 
                },
                { 
                    path: "appointments", 
                    element: <AppointmentsHome /> 
                },
                { 
                    path: "notes", 
                    element: <Notes /> 
                },
                { 
                    path: "profile", 
                    element: <Profile /> 
                },
                { 
                    path: "charts", 
                    element: <ChartsPage /> 
                },
                {
                    path: "settings",
                    element: <AdminSettings />,
                    children: [
                        { 
                            path: "profile", 
                            element: <ProfileSettings /> 
                        },
                        { 
                            path: "notifications", 
                            element: <NotificationSettings /> 
                        },
                        { 
                            path: "scheduling", 
                            element: <SchedulingSettings /> 
                        },
                        { 
                            path: "general", 
                            element: <GeneralSettings /> 
                        },
                    ]
                },
            ]
        }
    ]);
    

    return (
        <AuthProvider>
        <RouterProvider router={router} />
        </AuthProvider>
    );
}

export default App;
