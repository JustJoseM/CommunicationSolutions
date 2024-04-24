import React, {useState} from 'react';
import '../PagesCSS/SignupLogin.css';

function SignupLogin() {
    // State to track which form to show, true for login and false for create account
    const [showLoginForm, setShowLoginForm] = useState(true);

    return (
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
    );
}

export default SignupLogin;