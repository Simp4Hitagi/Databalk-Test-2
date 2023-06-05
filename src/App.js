import React, { useEffect, useState } from "react";
import axios from "axios";
// importing create and update components
import CreateUserForm from "./components/CreateUserForm";
import UpdateUserForm from "./components/UpdateUserForm";
import CreateHouse from "./components/CreateHouse";
import UpdateHouse from "./components/UpdateHouse";

function App() {
  /*
    initialising user 
    and house state with empty array's, respectively
  */
  const [users, setUsers] = useState([]);
  const [houses, setHouses] = useState([]);

  useEffect(() => {
  /*
    using useEffect hook to call fetch functions for
    user data 
    and house data 
    from localhost API
  */

    loadUserData();
    fetchHousesData();

  }, []);

  //  ===========User===========
  // fetching user data function
  const loadUserData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/users");
      if (response.status === 200) {
        console.log(response.data.results);
        setUsers(
          response.data.results.map((user) => ({
            userID: user.userID,
            userName: user.userName,
            emailAddress: user.emailAddress,
            userPassword: user.userPassword,
          }))
        );
      }
    } catch (error) {
      console.error("Error loading user data:", error);
    }
  };
  // delete function for single user
  const deleteUser = async (userID) => {
    try {
      const response = await axios.delete(`http://localhost:5000/user/${userID}`);
      if (response.status === 200) {
        console.log(`User ${userID} deleted successfully`);
        setUsers(users.filter(user => user.userID !== userID));
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };


  //  ===========House===========
  // fetching house data function
  const fetchHousesData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/houses");
      if (response.status === 200) {
        console.log(response.data.results);
        setHouses(
          response.data.results.map((house) => ({
            houseID: house.houseID,
            houseDescription: house.houseDescription,
            location: house.location,
            price: house.price,
            imgURL: house.imgURL,
          }))
        );
      }
    } catch (error) {
      console.error("Error loading house data:", error);
    }
  };
  // delete function for single house
  const deleteHouse = async (houseID) => {
    try {
      const response = await axios.delete(`http://localhost:5000/house/${houseID}`);
      if (response.status === 200) {
        console.log(`House ${houseID} deleted successfully`);
        setHouses(houses.filter(house => house.houseID !== houseID));
      }
    } catch (error) {
      console.error('Error deleting house:', error);
    }
  };


  if (!users || !houses) {
    /* 
        loader incase data from API doesn't come through for
        users and
        houses
    */
   return (
     <div>
        <div className="spinner-border text-light" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <div>Loading...</div>
      </div>
    );
  }


  /*
   renders the rows of the users table with the user data
   AND
   iterates over the array of users and generates a row for each user in the table. 
   The index is used to display the row UserID/number, 
   and the user properties are displayed in their respective columns
  */
  const userRows = users.map((user, index) => (
    <tr key={user.userID}>
      <th scope="row">{index + 1}</th>
      <td>{user.userName}</td>
      <td>{user.emailAddress}</td>
      <td>{user.userPassword}</td>
      <td>
      {/* triggers the deleteUser function when userID is passed */}
        <button className="btn border-danger" onClick={() => deleteUser(user.userID)}>Delete</button>
      </td>
    </tr>
  ));



  // renders the cards for each house in the houses array
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
              <button className=" btn border-primary" onClick={() => deleteHouse(house.houseID)}>Delete</button>

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
        <table className="table table-hover table-bordered border-primary">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">User Name</th>
              <th scope="col">Email</th>
              <th scope="col">Hashed password</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          {/* calling userRows*/}
          <tbody>{userRows}</tbody>
        </table>
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
          {/* calling houseCards */}
          {houseCards}
        </div>
      </main>
    </div>
  );
}

export default App;
