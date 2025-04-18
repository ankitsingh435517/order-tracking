import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix default marker icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
});

const MapView = ({ agentLocation, customerLocation }) => {
  const center = agentLocation || customerLocation || { lat: 0, lng: 0 };

  return (
    <MapContainer
      center={center}
      zoom={13}
      style={{ height: "100%", width: "100%", marginLeft: "60px" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {agentLocation && (
        <Marker position={agentLocation}>
          <Popup>Delivery Agent</Popup>
        </Marker>
      )}

      {customerLocation && (
        <Marker position={customerLocation}>
          <Popup>Customer</Popup>
        </Marker>
      )}
    </MapContainer>
  );
};

export default MapView;
