import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import './Profile.css';
import placeholder from '../../AdminAssets/profileplaceholder.png'

const Profile = () => {
    const navigate = useNavigate();
    //const state variables for the information 
    const [firstName, setFirstName] = useState('John');
    const [lastName, setLastName] = useState('Doe');
    const [email, setEmail] = useState('johndoe@example.com');
    const [company, setCompany] = useState('Tech Corp');
    const [bio, setBio] = useState('Software Engineer at Tech Corp');

    // Redirect to ProfileSettings when 'Edit Profile' is clicked
    const handleEditProfile = () => {
        navigate('/admin/settings/profile')
    }

    return(
        <div className="ProfilePage">
            <div className="profile-container">
                <h1>User Profile</h1> 
                <div className="profile-main">
                    {/*Profile Picture Section */}
                    <div className="profile-picture">
                        <img src={placeholder} alt="Profile" />
                        <div className="display-info">
                            <h2>Display Information</h2>
                            <p><strong>First Name:</strong> {firstName}</p>
                            <p><strong>Last Name:</strong> {lastName}</p>
                            <p><strong>Email:</strong> {email}</p>
                            <p><strong>Company:</strong> {company}</p>
                            <p><strong>Bio:</strong> {bio}</p>
                        </div>
                    </div>
                    
                    {/*Profile Information Section - Read only*/}
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
                        {/*Save Button Section */}
                        {/* <button onClick={isEditable ? handleProfileChanges : handleEditProfile}>
                            {isEditable ? 'Save Changes' : 'Edit Profile'}
                        </button> */}
                        <button onClick={handleEditProfile}>
                            Edit Profile
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile;