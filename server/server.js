
const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const parkingSpaceRoutes = require('./routes/ParkingspaceRoutes'); // Import the parking space routes
const dotenv = require('dotenv');
const userAccountRoutes  = require('./routes/authR');
const walletRoutes = require('./routes/WalletRoutes');
// const userAccountR  = require('./routes/authR');
dotenv.config();
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/parking-spaces', parkingSpaceRoutes); // Use the parking space routes
app.use('/api/userAccount', userAccountRoutes); // User account routes
// app.use('/api/user', userAccountR); // User account routes
app.use('/api/wallet',walletRoutes);

// Import the auth router
const authR = require('./routes/authR');

// Use the auth router
app.use('/api', authR);


// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});