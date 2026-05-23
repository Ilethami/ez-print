import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";
import { useState, useEffect } from "react";
import { Icon } from "leaflet";

import vendorIcon from "../assets/location.png";
import userIcon from "../assets/user.png";

export default function VendorMap({
  vendors = [],
  setSelectedVendor = () => {},
  center,
  setCenter = () => {},
  setHasLocation = () => {},
}) {
  const [userCoords, setUserCoords] = useState(null);

  // =========================
  // USER LOCATION
  // =========================
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const coords = [pos.coords.latitude, pos.coords.longitude];

        setUserCoords(coords);
        setCenter(coords);
        setHasLocation(true);
      },
      (err) => console.error(err),
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      },
    );
  }, []);

  // =========================
  // AUTO CENTER CONTROL
  // =========================
  function ViewPos({ coords }) {
    const map = useMap();

    useEffect(() => {
      if (!coords) return;

      map.flyTo(coords, 17, {
        animate: true,
      });
    }, [coords, map]);

    return null;
  }

  // =========================
  // ICONS
  // =========================
  const venIcon = new Icon({
    iconUrl: vendorIcon,
    iconSize: [25, 25],
  });

  const usrIcon = new Icon({
    iconUrl: userIcon,
    iconSize: [30, 30],
  });

  return (
    <div className="w-full h-full">
      <MapContainer
        center={center}
        zoom={17}
        scrollWheelZoom={true}
        className="w-full h-full"
      >
        {/* TILE LAYER */}
        <TileLayer
          attribution="&copy; OpenStreetMap"
          url="https://api.maptiler.com/maps/base-v4/{z}/{x}/{y}.png?key=lJtFOqKozfrpRPHc7tbo"
        />

        {/* THIS NOW FOLLOWS CLICKED VENDOR OR USER */}
        <ViewPos coords={center} />

        {/* USER MARKER */}
        {userCoords && (
          <Marker position={userCoords} icon={usrIcon}>
            <Popup>Your Location</Popup>
          </Marker>
        )}

        {/* VENDOR MARKERS */}
        {vendors.map((vendor) => (
          <Marker
            key={vendor.id}
            position={[vendor.latitude, vendor.longitude]}
            icon={venIcon}
            eventHandlers={{
              click: () => {
                setSelectedVendor(vendor);
                setCenter([vendor.latitude, vendor.longitude]);
              },
            }}
          >
            <Popup>
              <b>{vendor.brand}</b>
              <br />
              Status: {vendor.availability}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
