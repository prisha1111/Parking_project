
const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const parkingSpaceRoutes = require('./routes/ParkingspaceRoutes'); // Import the parking space routes
const dotenv = require('dotenv');

dotenv.config();
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/parking-spaces', parkingSpaceRoutes); // Use the parking space routes

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});