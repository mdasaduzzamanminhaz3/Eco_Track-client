import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Ic } from "../../components/ui/Icons";
import authApiClient from "../../services/auth-api-client";

export function Pickup({ theme, dark }) {
  const [step, setStep] = useState(1);
  const [cat, setCat] = useState("");
  const [done, setDone] = useState(false);
  const [categories, setCategories] = useState([]); 


  const [formData, setFormData] = useState({
    weight: "",
    notes: "",
    location: "",
    lat: "4", // default value
    lng: "2.57",
  });

  const E = "#10B981";

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await authApiClient.get("/waste-categories/");
        setCategories(res.data); 
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

const handleUseCurrentLocation = async () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        
        // state update 
        setFormData(prev => ({ ...prev, lat: latitude.toString(), lng: longitude.toString() }));

        // এখন এই স্থানাঙ্ক থেকে ঠিকানা বের করার জন্য API কল করুন
        try {
          const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
          const data = await response.json();
          
          if (data && data.display_name) {
            setFormData(prev => ({ ...prev, location: data.display_name }));
          }
        } catch (error) {
          console.error("Geocoding error:", error);
          // ব্যর্থ হলে স্থানাঙ্কটিই রাখুন
          setFormData(prev => ({ ...prev, location: `Lat: ${latitude.toFixed(4)}, Lng: ${longitude.toFixed(4)}` }));
        }
      },
      (error) => alert("Unable to retrieve location.")
    );
  }
};

  const handleSubmit = async () => {
    try {
      // ল্যাটিটিউড এবং লংগিটিউড ফরম্যাটিং
      const lat = parseFloat(formData.lat).toFixed(6); // দশমিকের পর সর্বোচ্চ ৬ ঘর
      const lng = parseFloat(formData.lng).toFixed(6); // দশমিকের পর সর্বোচ্চ ৬ ঘর

      const payload = {
        category: parseInt(cat),
        estimated_weight: parseFloat(formData.weight) || 0,
        pickup_address: formData.location,
        latitude: lat.toString(),
        longitude: lng.toString(),
      };

      // API কল
      await authApiClient.post("/pickups/", payload);
      setDone(true);
    } catch (error) {
      console.error("Submission failed:", error.response?.data || error);
      alert(
        "Failed to submit request. Please ensure location coordinates are valid.",
      );
    }
  };

    const selectedCategory = categories.find(c=> c.id ===cat);
    const estmatedPoints = selectedCategory? (parseFloat(formData.weight) ||0) * selectedCategory.points_multiplier : 0;

  if (done)
    return (
      <div
        style={{
          padding: 28,
          display: "flex",
          justifyContent: "center",
          paddingTop: 80,
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{
            padding: 48,
            borderRadius: 20,
            background: theme.card,
            border: `1px solid ${theme.border}`,
            textAlign: "center",
            maxWidth: 360,
          }}
        >
          <div style={{ fontSize: 56, marginBottom: 16 }}>🎉</div>
          <div
            style={{
              fontSize: 20,
              fontWeight: 700,
              color: theme.txt,
              marginBottom: 8,
            }}
          >
            Request submitted!
          </div>
          <div style={{ fontSize: 13, color: theme.muted, marginBottom: 20 }}>
            A recycler near you will accept shortly.
          </div>
          <button
            onClick={() => {
              setDone(false);
              setStep(1);
              setCat("");
            }}
            style={{
              padding: "9px 20px",
              borderRadius: 10,
              background: E,
              color: "#fff",
              border: "none",
              fontWeight: 600,
              fontSize: 13,
              cursor: "pointer",
            }}
          >
            New request
          </button>
        </motion.div>
      </div>
    );

  const btnStyle = (active) => ({
    flex: 1,
    padding: "10px 0",
    borderRadius: 10,
    border: "none",
    background: active ? E : dark ? "rgba(255,255,255,0.06)" : "#f3f4f6",
    color: active ? "#fff" : theme.muted,
    fontWeight: 600,
    fontSize: 13,
    cursor: "pointer",
  });
  const inputStyle = {
    width: "100%",
    padding: "10px 14px",
    borderRadius: 10,
    fontSize: 13,
    background: dark ? "rgba(255,255,255,0.06)" : "#f9fafb",
    border: `1px solid ${theme.border}`,
    color: theme.txt,
    outline: "none",
    boxSizing: "border-box",
  };

  return (
    <div style={{ padding: 28 }}>
      <h1
        style={{
          fontSize: 24,
          fontWeight: 700,
          color: theme.txt,
          marginBottom: 4,
        }}
      >
        New pickup
      </h1>
      <p style={{ fontSize: 13, color: theme.muted, marginBottom: 28 }}>
        Schedule a waste collection in a few steps.
      </p>

      <div style={{ maxWidth: 500 }}>
        <div
          style={{ display: "flex", alignItems: "center", marginBottom: 28 }}
        >
          {["Category", "Details", "Location", "Review"].map((name, i) => (
            <div
              key={name}
              style={{
                display: "flex",
                alignItems: "center",
                flex: i < 3 ? 1 : "none",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 4,
                }}
              >
                <div
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 12,
                    fontWeight: 700,
                    background:
                      step > i + 1
                        ? E
                        : step === i + 1
                          ? "rgba(16,185,129,0.18)"
                          : "rgba(255,255,255,0.05)",
                    color:
                      step > i + 1 ? "#fff" : step === i + 1 ? E : theme.muted,
                    border: `2px solid ${step >= i + 1 ? E : "rgba(255,255,255,0.1)"}`,
                  }}
                >
                  {step > i + 1 ? "✓" : i + 1}
                </div>
                <span
                  style={{
                    fontSize: 11,
                    color: step === i + 1 ? E : theme.muted,
                    whiteSpace: "nowrap",
                  }}
                >
                  {name}
                </span>
              </div>
              {i < 3 && (
                <div
                  style={{
                    flex: 1,
                    height: 2,
                    marginBottom: 16,
                    background: step > i + 1 ? E : "rgba(255,255,255,0.08)",
                  }}
                />
              )}
            </div>
          ))}
        </div>
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="s1"
              style={{
                padding: 24,
                borderRadius: 16,
                background: theme.card,
                border: `1px solid ${theme.border}`,
              }}
            >
              <div
                style={{ fontWeight: 600, color: theme.txt, marginBottom: 16 }}
              >
                What are you recycling?
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: 10,
                  marginBottom: 20,
                }}
              >
                {categories.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setCat(item.id)}
                    style={{
                      padding: 16,
                      borderRadius: 12,
                      border: `1.5px solid ${cat === item.id ? E : theme.border}`,
                      background:
                        cat === item.id
                          ? "rgba(16,185,129,0.12)"
                          : "transparent",
                      cursor: "pointer",
                    }}
                  >
                    <div style={{ fontSize: 20 }}>{item.icon || "♻️"}</div>
                    <div
                      style={{
                        fontSize: 12,
                        marginTop: 4,
                        color: cat === item.id ? E : theme.muted,
                      }}
                    >
                      {item.name}
                    </div>
                  </button>
                ))}
              </div>
              <button
                disabled={!cat}
                onClick={() => setStep(2)}
                style={{
                  ...btnStyle(true),
                  width: "100%",
                  opacity: cat ? 1 : 0.35,
                }}
              >
                Continue
              </button>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="s2"
              style={{
                padding: 24,
                borderRadius: 16,
                background: theme.card,
                border: `1px solid ${theme.border}`,
                display: "flex",
                flexDirection: "column",
                gap: 16,
              }}
            >
              <input
                type="number"
                placeholder="Est. Weight (kg)"
                style={inputStyle}
                value={formData.weight}
                onChange={(e) =>
                  setFormData({ ...formData, weight: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Notes"
                style={inputStyle}
                onChange={(e) =>
                  setFormData({ ...formData, notes: e.target.value })
                }
              />
              <div style={{ display: "flex", gap: 10 }}>
                <button onClick={() => setStep(1)} style={btnStyle(false)}>
                  Back
                </button>
                <button disabled={!formData.weight} onClick={() => setStep(3)} style={{ ...btnStyle(true), opacity: formData.weight ? 1 : 0.35 }}>
                  Continue
                </button>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="s3"
              style={{
                padding: 24,
                borderRadius: 16,
                background: theme.card,
                border: `1px solid ${theme.border}`,
                display: "flex",
                flexDirection: "column",
                gap: 16,
              }}
            >
              {/* নতুন বাটন */}
              <button
                type="button"
                onClick={handleUseCurrentLocation}
                style={{
                  padding: 12,
                  borderRadius: 10,
                  background: "rgba(16,185,129,0.1)",
                  border: "1px solid rgba(16,185,129,0.3)",
                  color: E,
                  fontWeight: 600,
                  fontSize: 13,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                }}
              >
                <Ic n="location" s={16} c={E} /> Use Current Location
              </button>

              <input
                placeholder="Enter address manually"
                style={inputStyle}
                value={formData.location} // ভ্যালু বাইন্ড করা হলো
                onChange={(e) =>
                  setFormData({ ...formData, location: e.target.value })
                }
                required
              />

              <div style={{ display: "flex", gap: 10 }}>
                <button onClick={() => setStep(2)} style={btnStyle(false)}>
                  Back
                </button>
                <button disabled={!formData.location} onClick={() => setStep(4)} style={{ ...btnStyle(true), opacity: formData.location ? 1 : 0.35 }}>
                  Continue
                </button>
              </div>
            </motion.div>
          )}

          {step === 4 && (
            // <motion.div key="s4" style={{ padding: 24, borderRadius: 16, background: theme.card, border: `1px solid ${theme.border}`, display: "flex", flexDirection: "column", gap: 16 }}>
            //   <button onClick={handleSubmit} style={btnStyle(true)}>Submit Request</button>
            // </motion.div>

            <motion.div
              key="s4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              style={{
                padding: 24,
                borderRadius: 16,
                background: theme.card,
                border: `1px solid ${theme.border}`,
                display: "flex",
                flexDirection: "column",
                gap: 16,
              }}
            >
              <div style={{ fontWeight: 600, color: theme.txt }}>
                Confirm request
              </div>
              {[
                ["Category", categories.find(c => c.id ===cat)?.name || "N/A"],
                ["Est. Weight (kg)", formData.weight || "0"],
                ["Location:", formData.location || "Location Not set"],
                ["Status", "Pending"],
              ].map(([l, v]) => (
                <div
                  key={l}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "10px 0",
                    borderBottom: `1px solid ${theme.border}`,
                  }}
                >
                  <span style={{ fontSize: 13, color: theme.muted }}>{l}</span>
                  <span
                    style={{ fontSize: 13, fontWeight: 500, color: theme.txt }}
                  >
                    {v}
                  </span>
                </div>
              ))}
              <div
                style={{
                  padding: 12,
                  borderRadius: 10,
                  background: "rgba(16,185,129,0.1)",
                  border: "1px solid rgba(16,185,129,0.2)",
                  color: E,
                  fontSize: 13,
                }}
              >
                You'll earn approximately +{estmatedPoints.toFixed(0)} Green Points
              </div>
              <div style={{ display: "flex", gap: 10 }}>
                <button onClick={() => setStep(3)} style={btnStyle(false)}>
                  Back
                </button>
                <button onClick={handleSubmit} style={btnStyle(true)}>
                  Submit request
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
