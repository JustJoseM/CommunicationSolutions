import React, { useState } from 'react';
import { auth } from '../../firebaseConfig';
import { db } from "../../firebaseConfig";  // Make sure Firestore is initialized in firebaseConfig
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import '../PagesCSS/SignupLogin.css';
import bcrypt from 'bcryptjs';

function SignIn() {
    const [showLoginForm, setShowLoginForm] = useState(true);
    const [showForgotPasswordForm, setShowForgotPasswordForm] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    //Paswword Policy and password visability 
    const [passwordFeedback, setPasswordFeedback] = useState([]);
    const [hasTyped, setHasTyped] = useState(false);
    const [showPassword, setShowPassword] =  useState(false);
    
    const navigate = useNavigate();

        //Password Policy
        const passwordPolicy = {
            minlength: 8, 
            hasUpperCase: /[A-Z]/,
            hasNumber: /\d/,
            hasSpecialChar: /[!@#$%^&*]/,
        }
        
        //Validating password 
        const validatePassword = (password) => {
            //To provide real time feedback
            const feedback = []
            if (password.length < passwordPolicy.minlength) {
                feedback.push('Password must be at least 8 characters long.')
            }
            if (!passwordPolicy.hasUpperCase.test(password)) {
                feedback.push("Password must contain at least one uppercase letter.");
            }
            if (!passwordPolicy.hasNumber.test(password)) {
                feedback.push("Password must contain at least one number.");
            }
            if (!passwordPolicy.hasSpecialChar.test(password)) {
                feedback.push("Password must contain at least one special character (!, @, #, etc.).");
            }
            return feedback;
        };
    
        //Real-time validation 
        const handlePasswordFeedback = (e) => {
            //placeholder
            const newPassword = e.target.value;
            setPassword(newPassword);
            setPasswordFeedback(validatePassword(newPassword));
            if (!hasTyped) setHasTyped(true);
        };
    
        //To toggle view Password
        const togglePasswordVisibility = () => {
            setShowPassword((prevState) => !prevState);
        };

    const handleSignUp = async (e) => {
        e.preventDefault();
        //feedback 
        const feedback = validatePassword(password);
        if (feedback.length > 0) {
            setPasswordFeedback(feedback);
            return;
        } else if (password !== confirmPassword) {
            setErrorMessage('Passwords do not match');
            return;
        }
        try {
            const hashedPassword = bcrypt.hashSync(password, 10);

            const userCredential = await createUserWithEmailAndPassword(auth, email, password);

            // Save user data to Firestore
            await addDoc(collection(db, "users"), {
                uid: userCredential.user.uid,
                email: email,
                password: password  // For real-world applications, never store plain passwords. Use Firebase Authentication instead.
            });

            setSuccessMessage('Sign-up successful! You can now log in.');
            setErrorMessage('');
            setPasswordFeedback([]);
            setShowLoginForm(true);
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
            navigate('/admin');
        } catch (error) {
            setErrorMessage(`Error signing in: ${error.message}`);
            setSuccessMessage('');
        }

        issign = true;
    };

    const handleForgotPassword = async (e) => {
        e.preventDefault();
        try {
            await sendPasswordResetEmail(auth, email);
            setSuccessMessage('If you are a registered user, a password reset email will be sent soon.');
            setErrorMessage('');
            setShowForgotPasswordForm(false);
            setShowLoginForm(true);
        } catch (error) {
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
                            <div className="password-container">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    className="form__input password-input"
                                    placeholder="Password"
                                    onChange={handlePasswordFeedback}
                                    required
                                />
                                <button
                                    type="button"
                                    className="toggle-password-visibility"
                                    onClick={togglePasswordVisibility}
                                >
                                    {showPassword ? "Hide" : "Show"}
                                </button>
                            </div>
                        </div>
                        {/* Feedback in Real time  */}
                        <div className="form__feedback">
                            {passwordFeedback.length > 0 ? (
                                passwordFeedback.map((msg, index) => (
                                    <div key={index} className="feedback__message error">{msg}</div>
                                ))
                            ) : (
                                hasTyped && <div className="feedback__message success">Password meets all requirements</div> // Only show if hasTyped is true
                            )}
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
