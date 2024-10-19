// src/services/api.js
import axios from 'axios';

const API_BASE_URL = 'https://readwise-8dc6a7dcfdc3.herokuapp.com/api'; // Update this if your backend is hosted elsewhere

export const chatWithAssistant = async (message) => {
  const response = await axios.post(`${API_BASE_URL}/chat`, { message });
  return response.data;
};

export const getBookRecommendations = async (message) => {
  const response = await axios.post(`${API_BASE_URL}/books/recommendations`, { "message": message });
  return response.data;
};

// Add more API functions as needed
