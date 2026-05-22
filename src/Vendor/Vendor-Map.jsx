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
  setSelectedVendor = () => {},
  center = [7.0731, 125.6128],
  setCenter = () => {},
  setHasLocation = () => {},
}) {
  const [userCoords, setUserCoords] = useState(null);
  const [vendors, setVendors] = useState([]);

  // GET USER LOCATION + VENDORS
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
        enableHighAccuracy: true, // 👈 important
        timeout: 10000,
        maximumAge: 0,
      },
    );

    async function getVendors() {
      try {
        const res = await fetch(
          "http://localhost:3001/order/listvendors",
        );

        const vendors_res = await res.json();

        const formatted = vendors_res
          .map((vendor) => ({
            ...vendor,
            id: vendor.pub_id,
            latitude: parseFloat(vendor.lat),
            longitude: parseFloat(vendor.long),
          }))
          .filter((v) => !isNaN(v.latitude) && !isNaN(v.longitude));

        setVendors(formatted);
      } catch (err) {
        console.error(err);
      }
    }

    getVendors();
  }, []);

  // ✅ PROPER AUTO CENTER (FIX)
  function ViewPos({ coords }) {
    const map = useMap();

    useEffect(() => {
      if (!coords) return;

      map.setView(coords, 17, {
        animate: true,
      });
    }, [coords, map]);

    return null;
  }

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
        maxZoom={18}
        minZoom={8}
        maxBoundsViscosity={1}
        zoomControl={false}
        className="w-full h-full overflow-hidden border border-[#ddd]"
      >
        {/* TILE LAYER */}
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://api.maptiler.com/maps/base-v4/{z}/{x}/{y}.png?key=lJtFOqKozfrpRPHc7tbo"
        />

        {/* AUTO CENTER ON USER */}
        <ViewPos coords={userCoords} />

        {/* USER MARKER */}
        {userCoords && (
          <Marker position={userCoords} icon={usrIcon}>
            <Popup>
              <b>Your Location</b>
              <br />
              Lat: {userCoords[0].toFixed(4)}
              <br />
              Lng: {userCoords[1].toFixed(4)}
            </Popup>
          </Marker>
        )}

        {/* VENDORS */}
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
