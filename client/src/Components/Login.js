import React from 'react'

import "../Styles/Login.css"

const Login = () => {
    return (
        <div class="login-page">
    <div class="form-container">
      <h1>Login</h1>
      <form action="#" method="POST">
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" id="email" name="email" placeholder="Enter your email" required/>
        </div>

        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" id="password" name="password" placeholder="Enter your password" required/>
        </div>

        <button type="submit" class="login-btn">Login</button>

        <p class="signup-link">
          Don't have an account? <a href="signup.html">Sign Up</a>
        </p>
      </form>
    </div>
  </div>
    );
};

export default Login;
