import axios from 'axios';
import env from 'dotenv';

env.config();

const locationQuery = 'tourist attractions in Kolkata';
const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(locationQuery)}&key=${process.env.GOOGLE_PLACES_API_KEY}`;

axios.get(url)
  .then(response => {
    response.data.results.forEach(place => {
      console.log(`Name: ${place.name}`);
      
      // Check if the place has photos
      if (place.photos && place.photos.length > 0) {
        place.photos.forEach(photo => {
          const photoReference = photo.photo_reference;
          const photoUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoReference}&key=${process.env.GOOGLE_PLACES_API_KEY}`;
          console.log(`Photo URL: ${photoUrl}`);
        });
      } else {
        console.log('No photos available for this place');
      }
      
      console.log('----------------------------');
    });
  })
  .catch(error => {
    console.error('Error fetching tourist places:', error.message);
  });
