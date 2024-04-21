import React from "react";
import img from '../assets/meeting.jpg'

function Home() {
    return (
        <div className="min-h-[70vh] flex flex-col md:flex-row md:justify-between items-center md:mx-32 mx-5 mt-10">
            
            <div className="md:w-2/4 text-center">
            <h2 className= "text-5xl font-semibold leading-tight">
                What we can do for you?
            </h2>
            
               
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed dapibus, elit id ultrices porttitor, ligula lacus tempor nisi, eget finibus orci elit vel dolor.
                    </p>
                
           {/*} <div className="bodyImg-box">
                <img src="https://media.istockphoto.com/id/1409329028/vector/no-picture-available-placeholder-thumbnail-icon-illustration-design.jpg?s=612x612&w=0&k=20&c=_zOuJu755g2eEUioiOUdz_mHKJQJn-tDgIAhQzyeKUQ=" alt="Image " />
    </div> */}
            
    </div> 
    <div className="">
        <img src={img} alt="img" />
    </div>
     
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
            
            </div>
    );
}

export default Home;