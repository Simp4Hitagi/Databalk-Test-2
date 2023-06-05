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
      .get(`https://databalk-test-1.onrender.com/user/${userID}`)
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
      await axios.put(`https://databalk-test-1.onrender.com/user/${userID}`, {
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
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="userID" className="form-label">User ID:</label>
          <input
            className="form-control rounded-3"
            name="userID"
            type="text"
            id="userID"
            value={userID}
            onChange={(event) => setUserID(event.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="emailAddress" className="form-label">Email Address:</label>
          <input
            className="form-control rounded-3"
            name="emailAddress"
            type="email"
            id="emailAddress"
            value={userData.emailAddress}
            onChange={handleInput}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="userPassword" className="form-label">User Password:</label>
          <input
            className="form-control rounded-3"
            name="userPassword"
            type="password"
            id="userPassword"
            value={userData.userPassword}
            onChange={handleInput}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="userName" className="form-label">User Name:</label>
          <input
            className="form-control rounded-3"
            name="userName"
            type="text"
            id="userName"
            value={userData.userName}
            onChange={handleInput}
          />
        </div>
        <button className="btn border-success border-3 text-light" type="submit">Update User</button>
      </form>
    </div>
  );
};

export default UpdateUserForm;
