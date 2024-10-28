import React from "react";
import contactImage from '../../assets/hero.jpeg';
import '../PagesCSS/Contact.css';

const Contact = () => {
    return (
        <div className="contact-pg">
            {/* Hero Section */}
            <div className="hero-section">
                <div className="hero-content">
                    <h1>Get in Touch with Us</h1>
                    <p>We're here to help. Reach out to us through the method that works best for you.</p>
                </div>
            </div>
            <div className="divider"></div>

            {/* Contact Methods */}
            <div className="contact-methods">
                <h2>How Can We Help?</h2>
                <div className="methods-container">
                    <div className="phone-method">
                        <h4>Phone Support</h4>
                        <p>Call us for immediate support at:</p>
                        <a href="tel:+111-2222">111-2222</a>
                    </div>
                    <div className="email-method">
                        <h4>Email Support</h4>
                        <p>For general inquiries, email us at:</p>
                        <a href="mailto:businessinfo@business.com">businessinfo@business.com</a>
                    </div>
                    <div className="office-method">
                        <h4>Our Office</h4>
                        <p>Visit us at:</p>
                        <p>123 Business Street, Business City</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Contact;