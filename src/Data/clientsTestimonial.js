import USAPRO_logo from '../assets/USAPRO.jpg';
import ClearPRO_logo from '../assets/ClearPRO.png';
import APEX_logo from '../assets/APEX.jpg';
import Random_logo from '../assets/random_logo.jpg';
import { Helmet } from 'react-helmet';
<Helmet>
<title>Client Testimonal - Communication Solutions</title>
<meta
    name="description"
    content="See how our clients have benefited from our tailored business solutions. Read testimonials from trusted partners and businesses we've helped grow."
/>
</Helmet>
export const clientTestimonials = [
    
    {
        id: 1,
        img: USAPRO_logo,
        name: "USA PRO",
        review: "Review goes here",
    },
    {
        id: 2,
        img: ClearPRO_logo,
        name: "Clear PRO",
        review: "Review goes here",
    },
    {
        id: 3,
        img: APEX_logo,
        name: "Apex Window Cleaning",
        review: "Review goes here",
    },
    {
        id: 4,
        img: Random_logo,
        name: "Random Company",
        review: "Review goes here",
    }
];