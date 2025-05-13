// components/ProfileCard.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const ProfileCard = ({ profile, onSummaryClick }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded shadow p-4">
      <img
        src={profile.photo}
        alt={profile.name}
        className="w-full h-40 object-cover rounded"
      />
      <h3 className="text-xl font-semibold mt-2">{profile.name}</h3>
      <p className="text-gray-600">{profile.description}</p>
      <div className="mt-4 flex justify-between">
        <button
          className="text-blue-500 hover:underline"
          onClick={() => navigate(`/profile/${profile.id}`)}
        >
          View Details
        </button>
        <button
          className="bg-blue-500 text-white px-2 py-1 rounded"
          onClick={onSummaryClick}
        >
          Summary
        </button>
      </div>
    </div>
  );
};

export default ProfileCard;