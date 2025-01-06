import axios from 'axios';

const API_URL = "http://localhost:5000/api";

  export const sendFriendRequest = async (receiverId) => {
    const token = localStorage.getItem('token');
    const response = await axios.post(
      `${API_URL}/friends/send`, // Fixed endpoint
      { receiverId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("sendFriendRequest response:", response);
    return response.data;
  };

  export const acceptFriendRequest = async (requestId) => {
    const token = localStorage.getItem('token');
    const response = await axios.post(
      `${API_URL}/friends/accept`,
      { requestId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  };

  export const rejectFriendRequest = async (requestId) => {
    const token = localStorage.getItem('token');
    const response = await axios.post(
      `${API_URL}/friends/reject`,
      { requestId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  };
  
  // ..............

export const fetchFriendRequests = async () => {
  const token = localStorage.getItem('token');
  const response = await axios.get(`${API_URL}/friends/requests`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log("fetchFriendRequests response",response)
  return response.data;
};

export const respondToRequest = async (requestId, action) => {
  const token = localStorage.getItem('token');
  const response = await axios.post(
    `${API_URL}/friends/respond`,
    { requestId, action },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const searchUsers = async (query) => {
  const token = localStorage.getItem('token');
  const response = await axios.get(`${API_URL}/friends/search?query=${query}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log("searchUsers",response)
  return response.data;
};

// Get Friend List
// export const getFriendList = async () => {
//   const token = localStorage.getItem('token');
//     const response = await axios.get(`${API_URL}/api/friends/getFriendList`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     console.log("getFriendList",response)
//     return response.data;
//   };

export const getFriendList = async () => {
  const token = localStorage.getItem('token'); // Retrieve the token
  if (!token) {
    throw new Error('No authentication token found'); // Handle missing token
  }

  try {
    const response = await axios.get(`${API_URL}/friends/getFriendList`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('getFriendList', response.data); // Log the response data
    return response.data; // Return the friend list
  } catch (error) {
    console.error('Error fetching friend list:', error.response?.data || error.message);
    throw error; // Re-throw the error for further handling
  }
};
