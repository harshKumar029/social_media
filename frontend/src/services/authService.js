import axios from 'axios';

const API_URL = "http://localhost:5000/api";

export const signUp = async (userData) => {
  const response = await axios.post(`${API_URL}/auth/signup`, userData);
  return response.data;
};

export const login = async (userData) => {
  const response = await axios.post(`${API_URL}/auth/login`, userData);
  localStorage.setItem('token', response.data.token); // Store token in localStorage
  return response.data;
};
