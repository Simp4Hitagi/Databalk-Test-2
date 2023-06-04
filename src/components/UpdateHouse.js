import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UpdateHouse = () => {
  const [houseID, setHouseID] = useState('');
  const [houseData, setHouseData] = useState({
    houseDescription: '',
    location: '',
    price: '',
    imgURL: ''
  });

  useEffect(() => {
    axios
      .get(`http://localhost:5000/house/${houseID}`)
      .then((response) => {
        const house = response.data;
        setHouseData(house);
      })
      .catch((error) => {
        console.error('Error getting house data:', error);
      });
  }, [houseID]);

  const handleInput = (event) => {
    setHouseData({ ...houseData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const { houseDescription, location, price, imgURL } = houseData;
      await axios.put(`http://localhost:5000/house/${houseID}`, {
        houseDescription,
        location,
        price,
        imgURL
      });
      console.log('House updated successfully');
      console.log(houseData);
    } catch (error) {
      console.error('Error updating house:', error);
    }
  };

  return (
    <div>
      <h1>Update House</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="houseID">House ID:</label>
          <input
            name="houseID"
            type="number"
            id="houseID"
            value={houseID}
            onChange={(event) => setHouseID(event.target.value)}

          />
        </div>
        <div>
          <label htmlFor="houseDescription">House Description:</label>
          <input
            name="houseDescription"
            type="text"
            id="houseDescription"
            value={houseData.houseDescription}
            onChange={handleInput}

          />
        </div>
        <div>
          <label htmlFor="location">House Location:</label>
          <input
            name="location"
            type="text"
            id="location"
            value={houseData.location}
            onChange={handleInput}

          />
        </div>
        <div>
          <label htmlFor="price">Price:</label>
          <input
            name="price"
            type="number"
            id="price"
            value={houseData.price}
            onChange={handleInput}

          />
        </div>
        <div>
          <label htmlFor="imgURL">Image Link:</label>
          <input
            name="imgURL"
            type="text"
            id="imgURL"
            value={houseData.imgURL}
            onChange={handleInput}
    
          />
        </div>
        <button type="submit">Update House</button>
      </form>
    </div>
  );
};

export default UpdateHouse;
