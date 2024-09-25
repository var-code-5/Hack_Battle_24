import { useLocation } from 'react-router-dom';

const FinderPage = () => {
  const location = useLocation();
  const { data } = location.state || {}; // Extract the data from state

  interface Geometry {
    location: {
      lat: number;
      lng: number;
    };
    viewport: {
      northeast: {
        lat: number;
        lng: number;
      };
      southwest: {
        lat: number;
        lng: number;
      };
    };
  }

  interface OpeningHours {
    open_now: boolean;
    weekday_text: string[];
  }

  interface Photo {
    height: number;
    html_attributions: string[];
    width: number;
    photo_reference: string;
  }

  interface PlusCode {
    compound_code: string;
    global_code: string;
  }

  interface Place {
    business_status: string;
    formatted_address: string;
    geometry: Geometry;
    icon: string;
    icon_background_color: string;
    icon_mask_base_uri: string;
    name: string;
    opening_hours?: OpeningHours;
    photos: Photo[]; // Keep this as an array
    place_id: string;
    plus_code?: PlusCode;
    rating: number;
    reference: string;
    types: string[];
    user_ratings_total: number;
  }
  
  return (
    <div className='w-[100vw] py-[10vh] bg-[#e6eff9]'>
      <div className='my-[10vh] mx-[10vw]  bg-white p-5 rounded-lg shadow-md'>
        <h1 className='font-raleway text-2xl mb-4'>Select the places you want to visit</h1>
        
        {data && Array.isArray(data) ? (
          data.map((place: Place, index: number) => (
            <div key={index} className='mb-4 p-4 border border-gray-300 rounded-lg shadow-sm'>
              <h2 className='font-semibold text-lg'>{place.name}</h2>
              <p>Address: {place.formatted_address}</p>
              <p>Rating: {place.rating} ({place.user_ratings_total} reviews)</p>
              <p>Status: {place.business_status}</p>
              {place.photos && place.photos.length > 0 && (
                <img
                  src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${place.photos[0].photo_reference}&key=placeyourkeyhere}`}
                  alt={place.name}
                  className='mt-2 mb-2 rounded'
                />
              )}
            </div>
          ))
        ) : (
          <p>No data available.</p>
        )}
      </div>
    </div>
  );
};

export default FinderPage;
