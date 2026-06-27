import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import authApiClient from "../../services/auth-api-client";
import { useNavigate } from "react-router-dom";

export function Notifs({ theme }) {
  const E = "#10B981";
  const [notifications,setNotifications] = useState([]);
const fetchNotifications = async () => {
    try{
      const res =await authApiClient.get('notifications/');
      setNotifications(res.data)
      // console.log(res.data);
    }catch(error){
      console.log("Error fetching notifications:", error);
    }
  };

  useEffect(() => {
    fetchNotifications();
  },[])

  const markAllRead = async () => {
    const res = authApiClient.patch('notifications/mark_all_as_read/')
    console.log("mark all read data:", res.data);
    fetchNotifications()
  }



  return (
    <div style={{ padding: 28, maxWidth: 640 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: theme.txt, marginBottom: 3 }}>Notifications</h1>
          <span style={{ fontSize: 13, color: theme.muted }}>
            {notifications.filter(n => !n.is_read).length} unread
          </span>
        </div>
        <button onClick={markAllRead} style={{ fontSize: 12, padding: "6px 14px", borderRadius: 8, background: "transparent", border: `1px solid ${theme.border}`, color: theme.muted, cursor: "pointer" }}>Mark all read</button>
      </div>

{notifications.length === 0 && (
  <div style={{ textAlign: "center", padding: 40, color: theme.muted }}>
    No new notifications
  </div>
)}

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {notifications.map((n,i) => (
          <motion.div key={n.id} initial={{ opacity: 0, x: -14 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 }}
            style={{ 
              display: "flex", gap: 14, padding: 16, borderRadius: 14, 
              background: theme.card, 
              border: `1px solid ${!n.is_read ? "rgba(16,185,129,0.3)" : theme.border}` 
            }}>
            <div style={{ fontSize: 24, marginTop: 2 }}>{n.notification_type === 'NEW_REQUEST' ? '📦' : n.notification_type === 'POINTS_EARNED' ? '💰' : '🔔'}</div>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: theme.txt }}>{n.title}</div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0, marginLeft: 12 }}>
                  <span style={{ fontSize: 11, color: theme.muted }}>{n.time}</span>
                  {!n.is_read && <div style={{ width: 8, height: 8, borderRadius: "50%", background: E }} />}
                </div>
              </div>
              <p style={{ fontSize: 12, color: theme.muted, marginTop: 4, lineHeight: 1.5 }}>{n.message}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}