import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UpdateUserForm = () => {
  const [userID, setUserID] = useState('');
  const [userData, setUserData] = useState({
    emailAddress: '',
    userPassword: '',
    userName: '',
  });

  useEffect(() => {
    axios
      .get(`http://localhost:5000/user/${userID}`)
      .then((response) => {
        const user = response.data;
        setUserData(user);
      })
      .catch((error) => {
        console.error('Error getting user data:', error);
      });
  }, [userID]);

  const handleInput = (event) => {
    setUserData({ ...userData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const { emailAddress, userPassword, userName } = userData;
      await axios.put(`http://localhost:5000/user/${userID}`, {
        emailAddress,
        userPassword,
        userName,
      });
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
            name="userID"
            type="text"
            id="userID"
            value={userID}
            onChange={(event) => setUserID(event.target.value)}
            
          />
        </div>
        <div>
          <label htmlFor="emailAddress">Email Address:</label>
          <input
            name="emailAddress"
            type="email"
            id="emailAddress"
            value={userData.emailAddress}
            onChange={handleInput}
            
          />
        </div>
        <div>
          <label htmlFor="userPassword">User Password:</label>
          <input
            name="userPassword"
            type="password"
            id="userPassword"
            value={userData.userPassword}
            onChange={handleInput}
            
          />
        </div>
        <div>
          <label htmlFor="userName">User Name:</label>
          <input
            name="userName"
            type="text"
            id="userName"
            value={userData.userName}
            onChange={handleInput}
            
          />
        </div>
        <button type="submit">Update User</button>
      </form>
    </div>
  );
};

export default UpdateUserForm;
