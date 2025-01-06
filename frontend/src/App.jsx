import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import FriendRequest from './components/FriendRequest';
import { UserProvider } from '../src/contexts/UserContext';
import FriendList from './components/FriendList';
import AuthLayout from './components/Authlayout'; 
import FriendRecommendations from './components/FriendRecommendations';
import Header from './components/Header'; // Import the Header component
import UserList from './components/UserList';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token'); // Check if token exists
  return token ? children : <Navigate to="/login" />;
};

const App = () => {
  const withAuthLayout = (component) => <AuthLayout>{component}</AuthLayout>; // Wrap component with AuthLayout

  return (
    <UserProvider>
      <Router>
        
        <Routes>
        <Route 
    path="/" 
    element={<Navigate to="/login" replace />} 
  />
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Protected Routes with AuthLayout and Header */}
          {/* <Route
            path="/dashboard"
            element={withAuthLayout(<PrivateRoute><Header title="Dashboard"><Dashboard /></Header></PrivateRoute>)}
          /> */}
          <Route
            path="/friend-requests"
            element={withAuthLayout(<Header title="Connection Requests"><PrivateRoute><FriendRequest /></PrivateRoute></Header>)}
          />
          <Route
            path="/friendlist"
            element={withAuthLayout(<PrivateRoute><Header title="My Friend"><FriendList /></Header></PrivateRoute>)}
          />
          <Route
            path="/FriendRecommendations"
            element={withAuthLayout(<PrivateRoute><Header title="Suggestions"><FriendRecommendations /></Header></PrivateRoute>)}
          />
          <Route
            path="/Search"
            element={withAuthLayout(<PrivateRoute><Header title="Search"><UserList /></Header></PrivateRoute>)}
          />

          {/* Catch-all for 404 */}
          <Route path="*" element={<h2>404: Page Not Found</h2>} />
        </Routes>
      </Router>
    </UserProvider>
  );
};

export default App;