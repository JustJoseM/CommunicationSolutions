import React from "react";
import "../PagesCSS/AboutUs.css";
import logo from "../../assets/business_logo.png";
import marketing from '../../assets/marketing.jpg';
import coaching from '../../assets/coaching.jpg';
import communication from '../../assets/communication.jpg';


const AboutUs = () => {
	return (
		<div className="aboutus_page">
            <div className="aboutus_section">
                <div className="company_logo">
                    <img src={logo} alt="main_buisness_logo"/>             
                </div>
                <div className="aboutus_text">
                    <h3>Who are we?</h3>
                    <p>Boost your brand's visibility with expert guidance! We specialize in empowering small businesses <br /> 
                       to shine through tailored marketing strategies, creative branding, and impactful campaigns. Let <br />
                       us help you connect, engage, and grow </p>
                </div>
            </div>
            <div className="services_section">
                <div className="transition_block">
                    <div className="services_title">
                        <p className="services_text">Our services...</p>
                    </div>
                </div>
                <div className="services_cards_container">
                    <div className="service_card">
                        <div className="service_image_container">
                            <img src={marketing} alt=""/>
                        </div>
                        <div className="service_card_text">
                            <h3>Yelp Campaign</h3>
                            <div className="service_description">
                                <p>We understand the impact of strategic online presence in shaping a brand's success. 
                                    We help businesses harness the power of platforms like Yelp, Facebook, and more to 
                                    connect with their audience, build trust, and drive growth. </p>
                                <p>We believe in the importance of optimizing promotional channels to enhance customer engagement and 
                                    amplify your brand’s message. From managing campaigns to fine-tuning your digital footprint, we're dedicated to
                                    elevating your visibility and unlocking new opportunities for your business. </p>   
                            </div>
                        </div>
                    </div>
                    <div className="service_card">
                        <div className="service_image_container">
                            <img src={coaching} alt=""/>
                        </div>
                        <div className="service_card_text">
                            <h3>Business Coaching</h3>
                            <div className="service_description">
                                <p>We believe in the transformative power of personalized business counseling to unlock the true potential of every client. 
                                Our approach is rooted in understanding your unique goals and aligning our strategies to serve your best interests.</p>
                                <p>With a focus on empowering growth, we offer tailored coaching that equips you with the tools, insights, and 
                                    guidance needed to navigate challenges, seize opportunities, and drive lasting success.</p>
                            </div>
                        </div>
                    </div>
                    <div className="service_card">
                        <div className="service_image_container">
                            <img src={communication} alt=""/>
                        </div>
                        <div className="service_card_text">
                            <h3>Communication Optimization</h3>
                            <div className="service_description">
                                <p>We believe that effective communication is the foundation of business success. 
                                By streamlining the essential context, we help ensure that clients have the clarity and insight they need to make informed decisions, foster meaningful connections, and drive growth.</p>
                                <p>Our focus is on optimizing communication strategies, empowering businesses to not only maintain but thrive in their competitive landscapes. 
                                With the right tools and guidance, we enable you to deliver your message with impact and confidence, unlocking new possibilities for sustainable growth.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
	);
};

export default AboutUs;