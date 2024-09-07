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
import {
    BrowserRouter as Router,
    Routes, 
    Route,
    Navigate,
} from "react-router-dom";

function App() {
    return (
        <div className="App">
            <Router>
                <Routes>
                    {/* Route for 'AdminHome' component -> path is '/' */}
                    <Route
                        exact
                        path="/"
                        element={<AdminHome />}
                    />
                    {/*This route is for the 'Clients' component -> path is /schedule*/}
                         <Route
                             path="/clients"
                             element={<Clients />}
                         />
                         {/*This route is for the 'Scheduling' component -> path is /about*/}
                         <Route
                             path="/schedule"
                             element={<SchedulingHome />}
                         />
                </Routes>
            </Router>
        </div>
    );
}

export default App;