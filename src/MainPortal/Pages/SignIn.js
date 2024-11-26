import React, { useState, useEffect } from 'react';
import { auth, db } from '../../firebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { doc, getDoc, setDoc, updateDoc, runTransaction } from 'firebase/firestore';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import '../PagesCSS/SignupLogin.css';

const SignIn = () => {
    const [showLoginForm, setShowLoginForm] = useState(true);
    const [showForgotPasswordForm, setShowForgotPasswordForm] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [passwordFeedback, setPasswordFeedback] = useState([]);
    const [hasTyped, setHasTyped] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [userRole, setUserRole] = useState(localStorage.getItem('userRole'));
    const [loading, setLoading] = useState(false); // Add loading state

    const maxFailedAttempts = 3;
    const lockDuration = 0.01 * 60 * 1000; // 10 minutes in milliseconds
    const expirationPeriod = 90 * 24 * 60 * 60 * 1000; // 90 days in milliseconds
    const navigate = useNavigate();
    
    // Password Policy
    const passwordPolicy = {
        minlength: 8,
        hasUpperCase: /[A-Z]/,
        hasNumber: /\d/,
        hasSpecialChar: /[!@#$%^&*]/,
    };

    const validatePassword = (password) => {
        const feedback = [];
        if (password.length < passwordPolicy.minlength) feedback.push('Password must be at least 8 characters long.');
        if (!passwordPolicy.hasUpperCase.test(password)) feedback.push('Password must contain at least one uppercase letter.');
        if (!passwordPolicy.hasNumber.test(password)) feedback.push('Password must contain at least one number.');
        if (!passwordPolicy.hasSpecialChar.test(password)) feedback.push('Password must contain at least one special character (!, @, #, etc.).');
        return feedback;
    };

    const togglePasswordVisibility = () => setShowPassword((prevState) => !prevState);

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        if (!hasTyped) setHasTyped(true);
    };

    // useEffect hook to handle real-time password validation and feedback
    useEffect(() => {
        if (hasTyped) {
            setPasswordFeedback(validatePassword(password));
        }
    }, [password, hasTyped]);

    const isPasswordExpired = (passwordLastSet) => {
        const lastSet = passwordLastSet.toMillis ? passwordLastSet.toMillis() : new Date(passwordLastSet).getTime();
        return Date.now() - lastSet > expirationPeriod;
    };

    const handleSignUp = async (e) => {
        e.preventDefault();
        const feedback = validatePassword(password);
        if (feedback.length > 0) {
            setPasswordFeedback(feedback);
            return;
        } else if (password !== confirmPassword) {
            setErrorMessage('Passwords do not match');
            return;
        }
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const userRef = doc(db, 'users', userCredential.user.uid);
            await setDoc(userRef, {
                email,
                passwordLastSet: new Date(),
                lockedUntil: null,
                failedAttempts: 0,
                Role: "user"
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
        setLoading(true);
    
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const userRef = doc(db, 'users', userCredential.user.uid);
            const userDoc = await getDoc(userRef);
            if (!userDoc.exists()) {
                setErrorMessage('No user data found in Firestore.');
                return;
            }

            const userData = userDoc.data();
            const role = userData.Role;

            localStorage.setItem('userRole', role);
            setUserRole(role);

            if (userData.lockedUntil && userData.lockedUntil.toMillis() > Date.now()) {
                setErrorMessage('Account is temporarily locked. Please try again later.');
                return;
            }

            if (userData.passwordLastSet && isPasswordExpired(userData.passwordLastSet)) {
                setErrorMessage('Your password has expired. Please reset your password.');
                await sendPasswordResetEmail(auth, email);
                setSuccessMessage('Password reset email sent. Please check your inbox.');
                return;
            }

            await updateDoc(userRef, { passwordLastSet: new Date(), failedAttempts: 0 });
            setSuccessMessage('Sign-in successful! Welcome back.');
            setErrorMessage('');

            if (role === 'user') {
                navigate('/home');
                window.location.reload();
            } else {
                navigate('/admin');
            }
        } catch (error) {
            const customErrorMessage = mapFirebaseError(error);
            setErrorMessage(customErrorMessage);
            setSuccessMessage('');
        } finally {
            setLoading(false);
        }
    };

    const handleForgotPassword = async (e) => {
        e.preventDefault();
        if (!email) {
            setErrorMessage('Please enter a valid email.');
            return;
        }
        
        try {
            setLoading(true);
            await sendPasswordResetEmail(auth, email);
            setSuccessMessage('Password reset email sent if the account exists.');
            setErrorMessage('');
            setLoading(false);
        } catch (error) {
            setErrorMessage(`Error resetting password: ${error.message}`);
            setLoading(false);
        }
    };

    //Operation to be implemented once signout feature is available
    const handleSignOut = () => {
        localStorage.removeItem('userRole');
        setUserRole(null);
    };

    const mapFirebaseError = (error) => {
        switch (error.code) {
            case 'auth/user-not-found':
                return 'No account found with this email. Please sign up.';
            case 'auth/wrong-password':
                return 'Incorrect password. Please try again.';
            case 'auth/too-many-requests':
                return 'Too many failed attempts. Please try again later or reset your password.';
            default:
                return `Error signing in: ${error.message}`;
        }
    };

    return (
        <>
            <Helmet>
                <title>Sign In - Communications Solution</title>
                <meta name="description" content="Sign in to your Communication Solutions account to access personalized business coaching and support." />
            </Helmet>
            <div className='background'>
                <div className="login__container">
                    {showForgotPasswordForm ? (
                        <form className="form" id="forgotPassword" onSubmit={handleForgotPassword}>
                            <h1 className="header">Reset Password</h1>
                            <input
                                type="email"
                                className="form__input"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                required
                            />
                            <button className="form__button" type="submit" disabled={loading}>
                                {loading ? 'Sending Request...' : 'Send Request Email'}
                            </button>
                            <p className="form__text__login">
                                <button type="button" className="form__link" onClick={() => { setShowForgotPasswordForm(false); setShowLoginForm(true); }}>
                                    Back to login
                                </button>
                            </p>
                            {successMessage && <div className="form__message form__message-success" aria-live="polite">{successMessage}</div>}
                            {errorMessage && <div className="form__message form__message-error" aria-live="assertive">{errorMessage}</div>}
                        </form>
                    ) : showLoginForm ? (
                        <form className="form" id="login" onSubmit={handleSignIn}>
                            <h1 className="header">Sign in</h1>
                            <input
                                type="email"
                                className="form__input"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                required
                            />
                            <input
                                type="password"
                                className="form__input"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password"
                                required
                            />
                            <button className="form__button" type="submit" disabled={loading}>
                                {loading ? 'Signing in...' : 'Continue'}
                            </button>
                            <p className="form__text__forgot">
                                <button type="button" className="form__link" onClick={() => { setShowForgotPasswordForm(true); setShowLoginForm(false); }}>
                                    Forgot password?
                                </button>
                            </p>
                            <p className="form__text__createAcc">
                                <button type="button" className="form__link" onClick={() => setShowLoginForm(false)}>Create account</button>
                            </p>
                            {successMessage && <div className="form__message form__message-success" aria-live="polite">{successMessage}</div>}
                            {errorMessage && <div className="form__message form__message-error" aria-live="assertive">{errorMessage}</div>}
                        </form>
                    ) : (
                        <form className="form" id="createAccount" onSubmit={handleSignUp}>
                            <h1 className="header">Create Account</h1>
                            <input
                                type="email"
                                className="form__input"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email"
                                required
                            />
                            <div className="password-container">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    className="form__input"
                                    value={password}
                                    onChange={handlePasswordChange}
                                    placeholder="Password"
                                    required
                                />
                                <button
                                    type="button"
                                    className="toggle-password-visibility"
                                    onClick={togglePasswordVisibility}>
                                    {showPassword ? "Hide" : "Show"}
                                </button>
                            </div>
                            {passwordFeedback.length > 0 && hasTyped && (
                                <div className="form__feedback" aria-live="polite">
                                    {passwordFeedback.map((msg, index) => (
                                        <div key={index} className="feedback__message error">{msg}</div>
                                    ))}
                                </div>
                            )}
                            <input
                                type="password"
                                className="form__input"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="Confirm Password"
                                required
                            />
                            <button className="form__button" type="submit">
                                Continue
                            </button>
                            <p className="form__text__login">
                                Already have an account?
                                <button type="button" className="form__link" onClick={() => setShowLoginForm(true)}>Log in</button>
                            </p>
                            {successMessage && <div className="form__message form__message-success" aria-live="polite">{successMessage}</div>}
                            {errorMessage && <div className="form__message form__message-error" aria-live="assertive">{errorMessage}</div>}
                        </form>
                    )}
                </div>
            </div>
        </>
    );
};

export default SignIn;
