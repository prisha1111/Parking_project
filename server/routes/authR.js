//token vlidation is done here, and user account details

const express = require('express');
const jwt = require('jsonwebtoken'); // Import jsonwebtoken
const router = express.Router();
const User = require('../models/User'); 


// Middleware to authenticate user
const authenticate = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
    } catch (err) {
      res.status(401).json({ message: 'Unauthorized' });
    }
  };

  
// Define the validate token endpoint
router.post('/validate-token', authenticate, (req, res) => {
    return res.status(200).json({ message: 'Token is valid' });
});





// Get User Account Details route (Protected)
router.get('/details', authenticate, async (req, res) => {
    try {
        const user = await User.findById(req.user.userId);
        if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    res.json({
        username: User.username,
        password: User.password,

    });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
    });
module.exports = router;