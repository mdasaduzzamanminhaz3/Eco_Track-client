import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Ic } from "../../components/ui/Icons";
import authApiClient from "../../services/auth-api-client"; 

export function Chat({ theme, dark, activePickupId }) {
  const E = "#10B981";
  const LIME = "#84CC16";
  
  const [rooms, setRooms] = useState([]); 
  const [selectedRoom, setSelectedRoom] = useState(activePickupId || null);
  const [msgs, setMsgs] = useState([]);
  const [input, setInput] = useState("");
  const [isPartnerTyping, setIsPartnerTyping] = useState(false); // typing state
  const [realUserId, setRealUserId] = useState(null); 
  const ws = useRef(null);
  const bottomRef = useRef(null);
  const typingTimeoutRef = useRef(null); // typing timer tracking

  // active chat room & current user real id load
  useEffect(() => {
    const initChatData = async () => {
      try {
        const userRes = await authApiClient.get("auth/users/me/"); 
        if (userRes.data) {
          const uId = userRes.data.id || userRes.data.pk;
          setRealUserId(uId);
        }

        const res = await authApiClient.get("pickups/?chat=true"); 
        const activeChats = res.data.filter(p => p.status === "ACCEPTED" || p.status === "COLLECTED");
        setRooms(activeChats);
        
        if (activePickupId) {
          setSelectedRoom(activePickupId);
        } else if (!selectedRoom && activeChats.length > 0) {
          setSelectedRoom(activeChats[0].id);
        }
      } catch (err) {
        console.error("Error initializing chat data:", err);
      }
    };
    initChatData();
  }, [selectedRoom, activePickupId]);

  // ✨ unique chat list 
  const getUniqueRooms = () => {
    const seenPartners = new Set();
    const unique = [];

    rooms.forEach(room => {
      const currentIsCustomer = String(room.user?.id || room.user) === String(realUserId);
      const partnerId = currentIsCustomer ? room.recycler?.id : room.user?.id;

      if (partnerId && !seenPartners.has(partnerId)) {
        seenPartners.add(partnerId);
        unique.push(room);
      }
    });
    return unique;
  };

  const uniqueRooms = getUniqueRooms();

  // prev history & live WebSocket connection
  useEffect(() => {
    if (!selectedRoom || !realUserId) return;

    setIsPartnerTyping(false); // when room is change typing reset 

    const fetchMessages = async () => {
      try {
        const res = await authApiClient.get(`pickups/${selectedRoom}/messages/`);
        const formattedMsgs = res.data.map(m => {
          const msgSenderId = m.sender?.id || m.sender?.pk || m.sender;
          return {
            id: m.id,
            from: String(msgSenderId) === String(realUserId) ? "me" : "r",
            text: m.message,
            time: new Date(m.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
          };
        });
        setMsgs(formattedMsgs);
        setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
      } catch (err) {
        console.error("Failed to load history:", err);
        setMsgs([]);
      }
    };
    
    fetchMessages();

    const wsUrl = `ws://localhost:8000/ws/chat/${selectedRoom}/?user_id=${realUserId}`;
    ws.current = new WebSocket(wsUrl);

    ws.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      
      // 🕵️‍♂️ যদি ব্যাকএন্ড থেকে টাইপিং ইভেন্ট আসে
      if (data.typing !== undefined) {
        if (String(data.sender_id) !== String(realUserId)) {
          setIsPartnerTyping(data.typing);
        }
        return;
      }

      // সাধারণ মেসেজ রেন্ডারিং
      const liveSenderId = data.sender_id || data.sender?.id;
      const isMe = String(liveSenderId) === String(realUserId);
      const msgId = data.id || `live-${Date.now()}`;

      setMsgs((prev) => {
        if (prev.some(m => String(m.id) === String(msgId))) return prev;
        return [...prev, {
          id: msgId,
          from: isMe ? "me" : "r", 
          text: data.message,
          time: data.time || new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
        }];
      });
      
      setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: "smooth" }), 50);
    };

    return () => {
      if (ws.current) ws.current.close();
    };
  }, [selectedRoom, realUserId]);

  // ⌨️ টাইপিং সিগন্যাল হ্যান্ডলার (যখন কারেন্ট ইউজার ইনপুটে হাত দেবে)
  const handleInputChange = (e) => {
    setInput(e.target.value);

    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      // ব্যাকএন্ডে টাইপিং শুরু করার সিগন্যাল পাঠানো
      ws.current.send(JSON.stringify({ typing: true }));

      // পুরনো টাইমার ক্লিয়ার করে নতুন করে টাইমার সেট করা
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
      
      typingTimeoutRef.current = setTimeout(() => {
        if (ws.current && ws.current.readyState === WebSocket.OPEN) {
          ws.current.send(JSON.stringify({ typing: false }));
        }
      }, 2500); // ২.৫ সেকেন্ড পর টাইপিং অফ হবে
    }
  };

  function send() {
    if (!input.trim() || !ws.current || ws.current.readyState !== WebSocket.OPEN) return;

    // মেসেজ পাঠানোর সময় টাইপিং সিগন্যাল অফ করে দেওয়া
    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    ws.current.send(JSON.stringify({ typing: false }));

    ws.current.send(JSON.stringify({ message: input }));
    setInput("");
  };

  const currentRoomDetails = rooms.find(r => String(r.id) === String(selectedRoom));
  const isCustomer = currentRoomDetails && String(currentRoomDetails.user?.id || currentRoomDetails.user) === String(realUserId);

  let partnerName = "Chat Partner";
  let partnerIdDisplay = "";

  if (currentRoomDetails) {
    if (isCustomer) {
      const rName = `${currentRoomDetails.recycler?.first_name || ""} ${currentRoomDetails.recycler?.last_name || ""}`.trim();
      partnerName = rName || currentRoomDetails.recycler?.email || "Recycler Rider";
      partnerIdDisplay = currentRoomDetails.recycler?.id;
    } else {
      const uName = `${currentRoomDetails.user?.first_name || ""} ${currentRoomDetails.user?.last_name || ""}`.trim();
      partnerName = uName || currentRoomDetails.user?.email || "Waste Customer";
      partnerIdDisplay = currentRoomDetails.user?.id;
    }
  }

  return (
    <div style={{ padding: 28, display: "flex", gap: 16, height: "calc(100vh - 56px)", maxHeight: 620 }}>
      
      {/*  ইউনিক মেসেজ লিস্ট ডিরেক্টরি (বাম পাশ) */}
      <div style={{ width: 240, flexShrink: 0, borderRadius: 16, background: theme.card, border: `1px solid ${theme.border}`, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <div style={{ padding: "14px 16px", fontWeight: 600, color: theme.txt, borderBottom: `1px solid ${theme.border}` }}>Messages</div>
        <div style={{ overflowY: "auto", flex: 1 }}>
          {uniqueRooms.map((room) => {
            const currentIsCustomer = String(room.user?.id || room.user) === String(realUserId);
            let chatPartnerName = "User";
            let chatPartnerId = "";

            if (currentIsCustomer) {
              const rName = `${room.recycler?.first_name || ""} ${room.recycler?.last_name || ""}`.trim();
              chatPartnerName = rName || room.recycler?.email || "Recycler Rider";
              chatPartnerId = room.recycler?.id;
            } else {
              const uName = `${room.user?.first_name || ""} ${room.user?.last_name || ""}`.trim();
              chatPartnerName = uName || room.user?.email || "Waste Customer";
              chatPartnerId = room.user?.id;
            }

            return (
              <div 
                key={room.id} 
                onClick={() => setSelectedRoom(room.id)}
                style={{ display: "flex", alignItems: "center", gap: 10, padding: 12, cursor: "pointer", background: selectedRoom === room.id ? "rgba(16,185,129,0.07)" : "transparent", borderBottom: `1px solid ${theme.border}44` }}
              >
                <div style={{ width: 36, height: 36, borderRadius: "50%", background: `linear-gradient(135deg,${E}99,${LIME}66)`, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 13, color: "#fff", flexShrink: 0 }}>
                  {currentIsCustomer ? "R" : "C"}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 2 }}>
                    <span style={{ fontSize: 12, fontWeight: 600, color: theme.txt, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {chatPartnerName}
                    </span>
                  </div>
                  <div style={{ fontSize: 11, color: theme.muted, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {/* ID: {chatPartnerId ? chatPartnerId.toString().slice(0, 8) : "Assigned"}... */}
                    Email: {currentIsCustomer ? room.recycler?.email || "Not Provided" : room.user?.email || "Not Provided"}
                  </div>
                </div>
              </div>
            );
          })}
          {uniqueRooms.length === 0 && (
            <p style={{ padding: 16, fontSize: 12, color: theme.muted, textAlign: "center" }}>No active chats.</p>
          )}
        </div>
      </div>

      {/* 💬 অ্যাক্টিভ চ্যাট উইন্ডো (ডান পাশ) */}
      <div style={{ flex: 1, borderRadius: 16, background: theme.card, border: `1px solid ${theme.border}`, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        {selectedRoom ? (
          <>
            <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 18px", borderBottom: `1px solid ${theme.border}` }}>
              <div style={{ position: "relative" }}>
                <div style={{ width: 36, height: 36, borderRadius: "50%", background: `linear-gradient(135deg,${E},${LIME})`, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, color: "#fff" }}>
                  {partnerName ? partnerName[0].toUpperCase() : "P"}
                </div>
                <div style={{ position: "absolute", bottom: 0, right: 0, width: 10, height: 10, borderRadius: "50%", background: E, border: `2px solid ${theme.card}` }} />
              </div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, color: theme.txt }}>{partnerName}</div>
                <div style={{ fontSize: 11, color: E }}>
                  {/* ID: {partnerIdDisplay ? partnerIdDisplay.toString().slice(0, 8) : "Loading"}... */}
                </div>
              </div>
            </div>

            {/* মেসেজ স্ক্রিন এলাকা */}
            <div style={{ flex: 1, overflow: "auto", padding: 18, display: "flex", flexDirection: "column", gap: 10 }}>
              {msgs.map((m) => (
                <motion.div key={m.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                  style={{ display: "flex", justifyContent: m.from === "me" ? "flex-end" : "flex-start" }}>
                  <div>
                    <div style={{ maxWidth: 280, padding: "9px 14px", borderRadius: m.from === "me" ? "14px 14px 4px 14px" : "14px 14px 14px 4px", background: m.from === "me" ? E : dark ? "rgba(255,255,255,0.07)" : "#f3f4f6", color: m.from === "me" ? "#fff" : theme.txt, fontSize: 13 }}>
                      {m.text}
                    </div>
                    <div style={{ fontSize: 10, color: theme.muted, marginTop: 4, textAlign: m.from === "me" ? "right" : "left" }}>{m.time}</div>
                  </div>
                </motion.div>
              ))}
              
              {/* 💬 মেসেঞ্জার স্টাইল ৩-ডট বাউন্সিং টাইপিং অ্যানিমেশন */}
              <AnimatePresence>
                {isPartnerTyping && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9, y: 5 }} 
                    animate={{ opacity: 1, scale: 1, y: 0 }} 
                    exit={{ opacity: 0, scale: 0.9, y: 5 }}
                    style={{ display: "flex", justifyContent: "flex-start", marginTop: 4, marginBottom: 4 }}
                  >
                    <div style={{ 
                      padding: "12px 16px", 
                      borderRadius: "18px 18px 18px 4px", 
                      background: dark ? "rgba(255,255,255,0.08)" : "#e5e7eb", 
                      display: "flex", 
                      alignItems: "center", 
                      gap: 4,
                      width: "fit-content"
                    }}>
                      {[0, 1, 2].map((index) => (
                        <motion.span
                          key={index}
                          animate={{ y: ["0px", "-6px", "0px"] }}
                          transition={{
                            duration: 0.6,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: index * 0.15,
                          }}
                          style={{
                            width: 7,
                            height: 7,
                            borderRadius: "50%",
                            background: dark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.4)",
                            display: "inline-block"
                          }}
                        />
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div ref={bottomRef} />
            </div>

            {/* ইনপুট ফিল্ড বার */}
            <div style={{ padding: 14, borderTop: `1px solid ${theme.border}`, display: "flex", gap: 8 }}>
              <input value={input} onChange={handleInputChange} onKeyDown={e => e.key === "Enter" && send()}
                placeholder="Type a message…"
                style={{ flex: 1, padding: "9px 14px", borderRadius: 10, fontSize: 13, background: dark ? "rgba(255,255,255,0.06)" : "#f9fafb", border: `1px solid ${theme.border}`, color: theme.txt, outline: "none" }}
                onFocus={e => e.target.style.borderColor = E}
                onBlur={e => e.target.style.borderColor = theme.border} />
              <motion.button onClick={send} style={{ padding: "9px 14px", borderRadius: 10, background: E, border: "none", cursor: "pointer" }}
                whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Ic n="send" s={16} c="#fff" />
              </motion.button>
            </div>
          </>
        ) : (
          <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", color: theme.muted }}>
            Select an active pickup request to start talking.
          </div>
        )}
      </div>
    </div>
  );
}