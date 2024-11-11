import React, { useState } from 'react';
import '../PagesCSS/NavBar.css';
import {Link} from 'react-router-dom';
import { SidebarData } from './SidebarData';

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
        </div>
        <div className={`nav-right ${sidebarOpen ? 'shift-left' : ''}`}>
          <Link to="/schedule">
            <button className="button">Schedule Appointment</button>
          </Link>
          <button className="toggle-btn" onClick={toggleSidebar}>
            {/* Sidebar toggle button */}
            <span></span>
            <span></span>
            <span></span>
          </button>
          <div className={sidebarOpen ? "Sidebar open" : "Sidebar"}>
            {/* Close button */}
            <div className="close-btn" onClick={toggleSidebar}>
              &times;
            </div>
            <ul className="SidebarList">
                    {SidebarData.map((val, key) => {
                        return (
                            <li
                                key={key}
                                className="row"
                                id={window.location.pathname === val.link ? "active" : ""}
                                onClick={() => {
                                window.location.pathname = val.link;
                                }}>
                                <div id="title"> {val.title}</div>
                            </li>
                        );
                    })}
                </ul>
          </div>
        </div>
      </div>
    );
  }
  
  export default Navbar;