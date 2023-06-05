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
      .get(`https://databalk-test-1.onrender.com/house/${houseID}`)
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
      await axios.put(`https://databalk-test-1.onrender.com/house/${houseID}`, {
        houseDescription,
        location,
        price,
        imgURL
      });
      console.log('House updated successfully');
      console.log(houseData);
      window.location.href = window.location.href;
    } catch (error) {
      console.error('Error updating house:', error);
    }
  };

  return (
    <div className="my-1">
      <h1>Update House</h1>
      <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="houseID" className="form-label">House ID:</label>
            <input
              className="form-control rounded-3"
              name="houseID"
              type="number"
              id="houseID"
              value={houseID}
              onChange={(event) => setHouseID(event.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="houseDescription" className="form-label">House Description:</label>
            <input
              className="form-control rounded-3"
              name="houseDescription"
              type="text"
              id="houseDescription"
              value={houseData.houseDescription}
              onChange={handleInput}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="location" className="form-label">House Location:</label>
            <input
              className="form-control rounded-3"
              name="location"
              type="text"
              id="location"
              value={houseData.location}
              onChange={handleInput}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="price" className="form-label">Price:</label>
            <input
              className="form-control rounded-3"
              name="price"
              type="number"
              id="price"
              value={houseData.price}
              onChange={handleInput}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="imgURL" className="form-label">Image Link:</label>
            <input
              className="form-control rounded-3"
              name="imgURL"
              type="text"
              id="imgURL"
              value={houseData.imgURL}
              onChange={handleInput}
            />
          </div>
          <button className="btn border-success border-3 text-light" type="submit">Update House</button>
      </form>

    </div>
  );
};

export default UpdateHouse;
