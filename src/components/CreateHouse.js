import React, { useState } from 'react';
import axios from 'axios';

const CreateHouse = () => {
  const [houseDescription, setHouseDescription] = useState('');
  const [location, setLocation] = useState('');
  const [price, setPrice] = useState('');
  const [imgURL, setImgURL] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const houseData = {
      houseDescription,
      location,
      price,
      imgURL
    };

    try {
      const result = await axios.post('https://databalk-test-1.onrender.com/house', houseData);
      console.log('New house created:', result.results);
      window.location.href = window.location.href;
    } catch (error) {
      console.error('Error creating house:', error);
    }
  };

  return (
    <div>
      <h1>Create A New House</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="houseDescription" className="form-label">House Description:</label>
          <input
            className="form-control rounded-3"
            type="text"
            id="houseDescription"
            value={houseDescription}
            onChange={(e) => setHouseDescription(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="location" className="form-label">Location:</label>
          <input
            className="form-control rounded-3"
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="price" className="form-label">Price:</label>
          <input
            className="form-control rounded-3"
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="imgURL" className="form-label">Image Link:</label>
          <input
            className="form-control rounded-3"
            type="text"
            id="imgURL"
            value={imgURL}
            onChange={(e) => setImgURL(e.target.value)}
            required
          />
        </div>
        <button className="btn border-success border-3 text-light" type="submit">Create product</button>
      </form>

    </div>
  );
};

export default CreateHouse;