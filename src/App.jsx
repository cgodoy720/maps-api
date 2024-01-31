import React, { useEffect, useState } from 'react';
import axios from 'axios';
import GoogleMapsComponent from './GoogleMap';



const API_KEY = import.meta.env.VITE_API_KEY;

function App() {
  const [places, setPlaces] = useState([]);
  const [search, setSearch] = useState("restaurant")

  // Make call to proxy server
  const endpoint = 'http://localhost:3001/places';

  const handleSearch = (type) => {
    setSearch(type)

    axios.get(endpoint, {
      params: {
        key: API_KEY,
        location: '40.712776,-74.005974', // Example: '40.712776,-74.005974'
        radius: '5000', // Example: Search within a 5km radius
        type: search // Example: Search for restaurants
      }
    })
    .then(response => {
      // Handle successful response
      console.log(response.data);
      setPlaces(response.data.results);
    })
    .catch(error => {
      // Handle error
      console.error('Error fetching nearby places:', error);
      console.error('Error response data:', error.response.data);
    });
  }

  useEffect(() => {
    handleSearch()
  }, []);

  return (
    <div>
      <h1>Nearby Places</h1>
      {/* <ul>
        {places.map((place, index) => (
          <li key={index}>{place.name}</li>
        ))}
      </ul> */}

      <div className="button-panel">
        <button onClick={() => handleSearch('restaurant')}>Restaurants</button>
        <button onClick={() => handleSearch('lodging')}>Lodging</button>
        <button onClick={() => handleSearch('shopping_mall')}>Shopping</button>
        <button onClick={() => handleSearch('movie_theater')}>Entertainment</button>
        <button onClick={() => handleSearch('hospital')}>Healthcare</button>
        <button onClick={() => handleSearch('airport')}>Transportation</button>
        <button onClick={() => handleSearch('park')}>Outdoor</button>
        <button onClick={() => handleSearch('bank')}>Services</button>
      </div>

      <GoogleMapsComponent places={places}/>

    </div>
  );
}

export default App;
