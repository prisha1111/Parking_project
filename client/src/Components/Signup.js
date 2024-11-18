import React from 'react';
import "../Styles/Signup.css" // Make sure to create a CSS file for styling

const Signup = () => {
    return (
        <div className="signup-wrapper">
            <h2>Create an Account</h2>
            <form className="signup-form">
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" name="username" required />
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" required />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" required />
                </div>

                <div className="form-group">
                    <label htmlFor="confirm-password">Confirm Password</label>
                    <input type="password" id="confirm-password" name="confirm-password" required />
                </div>

                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
};

export default Signup;