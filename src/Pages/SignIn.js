import React, { useState } from 'react';
import { auth, db } from '../firebaseConfig';  // Adjust the import path as needed
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import '../PagesCSS/SignupLogin.css'; // Ensure the path is correct
import { Helmet } from 'react-helmet';
import { doc, getDoc, setDoc, updateDoc} from 'firebase/firestore';

function SignIn() {
    const [showLoginForm, setShowLoginForm] = useState(true);
    const [showForgotPasswordForm, setShowForgotPasswordForm] = useState(false);  // Separate state for forgot password
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const maxFailedAttempts = 3;  // Define the maximum failed attempts
    const lockDuration = 1 * 60 * 1000; // 10 minutes in milliseconds
    const isPasswordExpired = (passwordLastSet) => { // Helper function to check if password has expired
    const expirationPeriod = 90 * 24 * 60 * 60 * 1000; // 90 days in milliseconds
            return Date.now() - passwordLastSet.toMillis() > expirationPeriod;
        };

    const handleSignUp = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setErrorMessage('Passwords do not match');
            return;
        }
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const userRef = doc(db, 'users', userCredential.user.uid);

            // Set passwordLastSet and initialize lockedUntil and failedAttempts
            await setDoc(userRef, {
                email: email,
                passwordLastSet: new Date(), // Set passwordLastSet to now
                lockedUntil: null,           // Initially unlocked
                failedAttempts: 0            // Initial failed attempts
            });

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
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            const userRef = doc(db, 'users', user.uid);
            const userDoc = await getDoc(userRef);

            if (userDoc.exists()) {
                const userData = userDoc.data();

                // Check if account is locked
                if (userData.lockedUntil && userData.lockedUntil.toMillis() > Date.now()) {
                    setErrorMessage('Account is temporarily locked. Please try again later.');
                    return;
                }

                // Check if password is expired
                if (userData.passwordLastSet && isPasswordExpired(userData.passwordLastSet)) {
                    setErrorMessage('Your password has expired. Please reset your password.');
                    await sendPasswordResetEmail(auth, email);
                    setSuccessMessage('Password reset email sent. Please check your inbox.');
                    return; // Stop the function to prevent signing in
                }

                // Update `passwordLastSet` to current time on successful login
                await updateDoc(userRef, {
                    passwordLastSet: new Date(),
                    failedAttempts: 0
                });
            

                // Reset failed attempts on successful login
                await updateDoc(userRef, {
                    failedAttempts: 0
                });

                setSuccessMessage('Sign-in successful! Welcome back.');
                setErrorMessage('');
            } else {
                setErrorMessage('No user data found in Firestore.');
                return;
            }
        } catch (error) {
            // Handle failed login attempts
            const userRef = doc(db, 'users', auth.currentUser?.uid);
            const userDoc = await getDoc(userRef);

            if (userDoc.exists()) {
                const failedAttempts = userDoc.data().failedAttempts || 0;

                if (failedAttempts + 1 >= maxFailedAttempts) {
                    // Lock the account
                    const lockedUntil = new Date(Date.now() + lockDuration);
                    await updateDoc(userRef, {
                        lockedUntil: lockedUntil,
                        failedAttempts: 0 // Reset failed attempts after lockout
                    });
                    setErrorMessage('Too many failed attempts. Account locked for 10 minutes.');
                } else {
                    // Increment failed attempts
                    await updateDoc(userRef, {
                        failedAttempts: failedAttempts + 1
                    });
                    setErrorMessage(`Error signing in:  if you fail more than 3 attempts, account gets locked for 10 minutes.`);
                }
            } else {
                setErrorMessage('Error signing in: Account not found.');
            }
            setSuccessMessage('');
        }
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
            setErrorMessage(`Error resetting password: ${error.message}`);
            setSuccessMessage('');
        }
    };
    

    return (

    <>
        <Helmet>
        <title>Sign In - Communications Solution</title>
        
        <meta
               name="description"
               content="Sign in to your Communication Solutsions account to access personalized business coaching and support."
           />
   </Helmet>

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
        </>
    );
}

export default SignIn;




