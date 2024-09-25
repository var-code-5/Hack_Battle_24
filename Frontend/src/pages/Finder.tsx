import { useLocation } from "react-router-dom";
import { useState } from "react";

const FinderPage = () => {
  const location = useLocation();
  const { data } = location.state || {};
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const handleCheckboxChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    setSelectedIds((prev) => {
      if (e.target.checked) {
        return [...prev, id];
      } else {
        return prev.filter((item) => item !== id);
      }
    });
  };

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
    photos: Photo[];
    place_id: string;
    plus_code?: PlusCode;
    rating: number;
    reference: string;
    types: string[];
    user_ratings_total: number;
  }

  return (
    <div className="w-[100vw] py-[10vh] bg-[#e6eff9]">
      <div className="my-[10vh] mx-[10vw] bg-white p-5 rounded-lg shadow-md">
        <h1 className="font-raleway text-2xl mb-4">
          Select the places you want to visit
        </h1>

        {data && Array.isArray(data) ? (
          data.map((place: Place) => (
            <div
              key={place.place_id}
              className="mb-4 p-4 border border-gray-300 rounded-lg shadow-sm"
            >
              <h2 className="font-semibold text-lg">{place.name}</h2>
              <p>Address: {place.formatted_address}</p>
              <p>
                Rating: {place.rating} ({place.user_ratings_total} reviews)
              </p>
              <p>Status: {place.business_status}</p>
              {place.photos && place.photos.length > 0 && (
                <img
                  src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${place.photos[0].photo_reference}&key=`}
                  alt={place.name}
                  className="mt-2 mb-2 rounded"
                />
              )}
              <input
                type="checkbox"
                id={place.place_id}
                checked={selectedIds.includes(place.place_id)}
                onChange={(e) => handleCheckboxChange(e, place.place_id)}
              />
              <label htmlFor={place.place_id}>{place.name}</label>
            </div>
          ))
        ) : (
          <p>No data available.</p>
        )}
        <div className="mt-8 p-4 border border-gray-300 rounded-lg shadow-sm">
          <h2 className="font-semibold text-lg">Selected Places:</h2>
          {selectedIds.length > 0 ? (
            <ul>
              {selectedIds.map((id) => {
                const selectedPlace = data.find((place: Place) => place.place_id === id);
                return (
                  <li key={id}>
                    {selectedPlace ? selectedPlace.name : "Unknown Place"}
                  </li>
                );
              })}
            </ul>
          ) : (
            <p>No places selected.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FinderPage;
