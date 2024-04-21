import React from "react";
import { BrowserRouter, Route, Routes} from "react-router-dom";
import './App.css';
import Sidebar from './Components/Sidebar';
// import BottomNav from './Components/BottomNav';
import Home from './Pages/Home';
import Footer from "./Components/footer";
import ScheduleAppt from "./Pages/ScheduleAppt";
import AboutUs from "./Pages/AboutUs";
import Testimonial from "./Pages/Testimonial";
import Contact from "./Pages/Contact";
import Navbar from "./Components/Navbar";

function App() {
    return (
        
        <div className="App">
            <Navbar />
            
             <>
            
            <BrowserRouter>  
            {/*<Sidebar /> */}
            {
            
            
               <Routes>
                <Route path="/" element={ <Home /> } />
             {/*}   <Route path="/schedule" element={<ScheduleAppt /> } />
                <Route path="/about" element={<AboutUs />} />
                <Route path="/testimonial" element={<Testimonial />} />
                <Route path="/contact" element={ <Contact />} /> 
            */}
                </Routes>
            
            }
            </BrowserRouter>  
            </> 
            
            
            
            
            
            {/* <BottomNav /> */}
            
        <Footer />
        </div>
        
        
    )
}
export default App;
