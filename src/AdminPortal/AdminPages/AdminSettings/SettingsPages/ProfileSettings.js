import React, { useState } from 'react';
import '../SettingsPagesCSS/ProfileSettings.css';
import placeholder from "../../../AdminAssets/profileplaceholder.png";

const ProfileSettings = () => {
  // State Variables for the information
  const [firstName, setFirstName] = useState('John');
  const [lastName, setLastName] = useState('Doe');
  const [email, setEmail] = useState('johndoe@example.com');
  const [company, setCompany] = useState('Tech Corp');
  const [bio, setBio] = useState('Software Engineer at Tech Corp');

  // Save button handler
  const handleProfileChanges = () => {
    console.log('Profile updated:', { firstName, lastName, email, company, bio});
  };

  return (
    <div className="ProfileSettings">
      <div className="profile-container">
        <h1>User Profile Settings</h1>
        <div className="profile-main">

          {/* Profile Picture Selection */}
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

          {/* Profile Information Section*/}
          <div className="profile-info">
            <label>
              First Name:
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </label>
            <label>
              Last Name:
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </label>
            <label>
              Email:
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            <label>
              Company:
              <input
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
              />
            </label>
            <label>
              User Bio:
              <input
                type="text"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows="4"
              />
            </label>

            {/* Save Changes */}
            <button onCick={handleProfileChanges}>
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  )
};

export default ProfileSettings;