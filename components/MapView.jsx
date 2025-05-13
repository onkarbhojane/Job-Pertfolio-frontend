// components/MapView.jsx
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

Modal.setAppElement("#root");

// Force map to resize correctly inside modal
const ResizeMap = () => {
  const map = useMap();
  useEffect(() => {
    setTimeout(() => map.invalidateSize(), 300);
  }, [map]);
  return null;
};

// Custom icon
const customIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const MapView = ({ address, isOpen, closeModal }) => {
  const [coords, setCoords] = useState(null);

  useEffect(() => {
    const fetchCoords = async () => {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          address
        )}`
      );
      const data = await res.json();
      if (data && data.length > 0) {
        setCoords({
          lat: parseFloat(data[0].lat),
          lng: parseFloat(data[0].lon),
        });
      }
    };
    if (address) fetchCoords();
  }, [address]);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Map View"
      className="w-full sm:w-2/3 md:w-1/2 h-[26rem] relative p-0 border-0 overflow-hidden backdrop-blur-md rounded-lg"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      style={{
        content: {
          background: "transparent", // 🟢 Remove white background
          border: "none",
          padding: 0,
          inset: "unset", // Disable default centering
        },
      }}
    >
      <button
        onClick={closeModal}
        className="absolute top-3 right-3 z-10 text-white bg-black bg-opacity-50 px-2 py-1 rounded"
      >
        ✖
      </button>

      {coords ? (
        <div className="w-full h-full rounded-lg overflow-hidden">
          <MapContainer
            center={[coords.lat, coords.lng]}
            zoom={14}
            style={{ height: "100%", width: "100%" }}
          >
            <ResizeMap />
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; OpenStreetMap contributors"
            />
            <Marker position={[coords.lat, coords.lng]} icon={customIcon}>
              <Popup>{address}</Popup>
            </Marker>
          </MapContainer>
        </div>
      ) : (
        <div className="text-white text-center w-full h-full flex items-center justify-center bg-black bg-opacity-60">
          Loading map...
        </div>
      )}
    </Modal>
  );
};

export default MapView;
