import React from "react";
// import { Routes, Route} from "react-router-dom";
import './App.css';
import Sidebar from './Components/Sidebar';
import BottomNav from './Components/BottomNav';
import Home from './Pages/Home';
// import ScheduleAppt from "./Pages/ScheduleAppt";
// import AboutUs from "./Pages/AboutUs";
// import Testimonial from "./Pages/Testimonial";
// import Contact from "./Pages/Contact";

function App() {
    return (
        <div className="App">
            <Sidebar />
            {/*
            When the time comes, use Routes to redirect to each page.
            <Routes>
                <Route path="/" element={ <Home /> } />
                <Route path="schedule" element={<ScheduleAppt /> } />
                <Route path="about" element={<AboutUs />} />
                <Route path="testimonial" element={<Testimonial />} />
                <Route path="contact" element={ <Contact />} />
            </Routes>
            */}
            <Home />
            <BottomNav />
        </div>
    )
}
export default App;
