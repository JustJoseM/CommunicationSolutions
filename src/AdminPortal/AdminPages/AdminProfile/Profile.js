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

    const [isEditable, setIsEditable] = useState(false);

    //Saved State
    const [savedProfile, setProfile] = useState({
        firstName: 'John',
        lastName: 'Doe',
        email: 'johndoe@example.com',
        company: 'Tech Corp',
        bio: 'Software Engineer at Tech Corp',
    });

    //Event handlers for editing the profile
    const handleFirstNameChange = (e) => setFirstName(e.target.value);

    const handleLastNameChange = (e) =>  setLastName(e.target.value);

    const handleEmailChange = (e) =>  setEmail(e.target.value);

    const handleCompanyChange = (e) => setCompany(e.target.value);

    const handleBioChange = (e) => setBio(e.target.value);
    

    //Save button 
    const handleProfileChanges = () => {
        if (isEditable) {   
            setProfile({
                firstName,
                lastName,
                email,
                company,
                bio,
            });
        }
        //Toggle
        setIsEditable(!isEditable);
    };

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
                            <p><strong>First Name:</strong> {savedProfile.firstName}</p>
                            <p><strong>Last Name:</strong> {savedProfile.lastName}</p>
                            <p><strong>Email:</strong> {savedProfile.email}</p>
                            <p><strong>Company:</strong> {savedProfile.company}</p>
                            <p><strong>Bio:</strong> {savedProfile.bio}</p>
                        </div>
                    </div>
                    
                    {/*Profile Information Section */}
                    <div className="profile-info">
                        <label>
                            First Name:
                            <input
                                type="text"
                                value={firstName}
                                onChange={handleFirstNameChange}
                                readOnly={!isEditable}
                            />
                        </label>
                        <label>
                            Last Name:
                            <input
                                type="text"
                                value={lastName}
                                onChange={handleLastNameChange}
                                readOnly={!isEditable}
                            />
                        </label>
                        <label>
                            Current Email:
                            <input
                                type="text"
                                value={email}
                                onChange={handleEmailChange}
                                readOnly={!isEditable}
                            />
                        </label>
                        <label>
                            Company:
                            <input
                                type="text"
                                value={company}
                                onChange={handleCompanyChange}
                                readOnly={!isEditable}
                            />
                        </label>
                        <label>
                            User Bio:
                            <textarea
                                value={bio}
                                onChange={handleBioChange}
                                readOnly={!isEditable}
                                rows="4"
                            />
                        </label>
                        {/*Save Button Section */}
                        <button onClick={isEditable ? handleProfileChanges : handleEditProfile}>
                            {isEditable ? 'Save Changes' : 'Edit Profile'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile;