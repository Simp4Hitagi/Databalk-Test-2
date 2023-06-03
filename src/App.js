import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import CreateUserForm from './CreateUserForm';

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const result = await axios.get('http://localhost:5000/users');
      console.log(result.data.results);
      setUsers(result.data.results);
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  };

  if (!users) {
    return (
      <div>
        <div className="spinner-border text-light" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <div>Loading...</div>
      </div>
    );
  }

  const userRows = []; // Array to hold the JSX rows

  for (let i = 0; i < users.length; i++) {
    const user = users[i];
    userRows.push(
      <tr key={i}>
        <th scope="row">{i + 1}</th>
        <td>{user.userName}</td>
        <td>{user.emailAddress}</td>
        <td>{user.userPassword}</td>
      </tr>
    );
  }

  return (
    <div className="App">
      <header className="App-header"></header>
      <main>
      <CreateUserForm />
        <table className="table table-bordered border-primary">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">First</th>
              <th scope="col">Last</th>
              <th scope="col">Handle</th>
            </tr>
          </thead>
          <tbody>{userRows}</tbody>
        </table>
      </main>
    </div>
  );
}

export default App;
