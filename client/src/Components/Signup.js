import React,{useState} from 'react';
import "../Styles/Signup.css" // Make sure to create a CSS file for styling
import axios from 'axios';

const Signup = () => {

    const Signup = () => {
        const [formData, setFormData] = useState({
            username: '',
            email: '',
            phoneno: '',
            password: '',
            role: 'user'
        });
    
        const handleChange = (e) => {
            const { name, value } = e.target;
            setFormData({ ...formData, [name]: value });
        };
    
        const handleSubmit = async (e) => {
            e.preventDefault();
            try {
                await axios.post('http://localhost:5000/api/signup', formData);
                alert('Signup successful');
            } catch (error) {
                console.error(error);
                alert('Error signing up');
            }
        };
    
//     return (
//         <div class="signup-container">
//             <form class="signup-form">
//                 <h1>Create Your Account</h1>

//                 <div class="form-group">
//                     <label for="username">Username</label>
//                     <input
//                         type="text"
//                         id="username"
//                         name="username"
//                         placeholder="Enter your username"
//                         required
//                     />
//                 </div>

//                 <div class="form-group">
//                     <label for="email">Email</label>
//                     <input
//                         type="email"
//                         id="email"
//                         name="email"
//                         placeholder="Enter your email"
//                         required
//                     />
//                 </div>

//                 <div class="form-group">
//                     <label for="phoneno">Phone Number</label>
//                     <input
//                         type="tel"
//                         id="phoneno"
//                         name="phoneno"
//                         placeholder="Enter your phone number"
//                         required
//                     />
//                 </div>

//                 <div class="form-group">
//                     <label for="password">Password</label>
//                     <input
//                         type="password"
//                         id="password"
//                         name="password"
//                         placeholder="Enter your password"
//                         required
//                     />
//                 </div>

//                 <div class="form-group">
//                     <label for="role">Role</label>
//                     <select id="role" name="role" required>
//                         <option value="user">User</option>
//                         <option value="admin">Admin</option>
//                     </select>
//                 </div>

//                 <button type="submit" class="signup-btn">
//                     Sign Up
//                 </button>
//             </form>
//         </div>
//     );}
// };


return (
    <div className="signup-container">
        <form className="signup-form" onSubmit={handleSubmit}>
            <h1>Create Your Account</h1>

            <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    placeholder="Enter your username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="phoneno">Phone Number</label>
                <input
                    type="tel"
                    id="phoneno"
                    name="phoneno"
                    placeholder="Enter your phone number"
                    value={formData.phoneno}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="role">Role</label>
                <select
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    required
                >
                    <option value="user">User </option>
                    <option value="admin">Admin</option>
                </select>
            </div>

            <button type="submit" className="signup-btn">
                Sign Up
            </button>
        </form>
    </div>
);}
};

export default Signup;