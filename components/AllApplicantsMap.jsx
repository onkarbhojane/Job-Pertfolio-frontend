import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const FitBounds = ({ locations }) => {
  const map = useMap();

  useEffect(() => {
    if (locations.length > 0) {
      const bounds = L.latLngBounds(locations.map((loc) => [loc.lat, loc.lng]));
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [locations, map]);

  return null;
};

const createProfileCardIcon = (profile) =>
  L.divIcon({
    className: "custom-marker", // Tailwind or custom class
    html: `
      <div style="
        background: white;
        border-radius: 12px;
        padding: 8px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.2);
        width: 180px;
        text-align: center;
        font-size: 14px;
      ">
        <img src="${profile.photo}" alt="${profile.name}" style="width: 40px; height: 40px; border-radius: 50%; object-fit: cover;"/>
        <div><strong>${profile.name}</strong></div>
        <div style="font-size: 12px; color: #555;">${profile.address}</div>
        <a href="/profile/${profile.id}" style="font-size: 12px; color: #555; font-style: italic; margin-top: 4px" >View Profile</a>
      </div>
    `,
    iconSize: [180, 60],
    iconAnchor: [90, 60], // Centered
  });

const AllApplicantsMap = ({ profiles }) => {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const fetchAllCoords = async () => {
      const coordsPromises = profiles.map(async (profile) => {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
            profile.address
          )}`
        );
        const data = await res.json();
        if (data && data.length > 0) {
          return {
            id: profile.id,
            name: profile.name,
            lat: parseFloat(data[0].lat),
            lng: parseFloat(data[0].lon),
            address: profile.address,
            photo: profile.photo,
          };
        }
        return null;
      });

      const results = await Promise.all(coordsPromises);
      setLocations(results.filter((item) => item !== null));
    };

    if (profiles.length > 0) {
      fetchAllCoords();
    }
  }, [profiles]);

  return (
    <div className="w-full h-96">
      {locations.length > 0 ? (
        <MapContainer
          center={[locations[0].lat, locations[0].lng]}
          zoom={5}
          style={{ height: "100%", width: "100%" }}
        >
          <FitBounds locations={locations} />
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
          />
          {locations.map((loc) => (
            <Marker
              key={loc.id}
              position={[loc.lat, loc.lng]}
              icon={createProfileCardIcon(loc)}
            />
          ))}
        </MapContainer>
      ) : (
        <div className="text-center text-lg text-gray-700">Loading map...</div>
      )}
    </div>
  );
};

export default AllApplicantsMap;
