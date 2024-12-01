import React from "react";
import '../../SiteCss/App.css';

function Footer(){
    return (
        <div className="footer">
            <div className="sb__footer section__padding">
                <div className="sb__footer-links">
                    <div className="sb__footer-links_div">
                        <h4>Communication Solution</h4>
                        <a href="/home">
                            <p>Home</p>
                        </a>
                        <a href="/aboutus">
                            <p>About Us</p>
                        </a>
                        <a href="/clienttestimonials">
                            <p>Client Testimonials</p>
                        </a>
                    </div>
                    <div className="sb__footer-links_div">
                        <h4>Services</h4>
                        <a href="/onlinereputationmanagment">
                            <p>Online Reputation Management</p>
                        </a>
                        <a href="/buisnessconsulting">
                            <p>Business Consulting</p>
                        </a>
                        <a href="/communicationoptimization">
                            <p>Communication Optimization</p>
                        </a>
                    </div>
                    <div className="sb__footer-links_div">
                        <h4>Contact</h4>
                        <a href="/email">
                            <p>Email</p>
                        </a>
                        <a href="/phonenumber">
                            <p>Phone Number</p>
                        </a>
                    </div>
                </div>

                <hr />

                <div className="sb__footer-below">
                    <div className="sb__footer-copyright">
                        <p>@{new Date().getFullYear()} Team Bit Theory, Sacramento State. This is a school project. None of what is displayed here is for profit.</p>
                    </div>
                    <div className="sb__footer-below-links">
                        <a href="/terms"><div><p>Terms & Conditions</p></div></a>
                        <a href="/privacy"><div><p>Privacy</p></div></a>
                        <a href="/security"><div><p>Security</p></div></a>
                        <a href="/cookie"><div><p>Cookie Declaration</p></div></a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;
