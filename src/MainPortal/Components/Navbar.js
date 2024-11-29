import React, { useState, useEffect } from 'react';
import '../PagesCSS/Navbar.css';
import {Link, NavLink, useNavigate} from 'react-router-dom';
import { SidebarData } from './SidebarData';
import { auth } from '../../firebaseConfig';
import { signOut } from 'firebase/auth';
import { handleSignOut } from '../Pages/SignIn';

/* eslint-disable */
function Navbar() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [userEmail, setUserEmail] = useState(null);

    const toggleSidebar = () => {
      setSidebarOpen(!sidebarOpen);
    };

    useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged((user) => {
        if (user) {
          setUserEmail(user.email); 
        } else {
         setUserEmail(null); 
        }
    });

    // Cleanup subscription
    return () => unsubscribe();
  }, []);

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
          <NavLink to = "/" className="nav-left">
            <span className = "title">Communication Solutions</span>
          </NavLink>
          {userEmail && <p className="user-email">User: {userEmail}</p>} {/* Display user's email */}
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
                {userEmail && (
                <button className="log_out_user" onClick={handleLogout}>Log Out</button>
              )}
          </div>
        </div>
      </div>
    );
  }
  /* eslint-enable */
  
  export default Navbar;