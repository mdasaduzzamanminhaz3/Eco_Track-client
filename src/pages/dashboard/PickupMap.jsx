// import React, { useEffect, useState, useRef } from "react";
// import { MapContainer, TileLayer } from "react-leaflet";
// import L from "leaflet";
// import "leaflet/dist/leaflet.css";
// import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
// import "leaflet-routing-machine";

// const greenMarkerIcon = 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png';
// const redMarkerIcon = 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png';
// const markerShadow = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png';

// const PickupMap = ({ pickupLat, pickupLng, pickupAddress, customerName }) => {
//   const [userCoords, setUserCoords] = useState(null);
//   const [distanceInfo, setDistanceInfo] = useState({ distance: "Calculating...", duration: "Calculating..." });
//   const routingEngineRef = useRef(null);

//   const destinationCoords = [parseFloat(pickupLat) || 23.8683, parseFloat(pickupLng) || 90.4004];
//   // নাম পাস না হলে ডিফল্ট 'User' দেখাবে
//   const displayName = customerName || "User"; 

//   useEffect(() => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           setUserCoords([position.coords.latitude, position.coords.longitude]);
//         },
//         (error) => {
//           console.log("GPS access denied, using simulated starting point.");
//           setUserCoords([23.8479, 90.3980]); // ফলব্যাক (যেমন: এয়ারপোর্ট এলাকা)
//         },
//         { enableHighAccuracy: true, timeout: 5000 }
//       );
//     } else {
//       setUserCoords([23.8479, 90.3980]);
//     }
//   }, []);

//   const initializeRouting = (mapInstance) => {
//     if (!userCoords || !mapInstance) return;

//     if (routingEngineRef.current) {
//       mapInstance.removeControl(routingEngineRef.current);
//     }

//     const startIcon = L.icon({
//       iconUrl: greenMarkerIcon,
//       shadowUrl: markerShadow,
//       iconSize: [25, 41],
//       iconAnchor: [12, 41],
//     });

//     const endIcon = L.icon({
//       iconUrl: redMarkerIcon,
//       shadowUrl: markerShadow,
//       iconSize: [25, 41],
//       iconAnchor: [12, 41],
//     });

//     // রুট কন্ট্রোল ইঞ্জিন
//     routingEngineRef.current = L.Routing.control({
//       waypoints: [
//         L.latLng(userCoords[0], userCoords[1]),
//         L.latLng(destinationCoords[0], destinationCoords[1])
//       ],
//       lineOptions: {
//         styles: [{ color: "#2563eb", weight: 6, opacity: 0.85 }],
//         extendToWaypoints: true,
//         missingSelectedRoutesByDef: false
//       },
//       addWaypoints: false,
//       draggableWaypoints: false,
//       fitSelectedRoutes: true,
//       show: false,

//       // পিন পয়েন্ট এবং স্থায়ী লেবেল (Tooltip) তৈরি করার মেইন লজিক
//       createMarker: function(i, waypoint, n) {
//         if (i === 0) {
//           const marker = L.marker(waypoint.latLng, { icon: startIcon });
//           // ক্লিক করা ছাড়াই স্থায়ীভাবে উপরে লেখা থাকবে (Permanent Tooltip)
//           marker.bindTooltip("📍 YOU", {
//             permanent: true,
//             direction: "top",
//             offset: [0, -40],
//             className: "bg-green-600 text-white font-bold text-xs px-2.5 py-1 rounded-md shadow-md border-0"
//           });
//           return marker;
//         } else if (i === n - 1) {
//           const marker = L.marker(waypoint.latLng, { icon: endIcon });
//           // ইউজারের নামের স্থায়ী লেবেল
//           marker.bindTooltip(`👤 USER: ${displayName}`, {
//             permanent: true,
//             direction: "top",
//             offset: [0, -40],
//             className: "bg-red-600 text-white font-bold text-xs px-2.5 py-1 rounded-md shadow-md border-0"
//           });
//           return marker;
//         }
//         return null;
//       }
//     }).addTo(mapInstance);

//     // দূরত্ব ও সময় ট্র্যাকিং ইভেন্ট
//     routingEngineRef.current.on("routesfound", function(e) {
//       const routes = e.routes;
//       if (routes && routes[0]) {
//         const summary = routes[0].summary;
//         const distanceKm = (summary.totalDistance / 1000).toFixed(1);
//         const durationMin = Math.round(summary.totalTime / 60);

//         setDistanceInfo({
//           distance: `${distanceKm} KM`,
//           duration: `${durationMin} Mins`
//         });
//       }
//     });
//   };

//   if (!userCoords) {
//     return (
//       <div className="flex flex-col items-center justify-center h-full bg-gray-50 text-gray-500 gap-2">
//         <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
//         <p className="text-sm font-medium">Initializing Map Engine...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="w-full h-full relative">
//       {/* ট্রিপ ওভারলে কার্ড */}
//       <div className="absolute top-4 left-4 z-[1000] bg-white/95 backdrop-blur p-4 rounded-2xl shadow-xl border border-gray-100 min-w-[180px]">
//         <h4 className="font-bold text-gray-800 text-xs uppercase tracking-wider mb-2">Trip Overview</h4>
//         <div className="space-y-1.5">
//           <div className="flex justify-between items-center text-sm">
//             <span className="text-gray-500">🛣️ Distance:</span>
//             <span className="font-bold text-blue-600">{distanceInfo.distance}</span>
//           </div>
//           <div className="flex justify-between items-center text-sm">
//             <span className="text-gray-500">⏱️ Est. Time:</span>
//             <span className="font-bold text-green-600">{distanceInfo.duration}</span>
//           </div>
//         </div>
//       </div>

//       <MapContainer
//         center={userCoords}
//         zoom={13}
//         style={{ height: "100%", width: "100%" }}
//         whenReady={(mapEvent) => {
//           initializeRouting(mapEvent.target);
//         }}
//       >
//         <TileLayer
//           attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         />
//       </MapContainer>
//     </div>
//   );
// };

// export default PickupMap;



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
  const [userCoords, setUserCoords] = useState(null);
  const [distanceInfo, setDistanceInfo] = useState({ distance: "Calculating...", duration: "Calculating..." });
  const routingEngineRef = useRef(null);
  const mapInstanceRef = useRef(null); // ম্যাপ রেফারেন্স রাখার জন্য

  const destinationCoords = [parseFloat(pickupLat) || 23.8683, parseFloat(pickupLng) || 90.4004];
  const displayName = customerName || "User";

  // ১. লাইভ ট্র্যাকিং লজিক (watchPosition)
  useEffect(() => {
    if (navigator.geolocation) {
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          const newCoords = [position.coords.latitude, position.coords.longitude];
          setUserCoords(newCoords);

          // ম্যাপে ইউজার মুভ করলে রুট আপডেট করা
          if (routingEngineRef.current) {
            routingEngineRef.current.setWaypoints([
              L.latLng(newCoords[0], newCoords[1]),
              L.latLng(destinationCoords[0], destinationCoords[1])
            ]);
          }
        },
        (error) => console.log("Tracking error:", error),
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
      );
      return () => navigator.geolocation.clearWatch(watchId);
    }
  }, [destinationCoords]);

  // ২. রুট ইনিশিয়ালাইজেশন
  const initializeRouting = (mapInstance) => {
    mapInstanceRef.current = mapInstance;
    if (!userCoords) return;

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

  if (!userCoords) {
    return (
      <div className="flex flex-col items-center justify-center h-full bg-gray-50 text-gray-500 gap-2">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <p className="text-sm font-medium">Initializing Live Tracking...</p>
      </div>
    );
  }

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