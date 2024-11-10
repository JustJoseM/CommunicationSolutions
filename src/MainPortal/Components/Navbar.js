import React, { useState } from 'react';
import '../PagesCSS/AboutUs.css';
import '../PagesCSS/NavBar.css';
import {Link} from 'react-router-dom';
import Logo from '../../assets/company_logo.PNG';
import TestSideBar from '../Components/Sidebar';
import '../PagesCSS/Sidebar.css';

function Navbar() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
  
    const toggleSidebar = () => {
      setSidebarOpen(!sidebarOpen);
    };
  
    return (
      <div className="nav">
        <div className="nav-left">
          <div className="title">
            <h4>Communication Solutions</h4>
          </div>
          <div className="company_icon">
            <img src={Logo} alt="Company Logo" className="company_logo_st" />
          </div>
        </div>
        <div className={`nav-right ${sidebarOpen ? 'shift-left' : ''}`}>
          <Link to="/schedule">
            <button className="button">Schedule Appointment</button>
          </Link>
          <button className="sb-button" onClick={toggleSidebar}>
            <TestSideBar />
          </button>
        </div>
      </div>
    );
  }
  
  export default Navbar;