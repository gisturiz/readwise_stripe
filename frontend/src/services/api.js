// src/services/api.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api'; // Update this if your backend is hosted elsewhere

export const chatWithAssistant = async (message) => {
  const response = await axios.post(`${API_BASE_URL}/chat`, { message });
  return response.data;
};

export const getBookRecommendations = async (message) => {
  console.log({ "message": message })
  const response = await axios.post(`${API_BASE_URL}/books/recommendations`, { "message": message });
  return response.data;
};

// Add more API functions as needed
