import React, { useState } from 'react';
import '../PagesCSS/Navbar.css';
import {Link} from 'react-router-dom';
import { SidebarData } from './SidebarData';
import { auth } from '../../firebaseConfig';
import { signOut } from 'firebase/auth';
import { handleSignOut } from '../Pages/SignIn';

function Navbar() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
  
    const toggleSidebar = () => {
      setSidebarOpen(!sidebarOpen);
    };

    const handleLogout = async () => {
      try {
        await signOut(auth); 
        handleSignOut();
        console.log('User signed out');
        navigate("/signin"); 
        window.location.reload();  
      } catch (error) {
        console.error('Error signing out:', error.message);
      }
    };
  
    return (
      <div className="nav">
        <div className="nav-left">
          <div className="title">
            <h4>Communication Solutions</h4>
            <h2>User Signed In:</h2>
          </div>
        </div>
        <div className={`nav-right ${sidebarOpen ? 'shift-left' : ''}`}>
          <Link to="/schedule">
            <button className="button">Appointments</button>
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