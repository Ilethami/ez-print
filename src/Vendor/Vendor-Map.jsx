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
  const [isReady, setIsReady] = useState(false);

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
        setIsReady(true);
      },
      (err) => {
        console.error("Geolocation error:", err);

        const fallback = [7.0731, 125.6128];

        setUserCoords(fallback);
        setCenter(fallback);
        setHasLocation(false);
        setIsReady(true);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      },
    );
  }, []);

  // =========================
  // AUTO FLY TO CENTER
  // =========================
  function ViewPos({ coords }) {
    const map = useMap();

    useEffect(() => {
      if (!coords || coords[0] == null || coords[1] == null) return;

      map.flyTo(coords, 17, {
        animate: true,
      });
    }, [coords, map]);

    return null;
  }

  // =========================
  // 📍 GO TO MY LOCATION BUTTON
  // =========================
  function GoToMyLocationButton() {
    const map = useMap();

    const goToMyLocation = () => {
      if (!userCoords) return;

      map.flyTo(userCoords, 17, {
        animate: true,
      });

      setCenter(userCoords);
    };

    return (
      <div className="leaflet-top leaflet-right mt-3 mr-3">
        <div className="leaflet-control leaflet-bar bg-white shadow rounded  ">
          <button
            onClick={goToMyLocation}
            className="
    px-[10px] py-[8px]
    cursor-pointer
    bg-white
    border-none
    font-bold
    hover:bg-gray-200
    transition
    rounded
  "
          >
            📍 My Location
          </button>
        </div>
      </div>
    );
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

  // =========================
  // LOADING STATE
  // =========================
  if (!isReady || !center) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        Loading map...
      </div>
    );
  }

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

        {/* AUTO CENTER */}
        <ViewPos coords={center} />

        {/* 📍 BUTTON */}
        <GoToMyLocationButton />

        {/* USER MARKER */}
        {userCoords && (
          <Marker position={userCoords} icon={usrIcon}>
            <Popup>Your Location</Popup>
          </Marker>
        )}

        {/* VENDOR MARKERS */}
        {vendors
          .filter((v) => v.latitude != null && v.longitude != null)
          .map((vendor) => (
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
                <b>{vendor.brand || vendor.name}</b>
                <br />
                Status: {vendor.availability || vendor.status}
              </Popup>
            </Marker>
          ))}
      </MapContainer>
    </div>
  );
}
