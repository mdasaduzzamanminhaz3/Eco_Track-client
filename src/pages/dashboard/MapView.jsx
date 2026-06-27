import { useState } from "react";
import { motion } from "framer-motion";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import { Ic } from "../../components/ui/Icons";

//  Custom marker configuration to fix the default marker icon glitch in Leaflet.
const createCustomIcon = (color, isUser = false) => {
  return new L.DivIcon({
    html: `
      <div style="display: flex; flex-direction: column; align-items: center; transform: translate(-50%, -100%);">
        <div style="padding: 2px 8px; border-radius: 6px; font-size: 10px; font-weight: 600; margin-bottom: 3px; background: ${isUser ? color : '#fff'}; color: ${isUser ? '#fff' : color}; border: 1px solid ${color}; white-space: nowrap; box-shadow: 0 2px 4px rgba(0,0,0,0.2);">
          ${isUser ? 'You' : 'Hub'}
        </div>
        <svg width="${isUser ? '28' : '22'}" height="${isUser ? '28' : '22'}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 0 0-8-8z"></path>
          <circle cx="12" cy="10" r="3" fill="${color}"></circle>
        </svg>
      </div>
    `,
    className: "custom-leaflet-icon",
    iconSize: [30, 42],
    iconAnchor: [0, 0]
  });
};

//  A helper component to smoothly change the map's center or focus.
function ChangeView({ center }) {
  const map = useMap();
  map.setView(center, map.getZoom(), { animate: true, duration: 0.8 });
  return null;
}

export function MapView({ theme, dark }) {
  const E = "#10B981";
  
  //Dhaka's actual GPS coordinates have been set for the dummy center.
  const [mapCenter, setMapCenter] = useState([23.7461, 90.3742]); // default: Dhanmondi
  const [zoomLevel, setZoomLevel] = useState(13);

  //Realistic Dhaka Genuine Coordinates Data
  const centers = [
    { n: "GreenCycle Hub", d: "0.8 km", t: "Plastic, Paper", r: 4.8, lat: 23.7461, lng: 90.3742 }, // ধানমন্ডি
    { n: "EcoRecycle Center", d: "1.4 km", t: "Metal, Glass", r: 4.6, lat: 23.7925, lng: 90.4156 }, // গুলশান
    { n: "Nature's Loop", d: "2.1 km", t: "Organic, Plastic", r: 4.9, lat: 23.8069, lng: 90.3687 }, // মিরপুর
    { n: "Urban Green Co.", d: "3.2 km", t: "All types", r: 4.7, lat: 23.8683, lng: 90.4004 }, // উত্তরা
  ];

  // The user's own dummy current location (to display the 'You' pin on the map)
  const userLocation = { lat: 23.7561, lng: 90.3842 }; // Karwanbazar area

  return (
    <div style={{ padding: 28 }}>
      <h1 style={{ fontSize: 24, fontWeight: 700, color: theme.txt, marginBottom: 4 }}>Map</h1>
      <p style={{ fontSize: 13, color: theme.muted, marginBottom: 24 }}>Find verified recyclers near your location.</p>
      
      <div style={{ display: "flex", gap: 16, height: 450 }}>
        {/* Hub list of left side */}
        <div style={{ width: 240, flexShrink: 0, borderRadius: 16, background: theme.card, border: `1px solid ${theme.border}`, display: "flex", flexDirection: "column", overflow: "hidden" }}>
          <div style={{ padding: 12, borderBottom: `1px solid ${theme.border}` }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 10px", borderRadius: 8, background: dark ? "rgba(255,255,255,0.05)" : "#f9fafb" }}>
              <Ic n="search" s={13} c={theme.muted} />
              <input placeholder="Search recyclers…" style={{ background: "transparent", border: "none", outline: "none", fontSize: 12, color: theme.txt, flex: 1 }} />
            </div>
          </div>
          <div style={{ flex: 1, overflow: "auto", padding: 8 }}>
            {centers.map(c => (
              <motion.div 
                key={c.n} 
                style={{ padding: 12, borderRadius: 10, marginBottom: 6, background: dark ? "rgba(255,255,255,0.03)" : "#f9fafb", border: `1px solid ${theme.border}`, cursor: "pointer" }}
                whileHover={{ background: "rgba(16,185,129,0.07)" }}
                onClick={() => {
                  setMapCenter([c.lat, c.lng]);
                  setZoomLevel(14);
                }}
              >
                <div style={{ fontSize: 13, fontWeight: 600, color: theme.txt, marginBottom: 3 }}>{c.n}</div>
                <div style={{ fontSize: 11, color: theme.muted }}>📍 {c.d} · ⭐ {c.r}</div>
                <div style={{ fontSize: 11, color: E, marginTop: 4 }}>{c.t}</div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* realtime active map area on right side */}
        <div style={{ flex: 1, borderRadius: 16, border: `1px solid ${theme.border}`, overflow: "hidden", zIndex: 1, position: "relative" }}>
          <MapContainer 
            center={mapCenter} 
            zoom={zoomLevel} 
            style={{ width: "100%", height: "100%" }}
            zoomControl={false} // default zoom button for clean look
          >
            {/* dark & light mode map screen */}
            <TileLayer
              url={dark 
                ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" 
                : "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
              }
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            
            {/* Map View Tracking Update Component */}
            <ChangeView center={mapCenter} />

            {/*User's current location marker */}
            <Marker position={[userLocation.lat, userLocation.lng]} icon={createCustomIcon(E, true)}>
              <Popup><span style={{ fontWeight: 600 }}>You are here</span></Popup>
            </Marker>

            {/* Recycling hub markers*/}
            {centers.map(c => (
              <Marker key={c.n} position={[c.lat, c.lng]} icon={createCustomIcon("#3B82F6", false)}>
                <Popup>
                  <div style={{ fontFamily: "sans-serif" }}>
                    <strong style={{ color: "#3B82F6" }}>{c.n}</strong><br />
                    <span style={{ fontSize: 11, color: "#555" }}>Accepts: {c.t}</span>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>
    </div>
  );
}