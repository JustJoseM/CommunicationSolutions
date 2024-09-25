import React, { useState } from 'react';
import { auth } from '../firebaseConfig';  // Adjust the import path as needed
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, sendEmailVerification } from 'firebase/auth';
import '../PagesCSS/SignupLogin.css'; // Ensure the path is correct


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
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // send verification email
            await sendEmailVerification(user);
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

    // Function to handle forgot password
    const handleForgotPassword = async (e) => {
        e.preventDefault();
        try {
            await sendPasswordResetEmail(auth, email);
            setSuccessMessage('Password reset email sent. Please check your inbox.');
            setErrorMessage('');
            setShowForgotPasswordForm(false); // Hide the form after request
            setShowLoginForm(true); // Switch back to login form after sending reset email
        } catch (error) {
            setErrorMessage(`Error resetting password: ${error.message}`);
            setSuccessMessage('');
        }
    };

    return (
        <div className='background'>
        <div className="login__container">
            {showLoginForm ? (
                // Log in to existing account
                <form className="form" id="login">
                    <h1 className="header">Sign in</h1>
                    {/* Create sign in column */}
                    <div className="form__input-group">
                        <input type="text" className="form__input" autoFocus placeholder="Enter your email" />
                        <div className="form__input-error-message"></div>
                    </div>
                    {/* Create password column */}
                    <div className="form__input-group">
                        <input type="password" className="form__input" placeholder="Password"/>
                        <div className="form__input-error-message"></div>
                    </div>
                    <button className="form__button" type="submit">Continue</button>    
                    <p className="form__text__forgot">
                        <a href="#" className="forgot-password">Forgot password?</a>
                    </p>
                    <p className="form__text__createAcc">
                        <button 
                            type="button"
                            className="form__link" 
                            onClick={() => setShowLoginForm(false)} // Switch to create account form
                        >
                            Create account
                        </button>
                    </p>
                </form>
            ) : (
                // Create new account
                <form className="form" id="createAccount">
                    <h1 className="header">Create Account</h1>
                    {/* Create username column */}
                    <div className="form__input-group">
                        <input type="text" className="form__input" autoFocus placeholder="Username" />
                        <div className="form__input-error-message"></div>
                    </div>
                    {/* Create email column */}
                    <div className="form__input-group">
                        <input type="email" className="form__input" placeholder="Email" />
                        <div className="form__input-error-message"></div>
                    </div>
                    {/* Create password column */}
                    <div className="form__input-group">
                        <input type="password" className="form__input" placeholder="Password"/>
                        <div className="form__input-error-message"></div>
                    </div>
                    {/* Confirm password column */}
                    <div className="form__input-group">
                        <input type="password" className="form__input" placeholder="Confirm Password"/>
                        <div className="form__input-error-message"></div>
                    </div>
                    <button className="form__button" type="submit">Continue</button>    
                    <p className="form__text__login">Already have an account?
                        <button 
                            type="button"
                            className="form__link" 
                            onClick={() => setShowLoginForm(true)} // Switch to login form
                        >
                            Log in
                        </button>
                    </p>
                </form>
            )}
        </div>
        </div>
    );
}

export default SignupLogin;