import React from 'react'
import EmailIcon from '@mui/icons-material/Email';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';

export const BottomNavData = [
    {
        title: "Email",
        icon: <EmailIcon />,
        link: "javascript:void(0)" // later can use: link: "mailto:contact@example.com"
    },
    {
        title: "Phone Number",
        icon: <PhoneIphoneIcon />,
        link: "javascript:void(0)" // later can use: link: "tel:+[number]"
    },

]