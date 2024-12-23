import React from "react";
import '../PagesCSS/Contact.css';
import { Helmet } from 'react-helmet';
/* eslint-disable */
const Contact = () => {
    return (
        <>
        <Helmet>
             <title>Contact Info - Communications Solution</title>
             
             <meta
                    name="description"
                    content="Get in touch with Communication Solutions for expert business coaching and support. Find our contact information to start growing your business today."
                />
        </Helmet>
        <div className="contact-pg">
            {/* Hero Section */}
            <div className="hero-section">
                <div className="hero-content">
                    <h1>Get in touch with us</h1>
                    <p>We're here to help. Reach out to us through the method that works best for you.</p>
                    <p>Disclaimer: This is a school project and all of the provided information is not real. Please do not reach out.</p>
                </div>
            </div>
            <div className="divider"></div>

            {/* Contact Methods */}
            <div className="contact-methods">
                <h2>How can we help?</h2>
                <div className="methods-container">
                    <div className="phone-method">
                        <h4>Phone Support</h4>
                        <p>Call us for immediate support at:</p>
                        <a href="#">Placeholder!</a>
                    </div>
                    <div className="email-method">
                        <h4>Email Support</h4>
                        <p>For general inquiries, email us at:</p>
                        <a href="#">Placeholder!</a>
                    </div>
                    <div className="office-method">
                        <h4>Our Office</h4>
                        <p>Visit us at:</p>
                        <p>123 Business Street, Business City</p>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}
  /* eslint-enable */
export default Contact;