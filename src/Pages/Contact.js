import React from "react";
import contact from '../assets/contact.jpg';
import '../PagesCSS/Contact.css';

function Contact() {
    return (
        <div className="contact_container">
            <div className="contact-text">
                <h4>Get In Touch!</h4>
                    <p>Have any more questions? We'd love to hear from you. Here is </p>
                    <p>how to get in touch...</p>
            </div>
            <div className="contact-img">
                <img src={contact} alt=""/>             
            </div>
            <div className="contact-methods">
                <div className="phone-number">
                    <h4>Phone Number</h4>
                        <p>If you have any further questions contact this number</p>
                        <p>111-2222</p>
                </div>
                <div className="email">
                    <h4>Email</h4>
                        <p>Want another way to get a hold of us. Here is our email.</p>
                        <p>buisnessinfo@gmail.com</p>
                </div>
            </div>
        </div>
    );
}

export default Contact;