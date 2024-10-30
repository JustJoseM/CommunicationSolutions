import React, { useState } from 'react';
import { auth } from '../firebaseConfig';  // Adjust the import path as needed
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
<<<<<<< Updated upstream:src/Pages/SignIn.js
import '../PagesCSS/SignupLogin.css'; // Ensure the path is correct
=======
import { collection, addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import '../PagesCSS/SignupLogin.css';
import bcrypt from 'bcryptjs';
>>>>>>> Stashed changes:src/MainPortal/Pages/SignIn.js

function SignIn() {
    const [showLoginForm, setShowLoginForm] = useState(true);
    const [showForgotPasswordForm, setShowForgotPasswordForm] = useState(false);  // Separate state for forgot password
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleSignUp = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setErrorMessage('Passwords do not match');
            return;
        }
        try {
            const hashedPassword = bcrypt.hashSync(password, 10);

            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
<<<<<<< Updated upstream:src/Pages/SignIn.js
=======

            // Save user data to Firestore
            await addDoc(collection(db, "users"), {
                uid: userCredential.user.uid,
                email: email,
                password: hashedPassword  // For real-world applications, never store plain passwords. Use Firebase Authentication instead.
            });

>>>>>>> Stashed changes:src/MainPortal/Pages/SignIn.js
            setSuccessMessage('Sign-up successful! You can now log in.');
            setErrorMessage('');
            setShowLoginForm(true); // Switch back to login form after successful sign-up
        } catch (error) {
            setErrorMessage(`Error signing up: ${error.message}`);
            setSuccessMessage('');
        }
    };

    const handleSignIn = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            setSuccessMessage('Sign-in successful! Welcome back.');
            setErrorMessage('');
            // Optionally redirect to another page
        } catch (error) {
            setErrorMessage(`Error signing in: ${error.message}`);
            setSuccessMessage('');
        }
    };

    const handleForgotPassword = async (e) => {
        e.preventDefault();
        try {
            // Attempt to send password reset email
            await sendPasswordResetEmail(auth, email);
            setSuccessMessage('If you are registered user, password reset email will be sent soon.');
            setErrorMessage('');
            setShowForgotPasswordForm(false); // Hide the form after request
            setShowLoginForm(true); // Switch back to login form after sending reset email
        } catch (error) {
            // Check for specific error codes
            if (error.code === 'auth/user-not-found') {
                setErrorMessage("User doesn't exist.");
            } else {
                setErrorMessage(`Error resetting password: ${error.message}`);
            }
            setSuccessMessage('');
        }
    };
    

    return (
        <div className='background'>
            <div className="login__container">
                {showForgotPasswordForm ? (
                    <form className="form" id="forgotPassword" onSubmit={handleForgotPassword}>
                        <h1 className="header">Reset Password</h1>
                        <div className="form__input-group">
                            <input
                                type="email"
                                className="form__input"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                required
                            />
                        </div>
                        <button className="form__button" type="submit">Send Request Email</button>
                        <p className="form__text__login">
                            <button
                                type="button"
                                className="form__link"
                                onClick={() => {
                                    setShowForgotPasswordForm(false);
                                    setShowLoginForm(true);
                                }}
                            >
                                Back to login
                            </button>
                        </p>
                        {successMessage && <div className="form__message form__message-success">{successMessage}</div>}
                        {errorMessage && <div className="form__message form__message-error">{errorMessage}</div>}
                    </form>
                ) : showLoginForm ? (
                    <form className="form" id="login" onSubmit={handleSignIn}>
                        <h1 className="header">Sign in</h1>
                        <div className="form__input-group">
                            <input
                                type="email"
                                className="form__input"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                required
                            />
                        </div>
                        <div className="form__input-group">
                            <input
                                type="password"
                                className="form__input"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password"
                                required
                            />
                        </div>
                        <button className="form__button" type="submit">Continue</button>
                        <p className="form__text__forgot">
                            <button
                                type="button"
                                className="form__link"
                                onClick={() => {
                                    setShowForgotPasswordForm(true);
                                    setShowLoginForm(false);
                                }}
                            >
                                Forgot password?
                            </button>
                        </p>
                        <p className="form__text__createAcc">
                            <button
                                type="button"
                                className="form__link"
                                onClick={() => setShowLoginForm(false)}
                            >
                                Create account
                            </button>
                        </p>
                        {successMessage && <div className="form__message form__message-success">{successMessage}</div>}
                        {errorMessage && <div className="form__message form__message-error">{errorMessage}</div>}
                    </form>
                ) : (
                    <form className="form" id="createAccount" onSubmit={handleSignUp}>
                        <h1 className="header">Create Account</h1>
                        <div className="form__input-group">
                            <input
                                type="email"
                                className="form__input"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email"
                                required
                            />
                        </div>
                        <div className="form__input-group">
                            <input
                                type="password"
                                className="form__input"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password"
                                required
                            />
                        </div>
                        <div className="form__input-group">
                            <input
                                type="password"
                                className="form__input"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="Confirm Password"
                                required
                            />
                        </div>
                        <button className="form__button" type="submit">Continue</button>
                        <p className="form__text__login">
                            Already have an account?
                            <button
                                type="button"
                                className="form__link"
                                onClick={() => setShowLoginForm(true)}
                            >
                                Log in
                            </button>
                        </p>
                        {successMessage && <div className="form__message form__message-success">{successMessage}</div>}
                        {errorMessage && <div className="form__message form__message-error">{errorMessage}</div>}
                    </form>
                )}
            </div>
        </div>
    );
}

export default SignIn;


