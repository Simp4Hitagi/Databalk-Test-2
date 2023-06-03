import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UpdateUserForm = () => {
  const [userID, setUserID] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userName, setUserName] = useState('');

  useEffect(() => {
    // Get the user data from the server
    axios.get(`http://localhost:5000/user/${userID}`)
      .then((response) => {
        const user = response.data;
        setEmailAddress(user.emailAddress);
        setUserPassword(user.userPassword);
        setUserName(user.userName);
      })
      .catch((error) => {
        console.error('Error getting user data:', error);
      });
  }, [userID]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const userData = {
      emailAddress,
      userPassword,
      userName
    };

    try {
      await axios.put(`http://localhost:5000/users/${userID}`, userData);
      console.log('User updated successfully');
      console.log(userData);
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  return (
    <div>
      <h1>Update User</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="userID">User ID:</label>
          <input
            type="text"
            id="userID"
            value={userID}
            onChange={(e) => setUserID(e.target.value)}
            required
          />
        </div>
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
        <button type="submit" onClick={handleSubmit}>Update User</button>
      </form>
    </div>
  );
};

export default UpdateUserForm;
