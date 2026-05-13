import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "../styles/leaflet-map.css";
import { useState, useEffect } from "react";
import { Icon } from "leaflet";
import vendorIcon from "../assets/location.png";
import userIcon from "../assets/user.png";

export default function VendorMap({
  setSelectedVendor,
  center,
  setCenter,
  setHasLocation,
}) {
  const [userCoords, setUserCoords] = useState([77.0, 0.0]);
  const [vendors, setVendors] = useState([]);

  useEffect(() => {
    // 👇 Get user location (with fallback)
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const coords = [pos.coords.latitude, pos.coords.longitude];
        setUserCoords(coords);
        setCenter(coords);
        setHasLocation(true);
      },
      (err) => console.error(err),
    );
    // 👇 Fetch vendors (
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
        console.error("Failed to fetch vendors:", err);
      }
    }

    getVendors();
  }, []);

  // 👇 auto center map when coords change
  const ViewPos = () => {
    const map = useMap();

    useEffect(() => {
      if (!center || center.length !== 2) return;

      map.setView(center);
    }, [center, map]);

    return null;
  };
  const View = (setSelectedVendor) => {};

  const venIcon = new Icon({
    iconUrl: vendorIcon,
    iconSize: [25, 25],
  });
  const usrIcon = new Icon({
    iconUrl: userIcon,
    iconSize: [30, 30],
  });

  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  return (
    <div className="map">
      <MapContainer
        center={center}
        zoom={17}
        scrollWheelZoom={true}
        maxZoom={18}
        minZoom={8}
        maxBoundsViscosity={1}
        zoomControl={false}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://api.maptiler.com/maps/base-v4/{z}/{x}/{y}.png?key=lJtFOqKozfrpRPHc7tbo"
        />

        <ViewPos />
        <Marker
          position={userCoords}
          icon={usrIcon}
          zIndexOffset={1000}
        >
          <Popup>
            <b>Your Location</b>
            {}
            <br />
            Latitude: {userCoords[0].toFixed(2)}
            <br />
            Longitude: {userCoords[1].toFixed(2)}
          </Popup>
        </Marker>

        {/* 👇 markers from backend aka existing vendors */}
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
              <br />
              Lat: {vendor.latitude.toFixed(2)}
              <br />
              Lng: {vendor.longitude.toFixed(2)}
              <br />
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
