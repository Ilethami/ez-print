import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./Map.css";
import { useState, useEffect } from "react";
import { Icon } from "leaflet";
import locationIcon from "../assets/location.png";

export default function ClientMap() {
  // Users Location State
  const [userPos, setUserPos] = useState([7.072, 125.607]);

  useEffect(() => {
    const watchId = navigator.geolocation.watchPosition((pos) => {
      setUserPos([pos.coords.latitude, pos.coords.longitude]);
    });

    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  const ViewPos = () => {
    const map = useMap();
    useEffect(() => {
      setTimeout(() => {
        map.setMaxBounds([
          [-90, -180],
          [90, 180],
        ]);
        map.setView(userPos);
        map.invalidateSize();
      }, 100);
    }, [userPos, map]);
    return null;
  };

  const userIcon = new Icon({
    iconUrl: locationIcon,
    iconSize: [25, 25],
  });

  return (
    <div className="map">
      <MapContainer
        center={userPos}
        zoom={16}
        scrollWheelZoom={true}
        maxZoom={18}
        minZoom={3}
        preferCanvas={true}
        maxBoundsViscosity={1}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://api.maptiler.com/maps/base-v4/{z}/{x}/{y}.png?key=lJtFOqKozfrpRPHc7tbo"
          keepBuffer={4}
        />
        <ViewPos />

        {/* User's Marker */}
        <Marker position={userPos} icon={userIcon}>
          <Popup>You are here</Popup>
        </Marker>
        {/* Vendor Marker */}
      </MapContainer>
    </div>
  );
}
