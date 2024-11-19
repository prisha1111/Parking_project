import React, {useState} from 'react'
import axios from 'axios';
import "../Styles/Login.css"

const Login = () => {

    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials({ ...credentials, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/login', credentials);
            localStorage.setItem('token', response.data.token);
            alert('Login successful');
        } catch (error) {
            console.error(error);
            alert('Error logging in');
        }
    };

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
