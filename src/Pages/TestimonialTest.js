import React from "react";
import Slider from "react-slick";

import '../PagesCSS/TestimonialTest.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import USAPRO_logo from '../assets/USAPRO.jpg';
import ClearPRO_logo from '../assets/ClearPRO.png';
import APEX_logo from '../assets/APEX.jpg';

const Testimonial = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 15000,
    };

    return (
        <div className="testimonial-section">
            <div className="testimonial-container">
                <h1 className="testimonial-header">Who We've Worked With</h1>
                <div className="header-divider"></div>
                <Slider {...settings}>
                    <div className="testimonial-slide">
                        <div className="testimonial-card">
                            <img src={USAPRO_logo} alt="USA PRO" className="company-logo"/>
                            <div className="company-name">
                                <strong>USA PRO</strong>
                            </div>
                            <p className="testimonial-description">
                                Review goes here
                            </p>
                        </div>
                    </div>
                    <div className="testimonial-slide">
                        <div className="testimonial-card">
                            <img src={ClearPRO_logo} alt="Clear PRO" className="company-logo"/>
                            <div className="company-name">
                                <strong>ClearPro</strong>
                            </div>
                            <p className="testimonial-description">
                                Review goes here
                            </p>
                        </div>
                    </div>
                    <div className="testimonial-slide">
                        <div className="testimonial-card">
                            <img src={APEX_logo} alt="Apex Window Cleaning" className="company-logo"/>
                            <div className="company-name">
                                <strong>Apex Window Cleaning</strong>
                            </div>
                            <p className="testimonial-description">
                                Review goes here
                            </p>
                        </div>
                    </div>
                </Slider>
            </div>
        </div>
    );
}

export default Testimonial;