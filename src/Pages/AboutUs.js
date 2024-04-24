import React from "react";
import "../PagesCSS/AboutUs.css";
import s1 from '../assets/imgplaceholder.jpg';
import place from '../assets/placeholder.png';

const ContactUs = () => {
	return (
		<>
		<div className="Homes">
            <div className="container">
                <p className="text">Who Are We??</p>
            </div>
        </div>
		<div className="containersz">
            <div className="title-text">
                <div className="place_img">
                    <img src={place} alt=""/>             
                </div>
                <p>Info about the client/Company</p>
            </div>
        </div>
		<div className="serv_container">
            <div className="serv_img">
                <img src={s1} alt=""/>             
            </div>
            <div class="vLine"></div>
            <div className="service_one">
                <h4>Yelp Campaign</h4>
                <p>Management Of Promotional Outlets</p>
                <p> Such As Yelp, Facebook, and Etc</p>
            </div>
        </div>
		<div className="serv_container_t">
            <div className="gapspace">
            </div>
            <div className="service_two">
                <h4>Business Coaching</h4>
                <p>Business  Coaching That Are Geared</p>
                <p>Towards Their Clients Best Interest</p>
            </div>
            <div class="vLine"></div>
            <div className="serv_img_t">
                <p><img src={s1} alt=""/></p>             
            </div>
            
        </div>
		<div className="serv_container_th">
            <div className="serv_img_th">
                <p><img src={s1} alt=""/></p>             
            </div>
            <div class="vLine"></div>
            <div className="service_three">
                <h4>Communication Optimization</h4>
                <p>Streamlines The Essential Context Needed </p>
                <p>For Clients To Maintain And Grow Their Business</p>
            </div>
        </div>
		</>
	);
};

export default ContactUs;
