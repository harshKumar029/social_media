import React from 'react';
import UserList from './UserList';
import { useNavigate } from 'react-router-dom';
import FriendRequest from './FriendRequest';
import FriendRecommendations from './FriendRecommendations';
import { useUser } from '../contexts/UserContext';
import {sendFriendRequest} from '../services/friendService'
import FriendList from './FriendList';

const Dashboard = () => {
  const { user, logoutUser } = useUser(); // Access user details and logout function
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser(); // Clear user details from context
    navigate('/login');
  };
  const handleFriendRequest = async (userId) => {
    try {
      await sendFriendRequest(userId);
    } catch (err) {
      console.error(err);
    }
  };


  return (
    <div className="dashboard-container">
      <div>
      <h1 className=' bg-slate-500 text-red-950'>Welcome, {user?.username || 'User'}!</h1>
      <h1>Dashboard</h1>
      <h2>FriendList</h2>
      <FriendList/>
      <h2>Friend Requests</h2>
      <FriendRequest />
      <h2>Search Users</h2>
      <UserList onFriendRequest={handleFriendRequest} />
      <h2>Friend Recommendations</h2>
      <FriendRecommendations />
      <button onClick={handleLogout}>Logout</button>
      </div>
      <section>
        
      </section>
    </div>
  );
};

export default Dashboard;

