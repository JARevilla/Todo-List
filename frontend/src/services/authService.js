import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api/';

export const loginUser = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}api-token-auth/`, {
      username,
      password,
    });
    return response.data.token;  // Return the token if login is successful
  } catch (error) {
    throw new Error('Invalid credentials');
  }
};

export const registerUser = async (username, password, email) => {
  try {
    await axios.post(`${API_URL}register/`, {  // Endpoint for registration
      username,
      password,
      email,
    });
  } catch (error) {
    throw new Error('Registration failed');
  }
};

export const logoutUser = () => {
  localStorage.removeItem('auth_token'); // Clear token on logout
};
