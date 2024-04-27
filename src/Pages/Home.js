import React from "react";
import '../PagesCSS/Home.css';
import { Link } from "react-router-dom";
import placeholder from '../assets/hero.jpeg';

function Home() {
    return (
        <div className="Home">
            <h1 className="companyName"> Communication Solutions</h1>
            <h2>
                What can we do for you?
            </h2>
            <div className="content">
                <div className ="bodyText-box">
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed dapibus, elit id ultrices porttitor, ligula lacus tempor nisi, eget finibus orci elit vel dolor.
                    </p>
                </div>
            <div className="bodyImg-box">
                <img src={placeholder} alt="" />
            </div>
            </div>
        </div>
    );
}

export default Home;