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
      const result = await axios.post('https://databalk-test-1.onrender.com/register', userData);
      console.log('New user created:', result.results);
      window.location.href = window.location.href;
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  return (
    <div>
      <h1>Create A New User</h1>
      <form onSubmit={handleSubmit}>
        
          <div className="row mb-3">
            <label htmlFor="emailAddress" className="col-sm-2 col-form-label">Email Address:</label>
            <div className="col-sm-10">
              <input className="form-control rounded-3"
                type="email"
                id="emailAddress"
                value={emailAddress}
                onChange={(e) => setEmailAddress(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="row mb-3">
            <label htmlFor="userPassword" className="col-sm-2 col-form-label">User Password:</label>
            <div className="col-sm-10">
              <input className="form-control rounded-3"
                type="password"
                id="userPassword"
                value={userPassword}
                onChange={(e) => setUserPassword(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="row mb-3">
            <label htmlFor="userName" className="col-sm-2 col-form-label">User Name:</label>
            <div className="col-sm-10">
              <input className="form-control rounded-3"
                type="text"
                id="userName"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="row">
            <div className="col-sm-2"></div>
            <div className="col-sm-10">
              <button className="btn border-success border-3 text-light" type="submit">Create User</button>
            </div>
          </div>
      </form>

    </div>
  );
};

export default CreateUserForm;
