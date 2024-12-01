import React from "react";
import '../PagesCSS/Home.css';
import { Link } from "react-router-dom";
import one from '../../assets/home_one.png';
import two from '../../assets/home_two.png';
import { Helmet } from 'react-helmet'; 

function Home() {
    return (
        <div className="Home">
            <Helmet>
                <title>Home - Communication Solutions</title>
                <meta
                    name="description"
                    content="Achieve your business goals with our tailored coaching, communication strategies, and online reputation management to help you create the dream business you want."
                    />
            </Helmet>
            {/* <img src={lines} alt="" className="home_lines"/> */}
            <div className="home_data">
                <h1 className="home_title">
                    Create the <br />
                    Dream Business <br />
                    You Want Here
                </h1>
                <p className="home_description">
                    We provide the best business coaching, plan of action, and <br />
                    customer service to help make your dream a reality.
                </p>

                <div className="home_buttons">
                <   Link to="/about">
                        <button className="button_service">Our Services</button>
                    </Link>

                    <Link to="/testimonial" className="text_link">
                         Testimonials <span className="arrow">➔</span>
                    </Link>
                </div>
            </div>
            <div className="home_images">
                <img src={one} alt="one-alt" className="home_one"/>
                <img src={two} alt="two-alt" className="home_two"/>
            </div>
        </div>
    );
}

export default Home;