import { useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine";

const greenMarkerIcon = 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png';
const redMarkerIcon = 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png';
const markerShadow = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png';

const PickupMap = ({ pickupLat, pickupLng, pickupAddress, customerName }) => {
  // ডিফল্ট লোকেশন হিসেবে ঢাকার স্থানাঙ্ক ব্যবহার করা হয়েছে
  const [userCoords, setUserCoords] = useState([23.8103, 90.4125]); 
  const [distanceInfo, setDistanceInfo] = useState({ distance: "0 KM", duration: "0 Mins" });
  const routingEngineRef = useRef(null);
  const mapInstanceRef = useRef(null);

  const destinationCoords = [parseFloat(pickupLat) || 23.8683, parseFloat(pickupLng) || 90.4004];
  const displayName = customerName || "User";

  // ১. লাইভ ট্র্যাকিং লজিক
  useEffect(() => {
    if (navigator.geolocation) {
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          const newCoords = [position.coords.latitude, position.coords.longitude];
          setUserCoords(newCoords);
        },
        (error) => {
          console.error("Location error:", error.message);
          // এরর হলে ডিফল্ট লোকেশনই থাকবে
        },
        { 
          enableHighAccuracy: true, 
          timeout: 30000, // টাইমআউট ৩০ সেকেন্ড করা হয়েছে
          maximumAge: 10000 
        }
      );
      return () => navigator.geolocation.clearWatch(watchId);
    }
  }, []);

  // ২. রুট এবং ম্যাপ আপডেট লজিক
  useEffect(() => {
    if (mapInstanceRef.current && userCoords) {
      if (routingEngineRef.current) {
        routingEngineRef.current.setWaypoints([
          L.latLng(userCoords[0], userCoords[1]),
          L.latLng(destinationCoords[0], destinationCoords[1])
        ]);
      }
    }
  }, [userCoords, destinationCoords]);

  const initializeRouting = (mapInstance) => {
    mapInstanceRef.current = mapInstance;

    const startIcon = L.icon({ iconUrl: greenMarkerIcon, shadowUrl: markerShadow, iconSize: [25, 41], iconAnchor: [12, 41] });
    const endIcon = L.icon({ iconUrl: redMarkerIcon, shadowUrl: markerShadow, iconSize: [25, 41], iconAnchor: [12, 41] });

    routingEngineRef.current = L.Routing.control({
      waypoints: [
        L.latLng(userCoords[0], userCoords[1]),
        L.latLng(destinationCoords[0], destinationCoords[1])
      ],
      lineOptions: { styles: [{ color: "#2563eb", weight: 6, opacity: 0.85 }] },
      addWaypoints: false,
      draggableWaypoints: false,
      fitSelectedRoutes: true,
      show: false,
      createMarker: (i, waypoint) => {
        const marker = L.marker(waypoint.latLng, { icon: i === 0 ? startIcon : endIcon });
        marker.bindTooltip(i === 0 ? "📍 YOU" : `👤 USER: ${displayName}`, {
          permanent: true,
          direction: "top",
          offset: [0, -40],
          className: i === 0 ? "bg-green-600 text-white font-bold text-xs px-2.5 py-1 rounded-md shadow-md border-0" : "bg-red-600 text-white font-bold text-xs px-2.5 py-1 rounded-md shadow-md border-0"
        });
        return marker;
      }
    }).addTo(mapInstance);

    routingEngineRef.current.on("routesfound", (e) => {
      const summary = e.routes[0].summary;
      setDistanceInfo({
        distance: `${(summary.totalDistance / 1000).toFixed(1)} KM`,
        duration: `${Math.round(summary.totalTime / 60)} Mins`
      });
    });
  };

  return (
    <div className="w-full h-full relative">
      <div className="absolute top-4 left-4 z-[1000] bg-white/95 backdrop-blur p-4 rounded-2xl shadow-xl border border-gray-100 min-w-[180px]">
        <h4 className="font-bold text-gray-800 text-xs uppercase tracking-wider mb-2">Trip Overview</h4>
        <div className="space-y-1.5">
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-500">🛣️ Distance:</span>
            <span className="font-bold text-blue-600">{distanceInfo.distance}</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-500">⏱️ Est. Time:</span>
            <span className="font-bold text-green-600">{distanceInfo.duration}</span>
          </div>
        </div>
      </div>

      <MapContainer
        center={userCoords}
        zoom={13}
        style={{ height: "100%", width: "100%" }}
        whenReady={(mapEvent) => initializeRouting(mapEvent.target)}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      </MapContainer>
    </div>
  );
};

export default PickupMap;