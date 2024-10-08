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
import Footer from "./Components/Footer";
import SignIn from "./Pages/SignIn";
import AboutUs from "./Pages/AboutUs";
import Testimonial from "./Pages/Testimonial";
import Contact from "./Pages/Contact";

function App() {
    return (
        <div className="App">
            <Navbar />
            <Sidebar />
            <Router>
                <Routes>
                    {/* This route is for 'Home' component */}
                        <Route
                            exact
                            path="/"
                            element={<Home />}
                        />
                        {/*This route is for the 'sign-in' component */}
                        <Route
                            path="/signin"
                            element={<SignIn />}
                        />
                        {/*This route is for the 'About' component*/}
                        <Route
                            path="/about"
                            element={<AboutUs />}
                        />
                        {/*This route is for the 'Testimonial' component */}
                        <Route
                            path="/testimonial"
                            element={<Testimonial />}
                        />
                        {/*This route is for the 'Contact' component */}
                        <Route
                            path="/contact"
                            element={<Contact />}
                        />
                        {/*This route is for any mismatch */}
                        <Route
                            path="*"
                            element={<Navigate to="/" />}
                        />
                </Routes>
            </Router>
        <Footer />
        </div>
        
    )
}
export default App;