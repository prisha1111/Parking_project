
const ParkingSpace = require('../models/ParkingspaceModel');

exports.addParkingSpace = async (req, res) => {
    const { slotNo, type, fuelType } = req.body;
    try {
        const parkingSpace = new ParkingSpace({ slotNo, type, fuelType });
        await parkingSpace.save();
        res.status(201).json({ message: 'Parking space created', parkingSpace });
    } catch (error) {
        res.status(500).json({ message: 'Error creating parking space', error });
    }
};

exports.getParkingSpaces = async (req, res) => {
    try {
        const parkingSpaces = await ParkingSpace.find();
        res.status(200).json(parkingSpaces);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching parking spaces', error });
    }
};