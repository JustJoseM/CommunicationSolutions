// import React from "react";
// import {
//     BrowserRouter as Router,
//     Routes, 
//     Route,
//     Navigate,
// } from "react-router-dom";
// import './App.css';
// import './PagesCSS/Footer.css';
// import Navbar from "./Components/Navbar";
// import Sidebar from './Components/Sidebar';
// import Home from './Pages/Home';
// import Footer from "./Components/Footer";
// import SignIn from "./Pages/SignIn";
// import AboutUs from "./Pages/AboutUs";
// import Testimonial from "./Pages/Testimonial";
// import Contact from "./Pages/Contact";

// function App() {
//     return (
//         <div className="App">
//             <Navbar />
//             <Sidebar />
//             <Router>
//                 <Routes>
//                     {/* This route is for 'Home' component -> path is '/' */}
//                         <Route
//                             exact
//                             path="/"
//                             element={<Home />}
//                         />
//                         {/*This route is for the 'Schedule' component -> path is /schedule*/}
//                         <Route
//                             path="/signin"
//                             element={<SignIn />}
//                         />
//                         {/*This route is for the 'About' component -> path is /about*/}
//                         <Route
//                             path="/about"
//                             element={<AboutUs />}
//                         />
//                         {/*This route is for the 'Testimonial' component -> path is /testimonial*/}
//                         <Route
//                             path="/testimonial"
//                             element={<Testimonial />}
//                         />
//                         {/*This route is for the 'Contact' component -> path is /contact*/}
//                         <Route
//                             path="/contact"
//                             element={<Contact />}
//                         />
//                         {/*This route is for any mismatch -> defaults to '/'*/}
//                         <Route
//                             path="*"
//                             element={<Navigate to="/" />}
//                         />
//                 </Routes>
//             </Router>
//         <Footer />
//         </div>
        
//     )
// }
// export default App;

//Temporary Admin Portal Landing Page

import AdminHome from './AdminPortal/Home/AdminHome';
import Clients from './AdminPortal/Clients/Clients';
import SchedulingHome from './AdminPortal/Scheduling/SchedulingHome';
import AdminFooter from './AdminPortal/Components/Footer/AdminFooter';
import AdminNavbar from './AdminPortal/Components/Navbar/AdminNavbar';
import Menu from './AdminPortal/Components/Menu/Menu';
import {
    createBrowserRouter,
    RouterProvider,
    Outlet
  } from "react-router-dom";


function App() {

    const Layout =()=> {
        return (
            <div className="App">
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
            element: <Layout />,
            children:[
                { /* Route for Home*/
                    path:"/",
                    element:<AdminHome/>
                },
                { /* Route for Clients*/
                    path:"/clients",
                    element:<Clients/>
                },
                { /* Route for Scheduling*/
                    path:"/schedule",
                    element:<SchedulingHome/>
                },
            ]
        },
      ]);


    return (
        <RouterProvider router={router}/>
    );
}

export default App;