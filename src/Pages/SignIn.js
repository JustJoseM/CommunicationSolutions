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