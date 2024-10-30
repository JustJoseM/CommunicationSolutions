import React from "react";
import "../PagesCSS/AboutUs.css";
import s1 from '../assets/imgplaceholder.jpg';
import place from '../assets/placeholder.png';
import logo from "../assets/business_logo.png";
import { Helmet } from 'react-helmet';

const AboutUs = () => {
	return (
		<>
         <Helmet>
             <title>About Us - Communications Solution</title>
             
             <meta
                    name="description"
                    content="Empowering businesses with tailored coaching, online reputation management, and effective communication strategies to drive growth and enhance customer engagement across platforms like Yelp and Facebook."
                />
        </Helmet>
        
		<div className="company_container">
            <div className="title-text">
                <div className="company_logo">
                    <img src={logo} alt=""/>             
                </div>
                <h1 className="company_name">Communications Solution</h1>
            </div>
        </div>
        <div className="main_about">
            <div className="who_are_we_container">
                <h2 className="who_text">Who Are We?</h2>
            </div>
        </div>
		<div className="yelp_container">
            <div className="yelp_service_img">
                <img src={s1} alt=""/>             
            </div>
            {/* <div class="vLine"></div> */}
            <div className="service_one">
                <h3 className="yelp_title">Yelp Campaign</h3>
                <p className="campaign_text_right">
                    We understand the impact of strategic online presence in shaping a brand's success. We help businesses harness the power of platforms like Yelp, Facebook, and more to connect with their audience, build trust, and drive growth.
                </p>
                <p className="campaign_text_right">
                    Our Services include:
                    </p>
                    <ul className="campaing_text_right">
                        <li>Optimizing promotional channels to enhance engagement</li>
                        <li>Amplifying your brand’s message</li>
                        <li>Managing campaigns and refining your digital footprint</li>
                   {/* Original: We believe in the importance of optimizing promotional channels to enhance customer engagement and amplify your brand’s message. From managing campaigns to fine-tuning your digital footprint, we're dedicated to elevating your visibility and unlocking new opportunities for your business. */}
                </ul>
                <p className="campaign_text_right">
                    We're dedicated to elevating your visibility and unlocking new opportunities for your business.
                </p>
            </div>
        </div>

		<div className="business_coaching_container">
            {/* <div className="gapspace"></div> */}
            <div className="service_two">
                <h3 className="coaching_title">Business Coaching</h3>
                <p className="campaign_text_left">
                    We believe in the transformative power of personalized business coaching to unlock the true potential of every client. Our approach is rooted in understanding your unique goals and aligning our strategies to serve your best interests.
                </p>
                <p className="campaign_text_left">
                    Our business coaching includes:
                    {/*With a focus on empowering growth, we offer tailored coaching that equips you with the tools, insights, and guidance needed to navigate challenges, seize opportunities, and drive lasting success. */}
                </p>
                <ul className="campaign_text_left">
                    <li>Customized Strategies for business growth </li> 
                    <li>Guidance on navigating challenges and seizing opportunities</li>
                    <li>Tools and insights to drive lasting success</li>
                </ul>
               
            
            
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
                    {/* We believe that effective communication is the foundation of business success. By streamlining the essential context, we help ensure that clients have the clarity and insight they need to make informed decisions, foster meaningful connections, and drive growth. */}
                    Effective communication is the foundation of business success. We ensure clients have the clarity and insight they need to make informed decisions, foster connections, and drive growth.                
                </p>
                <p className="campaign_text_right">
                    {/* Our focus is on optimizing communication strategies, empowering businesses to not only maintain but thrive in their competitive landscapes. With the right tools and guidance, we enable you to deliver your message with impact and confidence, unlocking new possibilities for sustainable growth. */ }
                    Our communication optimzation focuses on:
                </p>
                <ul className="capaign_text_right">
                    <li>Streamlining communication strategies for maximum impact</li>
                    <li>Empowering Businesses to thrive in competitive landscalpes</li>
                    <li>Providing the tools to deliver messages with confidence and clarity</li>
                </ul>
                <p className="campaign_text_right">
                    With the right tools and guidance, we help unlock new possibilities for sustainable growth.
                </p>
            </div>
        </div>
		</>
	);
};

export default AboutUs;
