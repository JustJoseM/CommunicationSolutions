import React from 'react';
import { Link } from 'react-router-dom'; // Import Link component


function Verify() {
    return(
    <div>
        <div className="login__container">
            <form className="form" id="verify">
                <h1 className="header">Reset Password</h1>
                {/*Create Reset the password column*/}
                <div className="form__input-group">
                    <input type="text" className="form__input" autoFocus placeholder="New Password" />
                    <div ClassName="form__input-error-message"/>
                </div>
                
                    {/*Create Confirm the password column*/}
                <div className="form__input-group">
                    <input type="Text" className="form__input" autoFocus placeholder="Confirm Password" />
                    <div calssName="form__input-error-message"/>
                    <Link to="/signin"> <button className="form__button" type="submit">Continue to login page</button></Link>
                </div>
                
            </form>
        </div>
    </div>
    )
}
export default Verify;




