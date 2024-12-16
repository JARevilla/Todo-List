import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api/tasks/';

// Get all tasks
export const getTasks = async () => {
  const token = localStorage.getItem('auth_token');
  const response = await axios.get(API_URL, {
    headers: { Authorization: `Token ${token}` },
  });
  return response.data;  // Return task data
};

// Create a new task
export const createTask = async (taskData) => {
  const token = localStorage.getItem('auth_token');
  const response = await axios.post(API_URL, taskData, {
    headers: { Authorization: `Token ${token}` },
  });
  return response.data;
};

// Delete a task
export const deleteTask = async (taskId) => {
  const token = localStorage.getItem('auth_token');
  await axios.delete(`${API_URL}${taskId}/`, {
    headers: { Authorization: `Token ${token}` },
  });
};


export const updateTaskStatus = async (taskId, completed) => {
  const token = localStorage.getItem('auth_token');
  const url = `${API_URL}${taskId}/`;

  try {
    console.log("URL:", url);
    console.log("Payload:", { completed });
    console.log("Headers:", { Authorization: `Token ${token}` });

    const response = await axios.patch(
      url,
      { completed }, // Send the boolean value directly
      {
        headers: {
          Authorization: `Token ${token}`, // Add token
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error response:", error.response?.data); // Log the exact error message
    console.error("Status code:", error.response?.status);
    throw error;
  }
};

// Get notifications for the authenticated user
export const getNotifications = async () => {
  const token = localStorage.getItem('auth_token');
  const notif_url = 'http://127.0.0.1:8000/api/notifications/';  // Replace with your actual notifications endpoint
  
  try {
    const response = await axios.get(notif_url, {
      headers: { Authorization: `Token ${token}` },
    });
    return response.data;  // Return notification data
  } catch (error) {
    console.error('Error fetching notifications:', error.response?.data);
    throw error;
  }
};


export const markNotificationAsRead = async (notificationId) => {
  const APIURL = 'http://127.0.0.1:8000/api/notifications/';
  const token = localStorage.getItem('auth_token');
  const url = `${APIURL}${notificationId}/read/`;

  try {
    const response = await axios.patch(
      url,
      {},  // Empty payload as we only need to trigger the update action
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error marking notification as read:", error.response?.data);
    throw error;
  }
};

