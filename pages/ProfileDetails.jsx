import React from 'react';
import { useParams } from 'react-router-dom';
import profilesData from '../data/profiles.json';
import MapView from '../components/MapView';

const ProfileDetails = () => {
  const { id } = useParams();
  const profile = profilesData.find(p => p.id === parseInt(id));
  const [showMap, setShowMap] = React.useState(false);

  if (!profile) return <div>Profile not found</div>;

  return (
    <div className="p-6 max-w-screen-xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <img
              src={profile.image}
              alt={profile.name}
              className="w-full h-64 object-cover rounded-lg"
            />
          </div>
          <div className="md:col-span-2">
            <h1 className="text-3xl font-bold mb-4">{profile.name}</h1>
            <p className="text-gray-600 mb-4">{profile.description}</p>
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2">Contact Information</h3>
              <p className="text-gray-600">📧 {profile.email}</p>
              <p className="text-gray-600">📍 {profile.address}</p>
            </div>
            <button
              onClick={() => setShowMap(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              View Full Location
            </button>
          </div>
        </div>
      </div>

      <MapView
        address={profile.address}
        isOpen={showMap}
        closeModal={() => setShowMap(false)}
      />
    </div>
  );
};

export default ProfileDetails;