// client/src/Components/ParkingSpaceManager.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../Styles/Parkingspacemanager.css"; // Create this CSS file for styling

const ParkingSpaceManager = () => {
    const [formData, setFormData] = useState({
        slotNo: '',
        type: '',
        fuelType: ''
    });
    const [parkingSpaces, setParkingSpaces] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/parking-spaces/add', formData);
            alert('Parking space added successfully');
            fetchParkingSpaces(); // Refresh the list after adding
            setFormData({ slotNo: '', type: '', fuelType: '' });
          // Reset form
        } catch (error) {
            console.error(error);
            alert('Error adding parking space');
        }
        // catch (error) {
        //     console.error('Error details:', error.response ? error.response.data : error.message);
        //     alert('Error adding parking space: ' + (error.response ? error.response.data.message : error.message));
        // }
    };

    const fetchParkingSpaces = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/parking-spaces/');
            setParkingSpaces(response.data);
        } catch (error) {
            console.error(error);
            alert('Error fetching parking spaces');
        }
    };

    useEffect(() => {
        fetchParkingSpaces();
    }, []);

    return (
        <div className="parking-space-manager">
            <h1>Manage Parking Spaces</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="slotNo">Slot No</label>
                    <input
                        type="number"
                        id="slotNo"
                        name="slotNo"
                        value={formData.slotNo}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="type">Type</label>
                    <select
                        id="type"
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Type</option>
                        <option value="2 Wheeler">2 Wheeler</option>
                        <option value="3 Wheeler">3 Wheeler</option>
                        <option value="4 Wheeler">4 Wheeler</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="fuelType">Fuel Type</label>
                    <select
                        id="fuelType"
                        name="fuelType"
                        value={formData.fuelType}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Fuel Type</option>
                        <option value="Petrol">Petrol</option>
                        <option value="Diesel">Diesel</option>
                        <option value="Electric">Electric</option>
                    </select>
                </div>
                <button type="submit" className="add-btn">Add Parking Space</button>
            </form>
            <h2>Existing Parking Spaces</h2>
            <ul>
                {parkingSpaces.map(space => (
                    <li key={space.slotNo}>
                        Slot No: {space.slotNo}, Type: {space.type}, Fuel Type: {space.fuelType}, Available: {space.isAvailable ? 'Yes' : 'No'}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ParkingSpaceManager;