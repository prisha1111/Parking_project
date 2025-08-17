
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const parkingSpaceRoutes = require('./routes/ParkingspaceRoutes'); // Import the parking space routes
const dotenv = require('dotenv');
const userAccountRoutes  = require('./routes/authR');
const walletRoutes = require('./routes/WalletRoutes');
const handleVoiceCall = require('./socketHandlers/voiceCallHandler');
// const userAccountR  = require('./routes/authR');
dotenv.config();
const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));

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

// Initialize voice call socket handlers
handleVoiceCall(io);

// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});