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
      const result = await axios.post('http://localhost:5000/house', houseData);
      console.log('New house created:', result.results);
    } catch (error) {
      console.error('Error creating house:', error);
    }
  };

  return (
    <div>
      <h1>Create A New House</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="houseDescription">House Description:</label>
          <input
            type="text"
            id="houseDescription"
            value={houseDescription}
            onChange={(e) => setHouseDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="location">Location:</label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="imgURL">Image Link:</label>
          <input
            type="text"
            id="imgURL"
            value={imgURL}
            onChange={(e) => setImgURL(e.target.value)}
            required
          />
        </div>
        <button type="submit">Create product</button>
      </form>
    </div>
  );
};

export default CreateHouse;


























// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const CreateHouse = () => {
//   const [houseID, setHouseID] = useState('');
//   const [houseDescription, setHouseDescription] = useState('');
//   const [location, setLocation] = useState('');
//   const [price, setPrice] = useState('');
//   const [imgURL, setImgURL] = useState('');
//   const [houses, setHouses] = useState([]);

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     const houseData = {
//         houses,
//       houseID,
//       houseDescription,
//       location,
//       price,
//       imgURL
//     };

//     try {
//       const result = await axios.post('http://localhost:5000/house', houseData);
//       console.log('New house created:', result.data.results);
//     } catch (error) {
//       console.error('Error creating a house:', error);
//     }
//   };

//   const fetchHousesData = async () => {
//     try {
//       const response = await axios.get('http://localhost:5000/houses');
//       if (response.status === 200) {
//         console.log(response.data.results);

//         setHouses(response.data.results);
//       }
//     } catch (error) {
//       console.error('Error loading house data:', error);
//     }
//   };

//   useEffect(() => {
//     fetchHousesData();
//   }, []);

//   return (
//     <div>
//       <h1>Create A New House</h1>
      
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label htmlFor="houseID">House ID:</label>
//           <input
//             type="number"
//             id="houseID"
//             value={houseID}
//             onChange={(e) => setHouseID(e.target.value)}
//           />
//         </div>
//         <div>
//           <label htmlFor="houseDescription">House Description:</label>
//           <input
//             type="text"
//             id="houseDescription"
//             value={houseDescription}
//             onChange={(e) => setHouseDescription(e.target.value)}
//           />
//         </div>
//         <div>
//           <label htmlFor="location">House Location:</label>
//           <input
//             type="text"
//             id="location"
//             value={location}
//             onChange={(e) => setLocation(e.target.value)}
//           />
//         </div>
//         <div>
//           <label htmlFor="price">Price:</label>
//           <input
//             type="number"
//             id="price"
//             value={price}
//             onChange={(e) => setPrice(e.target.value)}
//           />
//         </div>
//         <div>
//           <label htmlFor="imageURL">Image Link:</label>
//           <input
//             type="text"
//             id="imgURL"
//             value={imgURL}
//             onChange={(e) => setImgURL(e.target.value)}
//           />
//         </div>
//         <button type="submit">Create New House</button>
//       </form>
//     </div>
//   );
// };

// export default CreateHouse;
