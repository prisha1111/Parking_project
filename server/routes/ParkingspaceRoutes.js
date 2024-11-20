
const express = require('express');
const { addParkingSpace, getParkingSpaces } = require('../controllers/ParkingspaceController');
const router = express.Router();

router.post('/add', addParkingSpace);
router.get('/', getParkingSpaces);

module.exports = router;