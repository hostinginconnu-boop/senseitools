import { forwardRef } from "react";
import StatusIcon from "./StatusIcon.jsx";

const DEFAULT_AVATAR = "https://ui-avatars.com/api/?name=Sarah&background=25D366&color=fff&size=128&bold=true&rounded=true";

const Bubble = ({ msg, prevSame }) => {
  const isMe = msg.sender === "me";
  const showTail = !prevSame;

  return (
    <div style={{
      display: "flex",
      justifyContent: isMe ? "flex-end" : "flex-start",
      paddingLeft: isMe ? 52 : 6,
      paddingRight: isMe ? 6 : 52,
      marginBottom: 2,
      marginTop: prevSame ? 1 : 6,
    }}>
      <div style={{
        maxWidth: "100%",
        background: isMe ? "#dcf8c6" : "#ffffff",
        borderRadius: isMe
          ? (showTail ? "12px 4px 12px 12px" : "12px 4px 4px 12px")
          : (showTail ? "4px 12px 12px 12px" : "4px 12px 12px 12px"),
        padding: "6px 10px 4px",
        boxShadow: "0 1px 2px rgba(0,0,0,0.12)",
        position: "relative",
        wordBreak: "break-word",
        animation: "fadeSlideUp 0.2s ease",
      }}>
        {/* Tail */}
        {showTail && isMe && (
          <div style={{
            position: "absolute", top: 0, right: -8,
            width: 0, height: 0,
            borderStyle: "solid",
            borderWidth: "0 0 12px 10px",
            borderColor: "transparent transparent transparent #dcf8c6",
          }} />
        )}
        {showTail && !isMe && (
          <div style={{
            position: "absolute", top: 0, left: -8,
            width: 0, height: 0,
            borderStyle: "solid",
            borderWidth: "0 10px 12px 0",
            borderColor: "transparent #ffffff transparent transparent",
          }} />
        )}

        <div style={{ fontSize: 14, color: "#111", lineHeight: 1.45 }}>{msg.text}</div>
        <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", gap: 2, marginTop: 3 }}>
          <span style={{ color: "#8696a0", fontSize: 11 }}>{msg.time}</span>
          {isMe && <StatusIcon status={msg.status} />}
        </div>
      </div>
    </div>
  );
};

const ChatPreview = forwardRef(({ contact, messages, showSystemTime, systemTime }, ref) => {
  return (
    /* Phone frame */
    <div style={{
      width: 390,
      minWidth: 360,
      borderRadius: 42,
      background: "#111",
      padding: 8,
      boxShadow: "0 40px 120px rgba(0,0,0,0.85), 0 0 0 1px rgba(255,255,255,0.08), inset 0 0 0 1px rgba(255,255,255,0.04)",
      position: "relative",
      flexShrink: 0,
    }}>
      {/* Dynamic Island / Notch */}
      <div style={{ position: "absolute", top: 14, left: "50%", transform: "translateX(-50%)", width: 126, height: 30, background: "#111", borderRadius: 20, zIndex: 10, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
        <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#222" }} />
        <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#1c1c1c" }} />
      </div>

      {/* Screen */}
      <div ref={ref} style={{ borderRadius: 36, overflow: "hidden", display: "flex", flexDirection: "column", height: 740, position: "relative" }} className="wa-wallpaper">

        {/* System Status Bar */}
        {showSystemTime && (
          <div style={{ background: "#075E54", color: "#fff", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 22px 5px", fontSize: 12, fontWeight: 600, flexShrink: 0 }}>
            <span>{systemTime}</span>
            <div style={{ display: "flex", gap: 6, alignItems: "center", fontSize: 11 }}>
              <span>▐▐▐▐</span>
              <span>WiFi</span>
              <span>🔋</span>
            </div>
          </div>
        )}

        {/* Chat Header */}
        <div style={{ background: "#075E54", padding: "10px 14px", display: "flex", alignItems: "center", gap: 10, boxShadow: "0 2px 8px rgba(0,0,0,0.2)", flexShrink: 0 }}>
          <span style={{ color: "rgba(255,255,255,0.75)", fontSize: 22, lineHeight: 1, cursor: "default" }}>‹</span>
          <img src={contact.avatar} alt="avatar" onError={(e) => { e.target.src = DEFAULT_AVATAR; }}
            style={{ width: 40, height: 40, borderRadius: "50%", objectFit: "cover", border: "2px solid rgba(255,255,255,0.2)", flexShrink: 0 }} />
          <div style={{ flex: 1 }}>
            <div style={{ color: "#fff", fontWeight: 600, fontSize: 15, lineHeight: 1.2, display: "flex", alignItems: "center", gap: 5 }}>
              {contact.name}
              {contact.verified && (
                <svg viewBox="0 0 20 20" width="16" height="16" style={{ flexShrink: 0, filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.3))" }}>
                  <circle cx="10" cy="10" r="10" fill="#1976d2"/>
                  <path d="M6 10.5l2.5 2.5 5.5-5.5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                </svg>
              )}
            </div>
            <div style={{ color: "rgba(255,255,255,0.65)", fontSize: 12 }}>online</div>
          </div>
          <div style={{ display: "flex", gap: 18, color: "rgba(255,255,255,0.75)", fontSize: 18 }}>
            <span style={{ cursor: "default" }}>📞</span>
            <span style={{ cursor: "default" }}>⋮</span>
          </div>
        </div>

        {/* Messages */}
        <div style={{ flex: 1, overflowY: "auto", padding: "10px 8px", display: "flex", flexDirection: "column" }}>
          {messages.length === 0 && (
            <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(0,0,0,0.25)", fontSize: 13, textAlign: "center", padding: 20 }}>
              No messages yet.<br />Add some from the panel!
            </div>
          )}

          {messages.length > 0 && (
            <div style={{ textAlign: "center", marginBottom: 10 }}>
              <span style={{ background: "rgba(255,255,255,0.85)", color: "#54656f", fontSize: 11, padding: "4px 12px", borderRadius: 8, boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}>
                TODAY
              </span>
            </div>
          )}

          {messages.map((msg, idx) => {
            const prevSame = idx > 0 && messages[idx - 1].sender === msg.sender;
            return <Bubble key={msg.id} msg={msg} prevSame={prevSame} />;
          })}
        </div>

        {/* Input Bar */}
        <div style={{ background: "#f0f0f0", padding: "8px 10px", display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
          <div style={{ flex: 1, background: "#fff", borderRadius: 24, padding: "9px 14px", display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 18, cursor: "default" }}>😊</span>
            <span style={{ flex: 1, color: "#aaa", fontSize: 14 }}>Message</span>
            <span style={{ fontSize: 16, cursor: "default" }}>📎</span>
          </div>
          <div style={{ width: 44, height: 44, borderRadius: "50%", background: "#25D366", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 20, boxShadow: "0 2px 8px rgba(37,211,102,0.4)", flexShrink: 0, cursor: "default" }}>
            🎤
          </div>
        </div>
      </div>
    </div>
  );
});

ChatPreview.displayName = "ChatPreview";
export default ChatPreview;
