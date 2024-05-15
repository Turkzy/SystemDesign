import React, { useState } from 'react';
import axios from 'axios';
import './AddAccount.css';
import { useNavigate } from 'react-router';

const AddAccount = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usertype, setUsertype] = useState('User'); // Default to 'User'
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/admins', { username, password, usertype });
      if (response.status === 201) {
        setMessage('Admin Created Successfully');
        setUsername('');
        setPassword('');
        setUsertype('User'); 
        navigate('/Dashboard/SystemManagement');
      } else {
        setMessage('Failed to create admin');
      }
    } catch (error) {
      console.log(error);
      setMessage('Internal Server Error');
    }
  };

  return (
    <div className="add-account-container custom-margin">
      <h1>Add Account</h1>
      <form onSubmit={handleSubmit} className="add-account-form">
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="usertype">User Type</label>
          <select
            id="usertype"
            value={usertype}
            onChange={(e) => setUsertype(e.target.value)}
            required
          >
            <option value="User">User</option>
            <option value="Admin">Admin</option>
          </select>
        </div>
        <button type="submit" className="submit-button">Add Account</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default AddAccount;
