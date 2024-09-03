

import React, { useState } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const LeafletMap = ({ onSelectLocation }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);

  const handleSearchChange = async (e) => {
    const query = e.target.value;
    setSearchTerm(query);

    if (query.length > 2) {
      try {
        const response = await axios.get('https://api.geoapify.com/v1/geocode/autocomplete', {
          params: {
            text: query,
            apiKey: '69ca43b54d3f46ceb36eed2fe9b6ab38',
          },
        });
        setSuggestions(response.data.features);
      } catch (error) {
        console.error('Error fetching location suggestions:', error);
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleSelectLocation = (location) => {
    const { properties } = location;
    const { lat, lon, formatted } = properties;
    setSelectedLocation({ lat, lon, name: formatted });
    setSearchTerm(formatted);
    setSuggestions([]);
    onSelectLocation({ name: formatted, latitude: lat, longitude: lon });
  };

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Search location"
        className="w-full px-4 py-2 border border-gray-300 rounded"
      />
      <ul className="bg-white border border-gray-300 rounded mt-2">
        {suggestions.map((suggestion) => (
          <li
            key={suggestion.properties.place_id}
            className="p-2 cursor-pointer hover:bg-gray-200"
            onClick={() => handleSelectLocation(suggestion)}
          >
            {suggestion.properties.formatted}
          </li>
        ))}
      </ul>

      {selectedLocation && (
        <MapContainer center={[selectedLocation.lat, selectedLocation.lon]} zoom={13} style={{ height: "300px", width: "100%" }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <DraggableMarker
            position={[selectedLocation.lat, selectedLocation.lon]}
            onLocationChange={onSelectLocation}
          />
          
        </MapContainer>
      )}
    </div>
  );
};

// Component for draggable marker
const DraggableMarker = ({ position, onLocationChange }) => {
  const [markerPosition, setMarkerPosition] = useState(position);

  const map = useMap();

  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      setMarkerPosition([lat, lng]);
      onLocationChange({ name: 'Custom Location', latitude: lat, longitude: lng });
    },
  });

  return (
    <Marker
      position={markerPosition}
      draggable
      eventHandlers={{
        dragend(e) {
          const { lat, lng } = e.target.getLatLng();
          setMarkerPosition([lat, lng]);
          onLocationChange({ name: 'Custom Location', latitude: lat, longitude: lng });
        },
      }}
    >
      <Popup>Drag me to select the exact location</Popup>
    </Marker>
  );
};

export default LeafletMap;
