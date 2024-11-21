
const express = require('express');
const { addParkingSpace, getParkingSpaces } = require('../controllers/ParkingspaceController');
const router = express.Router();
const ParkingSpace = require('../models/ParkingspaceModel');

router.post('/add', addParkingSpace);
router.get('/', getParkingSpaces);


// Fetch a specific parking space by its ID
router.get('/:id', async (req, res) => {
    try {
      const parkingSpace = await ParkingSpace.findById(req.params.id);
  
      if (!parkingSpace) {
        return res.status(404).json({ message: 'Parking space not found' });
      }
  
      res.status(200).json(parkingSpace);
    } catch (err) {
      res.status(400).json({ message: 'Failed to fetch parking space', error: err });
    }
  });
  
module.exports = router;

// Update parking space status (e.g., occupy or free)
router.put('/update/:id', async (req, res) => {
    try {
      const { status } = req.body;
      const parkingSpace = await ParkingSpace.findByIdAndUpdate(
        req.params.id,
        { status },
        { new: true }
      );
  
      if (!parkingSpace) {
        return res.status(404).json({ message: 'Parking space not found' });
      }
  
      res.status(200).json({ message: 'Parking space status updated', parkingSpace });
    } catch (err) {
      res.status(400).json({ message: 'Failed to update parking space', error: err });
    }
  });