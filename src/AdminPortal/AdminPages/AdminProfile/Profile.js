import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import './Profile.css';

const ProfileTest = () => {
    const navigate = useNavigate();

    // const state variables for the information
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [company, setCompany] = useState('');
    const [bio, setBio] = useState('');
    const [icon, setIcon] = useState('');

    // Fetch user data from Firestore
    useEffect(() => {
        const fetchUserData = async () => {
            const adminID = "admin2";
            const docRef = doc(db, "Admins", adminID);
            const docSnap = await getDoc(docRef);

            if(docSnap.exists()) {
                const data = docSnap.data();
                setFirstName(data.FirstName);
                setLastName(data.LastName);
                setEmail(data.Email);
                setCompany(data.Company);
                setBio(data.UserBio);
                setIcon(data.Icon);
            }
            else {
                console.log("No such document");
            }
        };

        fetchUserData();
    }, []);

    const handleEditProfile = () => {
        navigate('/admin/settings/profile');
    };

    return (
        <div className="ProfilePage">
            <div className="profile-container">
                <h1>User Profile</h1>
                <div className="profile-main">

                {/* Profile Card Section */}
                <div className="profile-picture">
                    <img src={icon} alt="Profile"/>
                    <div className="display-info">
                        <h2>Display Information</h2>
                        <p><strong>First Name:</strong> {firstName}</p>
                        <p><strong>Last Name:</strong> {lastName}</p>
                        <p><strong>Email:</strong> {email}</p>
                        <p><strong>Company:</strong> {company}</p>
                        <p><strong>Bio:</strong> {bio}</p>
                    </div>
                </div>

                {/* Profile Information Section - Read Only */}
                <div className="profile-info">
                    <label>
                        First Name:
                        <input
                            type="text"
                            value={firstName}
                            readOnly
                        />
                    </label>
                    <label>
                        Last Name:
                        <input
                            type="text"
                            value={lastName}
                            readOnly
                        />
                    </label>
                    <label>
                        Current Email:
                        <input
                            type="text"
                            value={email}
                            readOnly
                        />
                    </label>
                    <label>
                        Company:
                        <input
                            type="text"
                            value={company}
                            readOnly
                        />
                    </label>
                    <label>
                        User Bio:
                        <textarea
                            value={bio}
                            readOnly
                            rows="4"
                        />
                    </label>
                    {/* Edit Profile button */}
                    <button onClick={handleEditProfile}>
                        Edit Profile
                    </button>
                    </div>
                </div>    
            </div>
        </div>
    );
}

export default ProfileTest;