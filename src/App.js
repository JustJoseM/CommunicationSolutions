import React from "react";
import {
    BrowserRouter as Router,
    createBrowserRouter,
    RouterProvider,
    Outlet,
    Navigate,
} from "react-router-dom";
import './App.css';
import './AdminApp.css';
import './PagesCSS/Footer.css';

/* Regular Site imports */
import Navbar from "./Components/Navbar";
import Sidebar from './Components/Sidebar';
import Home from './Pages/Home';
import Footer from "./Components/Footer";
import SignIn from "./Pages/SignIn";
import AboutUs from "./Pages/AboutUs";
import Testimonial from "./Pages/Testimonial";
import Contact from "./Pages/Contact";
import ScheduleAppt from "./Pages/ScheduleAppt";

/* Admin imports */
import AdminHome from './AdminPortal/AdminHome/AdminHome';
import Clients from './AdminPortal/AdminClients/Clients';
import SchedulingHome from './AdminPortal/AdminScheduling/SchedulingHome';
import AdminFooter from './AdminPortal/AdminComponents/AdminFooter/AdminFooter';
import AdminNavbar from './AdminPortal/AdminComponents/AdminNavbar/AdminNavbar';
import Menu from './AdminPortal/AdminComponents/AdminMenu/Menu';
import Profile from './AdminPortal/AdminProfile/Profile';
import Notes from './AdminPortal/AdminNotes/NotesHome'

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
                { /* Route for Scheduling*/
                    path:"/admin/schedule",
                    element:<SchedulingHome/>
                },
                { /* Route for Notes*/
                    path:"/admin/notes",
                    element:<Notes/>
                },
                { /* Route for Profile */
                    path:"/admin/profile",
                    element:<Profile />
                }
            ]
        }
    ]);

    return (
        <RouterProvider router={router} />
    );
}

export default App;
