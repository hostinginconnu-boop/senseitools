import { useState, useRef } from "react";
import { getCurrentTime } from "../utils/time.js";

const DEFAULT_AVATAR = "https://ui-avatars.com/api/?name=Sarah&background=25D366&color=fff&size=128&bold=true&rounded=true";

const inputStyle = {
  width: "100%",
  background: "rgba(255,255,255,0.06)",
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: 10,
  padding: "9px 12px",
  color: "#fff",
  fontSize: 13,
  fontFamily: "inherit",
  transition: "border-color 0.2s, box-shadow 0.2s",
};

function Label({ children }) {
  return (
    <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 11, fontWeight: 600, letterSpacing: "0.6px", textTransform: "uppercase", marginBottom: 6 }}>
      {children}
    </div>
  );
}

function Section({ title, accent = "#25D366", children }) {
  return (
    <div style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 14, padding: "14px 16px" }}>
      <div style={{ color: accent, fontSize: 12, fontWeight: 700, letterSpacing: "0.8px", textTransform: "uppercase", marginBottom: 14, display: "flex", alignItems: "center", gap: 6 }}>
        {title}
      </div>
      {children}
    </div>
  );
}

function Toggle({ checked, onChange, label }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
      <span style={{ color: "rgba(255,255,255,0.6)", fontSize: 13 }}>{label}</span>
      <div onClick={() => onChange(!checked)} style={{ width: 44, height: 24, borderRadius: 12, background: checked ? "#25D366" : "rgba(255,255,255,0.1)", position: "relative", cursor: "pointer", transition: "background 0.2s" }}>
        <div style={{ width: 20, height: 20, borderRadius: "50%", background: "#fff", position: "absolute", top: 2, left: checked ? 22 : 2, transition: "left 0.2s", boxShadow: "0 1px 4px rgba(0,0,0,0.3)" }} />
      </div>
    </div>
  );
}

function PillBtn({ active, onClick, children, color = "#25D366" }) {
  return (
    <button onClick={onClick} style={{ padding: "7px 12px", borderRadius: 8, border: "none", cursor: "pointer", fontSize: 12, fontWeight: 600, transition: "all 0.15s", background: active ? color : "rgba(255,255,255,0.07)", color: active ? "#fff" : "rgba(255,255,255,0.45)", flex: 1 }}>
      {children}
    </button>
  );
}

export default function ControlPanel({ contact, setContact, showSystemTime, setShowSystemTime, messages, onAdd, onRemove, onReorder, onReset, onScreenshot, screenshotLoading, templates }) {
  const [form, setForm] = useState({ text: "", sender: "me", time: getCurrentTime(), status: "sent" });
  const [avatarMode, setAvatarMode] = useState("url");
  const [drag, setDrag] = useState({ from: null, over: null });
  const fileRef = useRef(null);

  const handleAdd = () => {
    if (!form.text.trim()) return;
    onAdd({ text: form.text, sender: form.sender, time: form.time, status: form.status });
    setForm((f) => ({ ...f, text: "" }));
  };

  const handleAvatarFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setContact((c) => ({ ...c, avatar: ev.target.result }));
    reader.readAsDataURL(file);
  };

  return (
    <div style={{ width: 370, minWidth: 340, borderRight: "1px solid rgba(255,255,255,0.05)", overflowY: "auto", padding: "18px 16px", display: "flex", flexDirection: "column", gap: 16, background: "rgba(255,255,255,0.01)" }}>

      {/* Contact Settings */}
      <Section title="👤 Contact" accent="#25D366">
        <Label>Contact Name</Label>
        <input style={inputStyle} value={contact.name} onChange={(e) => setContact((c) => ({ ...c, name: e.target.value }))} placeholder="Sarah ✨" />

        <div style={{ height: 12 }} />
        <Label>Avatar Source</Label>
        <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
          <PillBtn active={avatarMode === "url"} onClick={() => setAvatarMode("url")}>🔗 URL</PillBtn>
          <PillBtn active={avatarMode === "upload"} onClick={() => setAvatarMode("upload")}>📁 Upload</PillBtn>
        </div>

        {avatarMode === "url" ? (
          <input style={inputStyle} value={contact.avatar} onChange={(e) => setContact((c) => ({ ...c, avatar: e.target.value }))} placeholder="https://..." />
        ) : (
          <button onClick={() => fileRef.current?.click()} style={{ ...inputStyle, cursor: "pointer", textAlign: "center", color: "#25D366", background: "rgba(37,211,102,0.06)" }}>
            📸 Choose Image
            <input ref={fileRef} type="file" accept="image/*" onChange={handleAvatarFile} style={{ display: "none" }} />
          </button>
        )}

        <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 12 }}>
          <img src={contact.avatar} alt="avatar" onError={(e) => { e.target.src = DEFAULT_AVATAR; }}
            style={{ width: 38, height: 38, borderRadius: "50%", objectFit: "cover", border: "2px solid #25D366" }} />
          <span style={{ color: "rgba(255,255,255,0.35)", fontSize: 12 }}>Avatar preview</span>
        </div>

        <div style={{ height: 14 }} />
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 14px", borderRadius: 12, background: contact.verified ? "rgba(37,150,255,0.08)" : "rgba(255,255,255,0.03)", border: `1px solid ${contact.verified ? "rgba(37,150,255,0.25)" : "rgba(255,255,255,0.07)"}`, transition: "all 0.2s" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            {/* WhatsApp verified badge SVG */}
            <div style={{ width: 28, height: 28, borderRadius: "50%", background: contact.verified ? "#1976d2" : "rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center", transition: "background 0.2s", flexShrink: 0 }}>
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none">
                <path d="M9 12l2 2 4-4" stroke={contact.verified ? "#fff" : "rgba(255,255,255,0.3)"} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" fill={contact.verified ? "#1976d2" : "transparent"} stroke={contact.verified ? "#1976d2" : "rgba(255,255,255,0.2)"} strokeWidth="1.5"/>
              </svg>
            </div>
            <div>
              <div style={{ color: contact.verified ? "#90caf9" : "rgba(255,255,255,0.6)", fontSize: 13, fontWeight: 600, transition: "color 0.2s" }}>
                Verified Account
              </div>
              <div style={{ color: "rgba(255,255,255,0.28)", fontSize: 11 }}>
                Shows blue ✓ badge next to name
              </div>
            </div>
          </div>
          <div onClick={() => setContact((c) => ({ ...c, verified: !c.verified }))} style={{ width: 44, height: 24, borderRadius: 12, background: contact.verified ? "#1976d2" : "rgba(255,255,255,0.1)", position: "relative", cursor: "pointer", transition: "background 0.2s", flexShrink: 0 }}>
            <div style={{ width: 20, height: 20, borderRadius: "50%", background: "#fff", position: "absolute", top: 2, left: contact.verified ? 22 : 2, transition: "left 0.2s", boxShadow: "0 1px 4px rgba(0,0,0,0.3)" }} />
          </div>
        </div>
      </Section>

      {/* Display */}
      <Section title="⚙️ Display" accent="#128C7E">
        <Toggle label="Show system status bar" checked={showSystemTime} onChange={setShowSystemTime} />
      </Section>

      {/* Templates */}
      {templates.length > 0 && (
        <Section title="📂 Templates" accent="#34B7F1">
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {templates.map((t) => (
              <button key={t.id} onClick={() => {
                setContact(t.contact);
                onAdd._loadTemplate?.(t.messages);
              }} style={{ padding: "8px 12px", background: "rgba(52,183,241,0.08)", border: "1px solid rgba(52,183,241,0.15)", borderRadius: 10, color: "#34B7F1", cursor: "pointer", fontSize: 12, fontWeight: 600, textAlign: "left" }}>
                {t.name}
              </button>
            ))}
          </div>
        </Section>
      )}

      {/* Add Message */}
      <Section title="✉️ Add Message" accent="#075E54">
        <Label>Message Text</Label>
        <textarea
          style={{ ...inputStyle, minHeight: 70, resize: "vertical" }}
          value={form.text}
          onChange={(e) => setForm((f) => ({ ...f, text: e.target.value }))}
          placeholder="Type here... supports emojis 😄🔥"
          onKeyDown={(e) => { if (e.key === "Enter" && e.ctrlKey) handleAdd(); }}
        />

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 10 }}>
          <div>
            <Label>Sender</Label>
            <select style={inputStyle} value={form.sender} onChange={(e) => setForm((f) => ({ ...f, sender: e.target.value }))}>
              <option value="me">Me</option>
              <option value="contact">Contact</option>
            </select>
          </div>
          <div>
            <Label>Time</Label>
            <input style={inputStyle} type="time" value={form.time} onChange={(e) => setForm((f) => ({ ...f, time: e.target.value }))} />
          </div>
        </div>

        <div style={{ height: 10 }} />
        <Label>Status</Label>
        <div style={{ display: "flex", gap: 6 }}>
          <PillBtn active={form.status === "sent"} onClick={() => setForm((f) => ({ ...f, status: "sent" }))}>✓ Sent</PillBtn>
          <PillBtn active={form.status === "delivered"} onClick={() => setForm((f) => ({ ...f, status: "delivered" }))}>✓✓ Del.</PillBtn>
          <PillBtn active={form.status === "read"} onClick={() => setForm((f) => ({ ...f, status: "read" }))}>✓✓ Read</PillBtn>
        </div>

        <button onClick={handleAdd} style={{ marginTop: 14, width: "100%", padding: "12px", background: "linear-gradient(135deg, #25D366, #128C7E)", color: "#fff", border: "none", borderRadius: 12, fontWeight: 700, fontSize: 14, cursor: "pointer", boxShadow: "0 4px 16px rgba(37,211,102,0.25)", letterSpacing: "0.2px" }}
          onMouseDown={(e) => e.currentTarget.style.transform = "scale(0.98)"}
          onMouseUp={(e) => e.currentTarget.style.transform = "scale(1)"}
        >
          ➕ Add Message <span style={{ opacity: 0.5, fontSize: 11 }}>Ctrl+↵</span>
        </button>
      </Section>

      {/* Message List */}
      <Section title={`📋 Messages (${messages.length})`} accent="#FFA500">
        {messages.length === 0 && (
          <div style={{ color: "rgba(255,255,255,0.2)", fontSize: 12, textAlign: "center", padding: "10px 0" }}>
            No messages yet.
          </div>
        )}
        {messages.map((msg, idx) => (
          <div key={msg.id}
            draggable
            onDragStart={() => setDrag((d) => ({ ...d, from: idx }))}
            onDragOver={(e) => { e.preventDefault(); setDrag((d) => ({ ...d, over: idx })); }}
            onDrop={() => { onReorder(drag.from, idx); setDrag({ from: null, over: null }); }}
            onDragEnd={() => setDrag({ from: null, over: null })}
            style={{ display: "flex", alignItems: "center", gap: 8, padding: "7px 10px", borderRadius: 10, background: drag.over === idx ? "rgba(37,211,102,0.08)" : "rgba(255,255,255,0.03)", border: `1px solid ${drag.over === idx ? "rgba(37,211,102,0.3)" : "rgba(255,255,255,0.06)"}`, marginBottom: 6, cursor: "grab", transition: "all 0.15s" }}
          >
            <span style={{ fontSize: 14 }}>{msg.sender === "me" ? "🟢" : "⚪"}</span>
            <div style={{ flex: 1, overflow: "hidden" }}>
              <div style={{ color: "rgba(255,255,255,0.75)", fontSize: 12, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{msg.text}</div>
              <div style={{ color: "rgba(255,255,255,0.25)", fontSize: 10 }}>{msg.time} · {msg.status}</div>
            </div>
            <button onClick={() => onRemove(msg.id)} style={{ background: "rgba(255,59,48,0.12)", border: "none", color: "#ff3b30", borderRadius: 6, padding: "3px 8px", cursor: "pointer", fontSize: 14, fontWeight: 700, lineHeight: 1 }}>×</button>
          </div>
        ))}
        {messages.length > 1 && <div style={{ color: "rgba(255,255,255,0.18)", fontSize: 10, textAlign: "center", marginTop: 2 }}>↕ Drag to reorder</div>}
      </Section>

      {/* Actions */}
      <Section title="🛠 Actions" accent="#e91e63">
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <button onClick={onScreenshot} disabled={screenshotLoading} style={{ padding: "12px", background: screenshotLoading ? "rgba(255,255,255,0.05)" : "linear-gradient(135deg, #1565c0, #0d47a1)", color: screenshotLoading ? "rgba(255,255,255,0.3)" : "#fff", border: "none", borderRadius: 12, fontWeight: 700, fontSize: 13, cursor: screenshotLoading ? "not-allowed" : "pointer", boxShadow: "0 4px 16px rgba(21,101,192,0.2)" }}>
            {screenshotLoading ? "⏳ Capturing…" : "📸 Export as PNG"}
          </button>
          <button onClick={onReset} style={{ padding: "12px", background: "rgba(255,59,48,0.08)", color: "#ff3b30", border: "1px solid rgba(255,59,48,0.2)", borderRadius: 12, fontWeight: 700, fontSize: 13, cursor: "pointer" }}>
            🗑 Reset Everything
          </button>
        </div>
      </Section>
    </div>
  );
}
