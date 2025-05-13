// pages/ProfilePage.jsx
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import profilesData from "../data/profiles.json";

const ProfilePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Convert ID to number for exact match
  const profile = profilesData.find((p) => p.id === parseInt(id));

  if (!profile) return <div className="text-center p-6 text-red-500 font-semibold">Profile not found. Please try again.</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg space-y-6">
      <button
        onClick={() => navigate(-1)}
        className="text-blue-500 hover:text-blue-700 transition-all duration-300 mb-6"
      >
        ← Back to Profiles
      </button>

      <div className="flex flex-col md:flex-row items-center md:space-x-8">
        {/* Profile Image */}
        <img
          src={profile.photo}
          alt={profile.name}
          className="w-48 h-48 object-cover rounded-full border-4 border-blue-300 shadow-xl mb-4 md:mb-0"
        />

        <div className="space-y-4">
          {/* Profile Information */}
          <h2 className="text-4xl font-bold text-gray-900">{profile.name}</h2>
          <p className="text-lg text-gray-700">{profile.description}</p>
          <div className="space-y-2 text-gray-600">
            <p><strong>Address:</strong> {profile.address}</p>
            <p><strong>Email:</strong> <a href={`mailto:${profile.email}`} className="text-blue-500">{profile.email}</a></p>
            <p><strong>Interests:</strong> {profile.interests}</p>
          </div>
        </div>
      </div>

      {/* Profile Summary Section */}
      <div className="mt-8">
        <h3 className="text-2xl font-semibold text-gray-800">Profile Summary</h3>
        <p className="text-gray-600 mt-2">
          This profile provides an overview of {profile.name}, including professional background, contact details, and personal interests.
        </p>
      </div>
    </div>
  );
};

export default ProfilePage;
