import React, { useEffect, useState } from "react";
import axios from "axios";
import CreateUserForm from "./components/CreateUserForm";
import UpdateUserForm from "./components/UpdateUserForm";
import CreateHouse from "./components/CreateHouse";
import UpdateHouse from "./components/UpdateHouse";

function App() {
  const [selectedUserID, setSelectedUserID] = useState("");
  const [users, setUsers] = useState([]);
  const [houses, setHouses] = useState([]);

  useEffect(() => {
    loadUserData();
    fetchHousesData();
  }, []);

  const loadUserData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/users");
      if (response.status === 200) {
        console.log(response.data.results);
        setUsers(response.data.results);
      }
    } catch (error) {
      console.error("Error loading user data:", error);
    }
  };

  const fetchHousesData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/houses");
      if (response.status === 200) {
        console.log(response.data.results);
        setHouses(response.data.results);
      }
    } catch (error) {
      console.error("Error loading house data:", error);
    }
  };

  const handleUserSelection = (event) => {
    setSelectedUserID(event.target.value);
  };

  const deleteUser = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/user/${selectedUserID}`
      );
      if (response.status === 200) {
        console.log(`User ${selectedUserID} deleted successfully`);
        setUsers(users.filter((user) => user.userID !== selectedUserID));
        setSelectedUserID("");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
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

  const userOptions = users.map((user) => (
    <option key={user.userID} value={user.userID}>
      {user.userName}
    </option>
  ));

  const userRows = users.map((user, index) => (
    <tr key={user.userID}>
      <th scope="row">{index + 1}</th>
      <td>{user.userName}</td>
      <td>{user.emailAddress}</td>
      <td>{user.userPassword}</td>
    </tr>
  ));

  const houseCards = houses.map((house) => (
    <div className="container" key={house.houseID}>
      <div className="row">
        <div className="col">
          <div className="card my-3 mx-auto" style={{ width: "18rem" }}>
            <img src={house.imgURL} className="card-img-top" alt="House" />
            <div className="card-body">
              <p className="card-text">{house.houseDescription}</p>
              <p className="card-text">Location: {house.location}</p>
              <p className="card-text">R {house.price}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  ));

  return (
    <div className="App">
      <main>
        <h1 className="display-1">Users</h1>
        <div className="container">
          <div className="row">
            <div className="col">
              <CreateUserForm />
            </div>
            <div className="col">
              <UpdateUserForm />
            </div>
          </div>
        </div>
        <h1>Rendering Users</h1>
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
        <div>
          <label htmlFor="userSelect">Select User:</label>
          <select
            id="userSelect"
            className="form-select"
            value={selectedUserID}
            onChange={handleUserSelection}
          >
            <option value="">Select</option>
            {userOptions}
          </select>
          <button onClick={deleteUser}>Delete</button>
        </div>
        <div className="container">
          <h1 className="display-1">Houses</h1>
          <div className="container">
            <div className="row">
              <div className="col">
                <CreateHouse />
              </div>
              <div className="col">
                <UpdateHouse />
              </div>
            </div>
          </div>
          {houseCards}
        </div>
      </main>
    </div>
  );
}

export default App;