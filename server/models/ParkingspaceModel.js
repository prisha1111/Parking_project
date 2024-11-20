
const mongoose = require('mongoose');

const parkingSpaceSchema = new mongoose.Schema({
    slotNo: { type: Number, required: true, unique: true },
    type: { type: String, required: true, enum: ['2 Wheeler', '3 Wheeler', '4 Wheeler'] },
    fuelType: { type: String, required: true, enum: ['Petrol', 'Diesel', 'Electric'] },
    isAvailable: { type: Boolean, default: true }
});

module.exports = mongoose.model('ParkingSpace', parkingSpaceSchema);