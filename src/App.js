import React from "react";
import {
    BrowserRouter as Router,
    Routes, 
    Route,
    Navigate,
} from "react-router-dom";
import './App.css';
import './footer.css';
import Sidebar from './Components/Sidebar';
import Home from './Pages/Home';
import Footer from "./Components/footer";
import ScheduleAppt from "./Pages/ScheduleAppt";
import AboutUs from "./Pages/AboutUs";
import Testimonial from "./Pages/Testimonial";
import Contact from "./Pages/Contact";

function App() {
    return (
        <div className="App">
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
                            path="/schedule"
                            element={<ScheduleAppt />}
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
        <Footer />
        </div>
        
    )
}
export default App;
