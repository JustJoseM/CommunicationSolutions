import React from 'react';
import { Link } from 'react-router-dom'; // Import Link component

function ForgotPassword() {
    return (
        <div>
            <div className="login__container">
                <form className="form" id="forgotPassword">
                    <h1 className="header">Forgot Password?</h1>
                    {/* Create email column */}
                    <div className="form__input-group"> {/* corrected class Name to className */}
                        <input type="text" className="form__input" autoFocus placeholder="Type your email" /> {/* added missing double quote for autoFocus */}
                        <div className="form__input-error-message"></div> {/* corrected class name from form__input-error-message to form__input-error-message */}                   
                        <button className="form__button" type="submit">Continue</button> 
                        <button className="resend_the_code" type="submit">Resend the code</button>
                       
                    </div>
                </form>
            </div>
            <div className="login__container">
                <form className="form" id="f"/>
            </div>
        </div>
    );
}
export default ForgotPassword;


