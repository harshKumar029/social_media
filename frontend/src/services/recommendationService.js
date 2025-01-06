import axios from 'axios';

const API_URL = "https://social-media-k8hd.onrender.com/api";

export const getFriendRecommendations = async () => {
  const token = localStorage.getItem('token');
  const response = await axios.get(`${API_URL}/recommendations`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
