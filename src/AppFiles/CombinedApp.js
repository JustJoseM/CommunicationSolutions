import React from "react";
import {
    BrowserRouter as Router,
    createBrowserRouter,
    RouterProvider,
    Outlet,
    Navigate,
} from "react-router-dom";
import './App.css';
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

/* Admin imports */
import AdminHome from './AdminPortal/AdminHome/AdminHome';
import Clients from './AdminPortal/AdminClients/Clients';
import SchedulingHome from './AdminPortal/AdminScheduling/SchedulingHome';
import AdminFooter from './AdminPortal/Components/AdminFooter/AdminFooter';
import AdminNavbar from './AdminPortal/Components/AdminNavbar/AdminNavbar';
import Menu from './AdminPortal/Components/AdminMenu/Menu';

function App() {
    const MainLayout = () => {
        return (
            <div className="App">
                <Navbar />
                <Sidebar />
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
                {/* This route is for 'Home' component -> path is '/' */
                    path: "/",
                    element: <Home />
                },
                {
                    path: "/signin",
                    element: <SignIn />
                },
                {
                    path: "/about",
                    element: <AboutUs />
                },
                {
                    path: "/testimonial",
                    element: <Testimonial />
                },
                {
                    path: "/contact",
                    element: <Contact />
                },
                {
                    path: "/*",
                    element: <Navigate to = "/" />
                }
            ]
        },
        {
            path: "/admin",
            element: <AdminLayout />,
            children: [
                { /* Route for Home*/
                    path:"/admin",
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
            ]
        }
    ]);

    return (
        <RouterProvider router={router} />
    );
}

export default App;