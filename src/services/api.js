// src/services/api.js

import axios from 'axios';

// Set the base URL for the API
const API_URL = 'http://localhost:8080/api'; // Make sure this matches your backend's URL

// Function to log in
export const login = async (username, password, role) => {
    try {
        const response = await axios.post(`${API_URL}/auth/login`, {
            username,
            password,
            role
        });
        // Handle successful login (e.g., store user data or token)
        return response.data; // Return response for further processing
    } catch (error) {
        console.error('Login failed:', error);
        throw error; // Rethrow the error for handling in the component
    }
};
