import React from "react";
import "../PagesCSS/AboutUs.css";
import s1 from '../assets/imgplaceholder.jpg';
import place from '../assets/placeholder.png';
import logo from "../assets/business_logo.png";

const AboutUs = () => {
	return (
		<>
		<div className="company_container">
            <div className="title-text">
                <div className="company_logo">
                    <img src={logo} alt=""/>             
                </div>
                <p className="company_name">Communications Solution</p>
            </div>
        </div>
        <div className="main_about">
            <div className="who_are_we_container">
                <p className="who_text">Who Are We?</p>
            </div>
        </div>
		<div className="yelp_container">
            <div className="yelp_service_img">
                <img src={s1} alt=""/>             
            </div>
            {/* <div class="vLine"></div> */}
            <div className="service_one">
                <h4 className="yelp_title">Yelp Campaign</h4>
                <p className="campaign_text_right">
                    We understand the impact of strategic online presence in shaping a brand's success. We help businesses harness the power of platforms like Yelp, Facebook, and more to connect with their audience, build trust, and drive growth.
                </p>
                <p className="campaign_text_right">
                    We believe in the importance of optimizing promotional channels to enhance customer engagement and amplify your brand’s message. From managing campaigns to fine-tuning your digital footprint, we're dedicated to elevating your visibility and unlocking new opportunities for your business.
                </p>
            </div>
        </div>
		<div className="business_coaching_container">
            {/* <div className="gapspace"></div> */}
            <div className="service_two">
                <h4 className="coaching_title">Business Coaching</h4>
                <p className="campaign_text_left">
                    We believe in the transformative power of personalized business coaching to unlock the true potential of every client. Our approach is rooted in understanding your unique goals and aligning our strategies to serve your best interests.
                </p>
                <p className="campaign_text_left">
                    With a focus on empowering growth, we offer tailored coaching that equips you with the tools, insights, and guidance needed to navigate challenges, seize opportunities, and drive lasting success. 
                </p>
            </div>
            {/* <div class="vLine"></div> */}
            <div className="business_service_img">
                <p><img src={s1} alt=""/></p>             
            </div>
            
        </div>
		<div className="optimization_container">
            <div className="optimization_img">
                <p><img src={s1} alt=""/></p>             
            </div>
            {/* <div class="vLine"></div> */}
            <div className="service_three">
                <h4 className="optimization_title">Communication Optimization</h4>
                <p className="campaign_text_right">
                    We believe that effective communication is the foundation of business success. By streamlining the essential context, we help ensure that clients have the clarity and insight they need to make informed decisions, foster meaningful connections, and drive growth.
                </p>
                <p className="campaign_text_right">
                    Our focus is on optimizing communication strategies, empowering businesses to not only maintain but thrive in their competitive landscapes. With the right tools and guidance, we enable you to deliver your message with impact and confidence, unlocking new possibilities for sustainable growth.
                </p>
            </div>
        </div>
		</>
	);
};

export default AboutUs;
