import React, {useState} from 'react';
import '../PagesCSS/Sidebar.css';
import { SidebarData } from './SidebarData';

    
function Sidebar() {
    //See the visibility of the sidebar
    const [isOpen, setIsOpen] = useState(false);

    //Toogle sidebar visibility 
    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            {/* Button to toggle sidebar */}
            <div className="toggle-btn" onClick={toggleSidebar}>
                <span></span>
                <span></span>
                <span></span>
            </div>
            {/* Sidebar */}
            <div className={isOpen ? "Sidebar open" : "Sidebar"}>
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
        </>
    );
}

export default Sidebar