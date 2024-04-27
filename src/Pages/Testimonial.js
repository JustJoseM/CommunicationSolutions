import React from "react";
import '../PagesCSS/Testimonial.css';
import USAPRO_logo from '../assets/USAPRO.jpg';
import ClearPRO_logo from '../assets/ClearPRO.png';
import APEX_logo from '../assets/APEX.jpg';

function Testimonial() {
    return (
        <div className="Testimonials">
            <div className="inner">
                <h1 className="header">Who We've Worked With</h1>
                <div className="border"></div>
                <div className="row">
                    <div className="col">
                        <div className="Testimonial">
                            <img src={USAPRO_logo} alt=""/>
                            <div className="USAPRO">
                                <strong>USA PRO</strong>
                            </div>
                            <p className="Description">
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                            </p>
                        </div>
                        
                    </div>
                    <div className="col">
                        <div className="Testimonial">
                            <img src={ClearPRO_logo} alt=""/>
                            <div className="ClearPRO">
                                <strong>ClearPro</strong>
                            </div>
                            <p className="Description">
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                            </p>
                        </div>
                        <div className="col">
                        <div className="Testimonial">
                            <img src={APEX_logo} alt=""/>
                            <div className="APEX">
                                <strong>Apex Window Cleaning</strong>
                            </div>
                            <p className="Description">
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                            </p>
                        </div>
                        
                    </div>
                    
                    </div>
                </div>
            </div>
        </div>



        // <div className="Testimonials">
        //     <h1 className="header">Testimonials</h1>
        //     <h2>
        //         Our Partners
        //     </h2>
        //     <div className="content">
        //         <div className ="bodyText-box">
        //             <p>
        //                 We've worked with:
        //             </p>
        //         </div>
        //         <div className="partners-box">
        //             <img src="https://media.istockphoto.com/id/1409329028/vector/no-picture-available-placeholder-thumbnail-icon-illustration-design.jpg?s=612x612&w=0&k=20&c=_zOuJu755g2eEUioiOUdz_mHKJQJn-tDgIAhQzyeKUQ=" alt="Image " />
        //     </div>
        //     </div>
        // </div>
    );
}
{
    /*
    <div className="ourClients-box">
    <div className="USAPRO">
        <img src="https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=328,h=328,fit=crop/mnl6gXx7LOIeM2Ez/logofb1-4-23-dWxwZR2MPWCM912k.png" alt="USAPRO-img" />
        <p>About our client</p>
    </div>=

    <div className="APEX">
        <img src="https://images.squarespace-cdn.com/content/v1/65049c784142c2027e5e5763/9282f19e-30f2-47b3-8ac1-7ea0fba0ae63/PNG-1-02.jpg" alt="APEX-img" />
        <p>About our client</p>
    </div>

    <div className="ClearPROs">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGeS4JtstFp5xQSrAcTccLLsTBwAc26hquN7jTVKaf&s" alt="ClearPROs-img" />
        <p>About our client</p>
    </div>
    </div>
    */
}

export default Testimonial;