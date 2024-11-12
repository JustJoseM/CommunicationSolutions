import React, { useState, useEffect } from "react";
import { db } from "../../../../firebaseConfig";
import { getAuth } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import '../SettingsPagesCSS/ProfileSettings.css';

const ProfileSettings = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [company, setCompany] = useState('');
    const [bio, setBio] = useState('');
    const [icon, setIcon] = useState('');

    const auth = getAuth();
    const user = auth.currentUser;
    const adminId = user.uid;

    useEffect(() => {
        const fetchUserData = async () => {
          if (!adminId) return;
            const docRef = doc(db, "Admins", adminId);
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
    }, [adminId]);

    // Save button handler
    const handleProfileChanges = async () => {
        if (!adminId) return;
        const docRef = doc(db, "Admins", adminId);

        // Update with the new values
        await setDoc(docRef, {
            FirstName: firstName,
            LastName: lastName,
            Email: email,
            Company: company,
            UserBio: bio,
            Icon: icon
        }, {merge: true });
        
        console.log('Profile updated:', { firstName, lastName, email, company, bio});

        // Show Alert Message
        alert("Information changed successfully.");
    };

    return (
      <div className="ProfileSettings">
        <div className="profile-info-container">
          <h1>User Profile Settings</h1>
          <div className="profile-main">

            {/* Profile Picture Selection */}
            <div className="profile-picture">
              <img src={icon} alt="Profile" />
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
              <button onClick={handleProfileChanges}>
                Save Changes
              </button>
            </div>
          </div>
        </div>
    </div>
    );
};

export default ProfileSettings;