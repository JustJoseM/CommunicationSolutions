import { dividerClasses } from '@mui/material';
import React from 'react';
import '../App.css';
import { BottomNavData } from './BottomNavContact';

function BottomNav() {
        return (
        <div className="BottomNav">
            <ul className="BottomNavContact">
                {BottomNavData.map((val, key) => {
                    return (
                        <li
                            key={key}
                            className="row"
                            id={window.location.pathname == val.link ? "active" : ""}
                            onClick={() => {
                                window.location.pathname = val.link;
                            }
                        }
                        >
                            <div id="icon">
                                {val.icon}
                            </div>
                            <div id="contactBottom">
                                {val.title}
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default BottomNav