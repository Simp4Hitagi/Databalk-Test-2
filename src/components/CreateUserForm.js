import React, { useState } from 'react';
import axios from 'axios';

const CreateUserForm = () => {
  const [emailAddress, setEmailAddress] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userName, setUserName] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const userData = {
      emailAddress,
      userPassword,
      userName
    };

    try {
      const result = await axios.post('http://localhost:5000/register', userData);
      console.log('New user created:', result.results);
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  return (
    <div>
      <h1>Create A New User</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="emailAddress">Email Address:</label>
          <input
            type="email"
            id="emailAddress"
            value={emailAddress}
            onChange={(e) => setEmailAddress(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="userPassword">User Password:</label>
          <input
            type="password"
            id="userPassword"
            value={userPassword}
            onChange={(e) => setUserPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="userName">User Name:</label>
          <input
            type="text"
            id="userName"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
          />
        </div>
        <button type="submit">Create User</button>
      </form>
    </div>
  );
};

export default CreateUserForm;
