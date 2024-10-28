import React from "react";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import '../PagesCSS/TestimonialTest.css';
import { clientTestimonials } from "../../Data/clientsTestimonial";

const Testimonial = () => {
    const settings = {
        accessibility: true,
        arrows: true,
        centerMode: true,
        centerPadding: "40px",
        dots: true,
        infinite: true,
        lazyLoad: "ondemand",
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    centerMode: false
                }
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 1
                }
            }
        ]
    };

    return (
        <div className="testimonial-section">
            <div className="testimonial-container">
                <h1 className="testimonial-header">Who We've Worked With</h1>
                <div className="header-divider"></div>

                {/* Slider component */}
                <Slider {...settings}>
                    {clientTestimonials.map(testimonial => (
                        <div className="testimonial-slide" key={testimonial.id}>
                        <div className="testimonial-card"> {/* Box to hold the review */}
                            <img src={testimonial.img} alt={testimonial.name} className="company-logo"/>
                            <div className="company-name">
                                <strong>{testimonial.name}</strong>
                            </div>
                            <p className="testimonial-description">
                                {testimonial.review}
                            </p>
                        </div>
                    </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
}

export default Testimonial;