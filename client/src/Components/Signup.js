import React from 'react';
import "../Styles/Signup.css" // Make sure to create a CSS file for styling

const Signup = () => {
    return (
        <div class="signup-container">
            <form class="signup-form">
                <h1>Create Your Account</h1>

                <div class="form-group">
                    <label for="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        placeholder="Enter your username"
                        required
                    />
                </div>

                <div class="form-group">
                    <label for="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Enter your email"
                        required
                    />
                </div>

                <div class="form-group">
                    <label for="phoneno">Phone Number</label>
                    <input
                        type="tel"
                        id="phoneno"
                        name="phoneno"
                        placeholder="Enter your phone number"
                        required
                    />
                </div>

                <div class="form-group">
                    <label for="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Enter your password"
                        required
                    />
                </div>

                <div class="form-group">
                    <label for="role">Role</label>
                    <select id="role" name="role" required>
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>

                <button type="submit" class="signup-btn">
                    Sign Up
                </button>
            </form>
        </div>
    );
};

export default Signup;