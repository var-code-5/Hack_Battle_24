import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

const FinderPage = () => {
  const location = useLocation();
  const { data } = location.state || {};
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const navigate = useNavigate(); // Use navigate for redirection

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

  const handleSubmit = () => {
    if (selectedIds.length === 0) {
      alert("Please select at least one place");
      return;
    }
    localStorage.setItem("place_id", JSON.stringify(selectedIds));
    
    // Redirect to /dashboard after saving data
    navigate("/dashboard");
  };

  // Place interfaces and rest of the code remain the same...
  
  return (
    <div className="w-[100%] py-[10vh] bg-[#e6eff9]">
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
                  src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${place.photos[0].photo_reference}&key=AIzaSyAwIz3TZxczBeuGENL-6ZSeMgPOpLK_zZM`}
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
        <button className="px-2 py-1 bg-blue-500" onClick={handleSubmit}>
          Make My Trip
        </button>
      </div>
    </div>
  );
};

export default FinderPage;
