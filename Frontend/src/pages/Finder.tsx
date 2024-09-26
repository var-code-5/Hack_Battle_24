import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import PlaceCard from "../components/PlaceCard";
import Header from "../components/Header";

// Define the Place interface for the places data
interface Place {
  place_id: string;
  name: string;
  formatted_address: string;
  rating: number;
  photos?: { photo_reference: string }[];
}

const FinderPage: React.FC = () => {
  const location = useLocation();
  const { data }: { data: Place[] } = location.state || { data: [] }; // Assuming data contains places
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

  return (
    <div className="relative w-[100%] py-[10vh] bg-[#e6eff9]">
      <Header />
      <h1
        className="absolute left-48 top-28 font-raleway text-2xl mb-4"
        style={{
          backgroundImage: "linear-gradient(to left, #010101, #5755ff)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        Where do you want to go?
      </h1>

      <div className="flex flex-col flex-wrap my-[12vh] mx-[10vw] bg-white p-5 rounded-lg shadow-md">
        {/* Render Place Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data && Array.isArray(data) ? (
            data.map((place) => (
              <PlaceCard
                key={place.place_id}
                place={place}
                isSelected={selectedIds.includes(place.place_id)}
                handleCheckboxChange={handleCheckboxChange}
              />
            ))
          ) : (
            <p>No places available.</p>
          )}
        </div>

        {/* Display selected places */}
        <div className="mt-8 p-4 border border-gray-300 rounded-lg shadow-sm">
          <h2 className="font-semibold text-lg">Selected Places:</h2>
          {selectedIds.length > 0 ? (
            <ul>
              {selectedIds.map((id) => {
                const selectedPlace = data.find(
                  (place) => place.place_id === id
                );
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

        {/* Submit button */}
        <button
          className="px-4 py-2 mt-4 bg-blue-500 text-white rounded hover:bg-blue-600 transition-all duration-300"
          onClick={handleSubmit}
        >
          Make My Trip
        </button>
      </div>
    </div>
  );
};

export default FinderPage;
