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
import './PagesCSS/Footer.css';

/* Regular Site imports */
import Navbar from "./MainPortal/Components/Navbar";
import Sidebar from './MainPortal/Components/Sidebar';
import Home from './Pages/Home';
import Footer from "./MainPortal/Components/Footer";
import SignIn from "./MainPortal/Pages/SignIn";
import AboutUs from "./MainPortal/Pages/AboutUs";
import Testimonial from "./Pages/Testimonial";
import TestimonialTest from "./MainPortal/Pages/TestimonialTest";
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
                    element: <TestimonialTest />
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
                    path:"/admin/clients",
                    element:<Clients/>
                },
                { /* Route for Appointments & Scheduling*/
                    path:"/admin/appointments",
                    element:<AppointmentsHome />
                },
                { /* Route for Profile */
                    path:"/admin/profile",
                    element:<Profile />
                },
                { /* Route for Charts */
                    path: "/admin/charts",
                    element: <ChartsPage />
                }
            ]
        }
    ]);

    return (
        <RouterProvider router={router} />
    );
}

export default App;
