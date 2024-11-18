import React from 'react'

import "../Styles/Login.css"
const Login = () => {
  return (
    <div>
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
                    <label htmlFor="phone">Phone No</label>
                    <input type="tel" id="phone" name="phone" required />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" required />
                </div>

                <div className="form-group">
                    <label htmlFor="role">Role</label>
                    <select id="role" name="role" required>
                        <option value="admin">Admin</option>
                        <option value="user">User </option>
                    </select>
                </div>

                <button type="submit">Sign Up</button>
            </form>
        </div>



    </div>
  )
}

export default Login
