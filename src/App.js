import React from "react";
import {
    BrowserRouter as Router,
    Routes, 
    Route,
    Navigate,
} from "react-router-dom";
import './App.css';
import './PagesCSS/Footer.css';
import Navbar from "./Components/Navbar";
import Sidebar from './Components/Sidebar';
import Home from './Pages/Home';
// import Footer from "./Components/Footer";
import SignIn from "./Pages/SignIn";
import AboutUs from "./Pages/AboutUs";
import Testimonial from "./Pages/Testimonial";
import Contact from "./Pages/Contact";
import ForgotPassword from "./Pages/ForgotPassword";
import Verify from "./Pages/Verify";

function App() {
    return (
        <div className="App">
            <Navbar />
            <Sidebar />
            <Router>
                <Routes>
                    {/* This route is for 'Home' component -> path is '/' */}
                        <Route
                            exact
                            path="/"
                            element={<Home />}
                        />
                        {/*This route is for the 'Schedule' component -> path is /schedule*/}
                        <Route
                            path="/signin"
                            element={<SignIn />}
                        />
                        {/*This route is for the 'Password' component -> path is /password*/}
                        <Route
                            path="/forgotpassword"
                            element={<ForgotPassword />}
                        />
                        
                         {/*This route is for the 'verify' component -> path is /verify*/}
                         <Route
                            path="/verify"
                            element={<Verify />}
                        />

                        {/*This route is for the 'About' component -> path is /about*/}
                        <Route
                            path="/about"
                            element={<AboutUs />}
                        />
                        {/*This route is for the 'Testimonial' component -> path is /testimonial*/}
                        <Route
                            path="/testimonial"
                            element={<Testimonial />}
                        />
                        {/*This route is for the 'Contact' component -> path is /contact*/}
                        <Route
                            path="/contact"
                            element={<Contact />}
                        />
                        {/*This route is for any mismatch -> defaults to '/'*/}
                        <Route
                            path="*"
                            element={<Navigate to="/" />}
                        />
                        
                </Routes>
            </Router>
        {/* <Footer /> */}
        </div>
        
    )
}
export default App;
