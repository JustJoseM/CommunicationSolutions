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

/* Admin imports */
import AdminHome from './AdminPortal/AdminHome/AdminHome';
import Clients from "./AdminPortal/AdminPages/AdminClients/Clients";
import AppointmentsHome from './AdminPortal/AdminPages/AdminAppointments/AppointmentsHome';
import AdminFooter from './AdminPortal/AdminComponents/AdminFooter/AdminFooter';
import AdminNavbar from './AdminPortal/AdminComponents/AdminNavbar/AdminNavbar';
import Menu from './AdminPortal/AdminComponents/AdminMenu/Menu';
import Profile from "./AdminPortal/AdminPages/AdminProfile/Profile";
import ChartsPage from "./AdminPortal/AdminPages/AdminCharts/ChartsPage";
import AdminSettings from "./AdminPortal/AdminPages/AdminSettings/AdminSettings";


/* Admin Settings imports */
import GeneralSettings from "./AdminPortal/AdminPages/AdminSettings/SettingsPages/GeneralSettings";
import NotificationSettings from "./AdminPortal/AdminPages/AdminSettings/SettingsPages/NotificationSettings";
import ProfileSettings from "./AdminPortal/AdminPages/AdminSettings/SettingsPages/ProfileSettings";
import SchedulingSettings from "./AdminPortal/AdminPages/AdminSettings/SettingsPages/SchedulingSettings";
import CancelAppointment from "./Appointment/CancelAppointment";
import RescheduleAppointment from "./Appointment/RescheduleAppointment";

function App() {
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
        )
    }

    const router = createBrowserRouter([
        {
            path: "/",
            element: <MainLayout />,
            children: [
                {
                    /* This route is for the 'Home' component */
                    index: true,
                    element: <Home />
                },
                {
                    /* This route is for the 'Schdule Appointment' component */
                    path: "/schedule",
                    element: <ScheduleAppt />
                },
                {
                    /* This route is for the 'Sign-In' component */
                    path: "/signin",
                    element: <SignIn />
                },
                {
                    /* This route is for the 'About' component */
                    path: "/about",
                    element: <AboutUs />
                },
                {
                    /* This route is for the 'Testimonial' component */
                    path: "/testimonial",
                    element: <Testimonial />
                },
                {
                    /* This route is for the 'Contact' component */
                    path: "/contact",
                    element: <Contact />
                },
                {
                    /* This route is for any mismatch. Defaults to '/' */
                    path: "*",
                    element: <Navigate to="/" />
                },
                {
                    path: "/Reschedule",
                    element: <RescheduleAppointment />
                },
                {
                    path: "/Cancel",
                    element: <CancelAppointment />
                }
            ]
        },
        {
            path: "/admin",
            element: <AdminLayout />,
            children: [
                { /* Route for Home*/
                    index: true,
                    element:<AdminHome/>
                },
                { /* Route for Clients*/
                    path:"clients",
                    element:<Clients/>
                },
                { /* Route for Appointments & Scheduling*/
                    path:"appointments",
                    element:<AppointmentsHome />
                },
                { /* Route for Profile */
                    path:"profile",
                    element:<Profile />
                },
                { /* Route for Charts */
                    path: "charts",
                    element: <ChartsPage />
                },
                {
                    /* Route for Settings */
                    path:"settings",
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
        <RouterProvider router={router} />
    );
}

export default App;
