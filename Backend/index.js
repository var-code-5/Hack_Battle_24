import axios from 'axios';
import env from 'dotenv';

env.config();

const locationQuery = 'tourist attractions in Kolkata';
const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(locationQuery)}&key=${process.env.GOOGLE_PLACES_API_KEY}`;

axios.get(url)
  .then(response => {
    // console.log('Tourist Places Response:', JSON.stringify(response.data, null, 2));
    // response.data.results.forEach(place => {
    //   console.log(`Name: ${place.name}, Address: ${place.formatted_address}, Rating: ${place.rating || 'N/A'}`);
    // });
    response.data.results.forEach(element => {
      console.log(`${element.name}: ${element.photos}`)
    })})
  .catch(error => {
    console.error('Error fetching tourist places:', error.message);
  });
