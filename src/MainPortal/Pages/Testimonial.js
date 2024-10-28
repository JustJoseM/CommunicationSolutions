import React, { useEffect, useState } from "react";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../PagesCSS/Testimonial.css';

import { db } from '../../firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';


const Testimonial = () => {
    const [clients, setClients] = useState([]);

    useEffect(() => {
        const fetchClients = async () => {
            try {
                const clientCollection = collection(db, 'Clients');
                const clientSnapshot = await getDocs(clientCollection);
                const clientData = clientSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data()}));
                setClients(clientData);
            } catch(error) {
                console.error('Error fetcgubg clients:', error);
            }
        };
        
        fetchClients();
    }, []);

    const settings = {
        accessibility: true,
        arrows: true,
        centerMode: true,
        centerPadding: "40px",
        dots: true,
        infinite: true,
        lazyLoad: "ondemand",
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    centerMode: false
                }
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 1
                }
            }
        ]
    };

    return (
        <div className="testimonial-section">
            <div className="testimonial-container">
                <h1 className="testimonial-header">Our clients</h1>
                <div className="header-divider"></div>

                {/* Slider component */}
                <Slider {...settings}>
                    {clients.map(client => (
                        <div className="testimonial-slide" key={client.id}>
                            <div className="testimonial-card">
                                <img src={client.Photo} alt={client.name} className="company-logo"/>
                                <div className="company-name">
                                    <strong>{client.CompanyName}</strong>
                                </div>
                                <p className="testimonial-description">
                                    {client.Review}
                                </p>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
}

export default Testimonial;