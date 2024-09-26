import React from "react";
import { Link } from "react-router-dom";

// Define the Place type
interface Place {
  place_id: string;
  name: string;
  formatted_address: string;
  rating: number;
  photos?: { photo_reference: string }[];
}

// Define props for the PlaceCard component
interface PlaceCardProps {
  place: Place;
  isSelected: boolean;
  handleCheckboxChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => void;
}

const PlaceCard: React.FC<PlaceCardProps> = ({
  place,
  isSelected,
  handleCheckboxChange,
}) => {
  const img = place.photos?.[0]?.photo_reference;
  const name = place.name;
  const address = place.formatted_address;
  const rating = place.rating;
  const id = place.place_id;

  return (
    <div className="mt-6 w-[300px] h-[420px] shadow-sm rounded-2xl p-4 bg-slate-50   border border-slate-100 outline outline-slate-100 hover:shadow-2xl relative">
      <div className="flex flex-col gap-6">
        {/* Image and Preview Button */}
        <div>
          {img && (
            <img
              src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${img}&key=AIzaSyAwIz3TZxczBeuGENL-6ZSeMgPOpLK_zZM`}
              alt={name}
              className="mx-auto w-full h-[200px] object-cover rounded-lg"
            />
          )}
        </div>

        {/* Place Info */}
        <div className="flex flex-col">
          <h2 className="text-base font-medium">{name}</h2>
          <p className="text-sm text-[#101828] ">
            {address.split(",").slice(0, 3).join(", ")}...
          </p>
          <p className="text-sm text-[#101828]">
            Rating: {rating}
          </p>
        </div>

        {/* Checkbox */}
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 selectplace">
            <input
              type="checkbox"
              checked={isSelected}
              onChange={(e) => handleCheckboxChange(e, id)}
            />
            <span>Select</span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default PlaceCard;

