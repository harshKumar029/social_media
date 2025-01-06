import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext'; // Import UserContext
import { login } from '../services/authService';

const Login = () => {
  const [userData, setUserData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const { loginUser } = useUser(); // Use the loginUser function from UserContext
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await login(userData); // Calls your login service
      console.log("response in login bkhbhj pagfe",response)
      loginUser({ user: response}); // Save user details in context
      navigate('/friendlist'); // Redirect to dashboard
    } catch (err) {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleLogin}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={userData.username}
          onChange={handleInputChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={userData.password}
          onChange={handleInputChange}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
