import { useState, useRef, useEffect } from "react";
import html2canvas from "html2canvas";
import ControlPanel from "./components/ControlPanel.jsx";
import ChatPreview from "./components/ChatPreview.jsx";
import { useMessages } from "./hooks/useMessages.js";
import { getCurrentTime } from "./utils/time.js";

const DEFAULT_CONTACT = {
  name: "Sarah ✨",
  avatar: "https://ui-avatars.com/api/?name=Sarah&background=25D366&color=fff&size=128&bold=true&rounded=true",
  verified: false,
};

export default function App() {
  const [contact, setContact] = useState(DEFAULT_CONTACT);
  const [showSystemTime, setShowSystemTime] = useState(true);
  const [systemTime, setSystemTime] = useState(getCurrentTime());
  const [screenshotLoading, setScreenshotLoading] = useState(false);
  const [templates, setTemplates] = useState([]);
  const chatRef = useRef(null);

  const { messages, addMessage, removeMessage, reorder, reset, loadTemplate } = useMessages();

  // Tick system time
  useEffect(() => {
    const t = setInterval(() => setSystemTime(getCurrentTime()), 30000);
    return () => clearInterval(t);
  }, []);

  // Fetch templates from API
  useEffect(() => {
    fetch("/api/templates")
      .then((r) => r.json())
      .then((data) => setTemplates(data.templates || []))
      .catch(() => {}); // silently fail if no backend
  }, []);

  const handleScreenshot = async () => {
    if (!chatRef.current) return;
    setScreenshotLoading(true);
    try {
      const canvas = await html2canvas(chatRef.current, {
        useCORS: true,
        scale: 2,
        backgroundColor: null,
        logging: false,
      });
      const link = document.createElement("a");
      link.download = `whatsapp-chat-${Date.now()}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    } catch {
      alert("Screenshot failed. Check CORS or try a different avatar URL.");
    }
    setScreenshotLoading(false);
  };

  // Attach loadTemplate to onAdd so ControlPanel can call it via templates
  const boundAdd = Object.assign(addMessage, { _loadTemplate: loadTemplate });

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column", overflow: "hidden" }}>
      {/* ── Header ── */}
      <header style={{
        flexShrink: 0,
        background: "rgba(255,255,255,0.025)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        padding: "14px 28px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        backdropFilter: "blur(24px)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{
            width: 38, height: 38,
            background: "linear-gradient(135deg, #25D366, #075E54)",
            borderRadius: 11,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 20, boxShadow: "0 4px 14px rgba(37,211,102,0.35)",
          }}>⚡</div>
          <div>
            <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 19, letterSpacing: "-0.4px", color: "#fff" }}>
              SenseiTools
            </div>
            <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "1.8px", textTransform: "uppercase", color: "#25D366", opacity: 0.8 }}>
              WhatsApp Chat Generator
            </div>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ fontSize: 12, color: "rgba(255,255,255,0.25)" }}>
            Made with ❤️ by{" "}
            <span style={{ color: "#25D366", fontWeight: 700 }}>INCONNU BOY</span>
          </div>
          <div style={{ fontSize: 11, padding: "4px 10px", borderRadius: 20, background: "rgba(37,211,102,0.1)", border: "1px solid rgba(37,211,102,0.2)", color: "#25D366", fontWeight: 600 }}>
            v1.0.0
          </div>
        </div>
      </header>

      {/* ── Body ── */}
      <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
        {/* Left control panel */}
        <ControlPanel
          contact={contact}
          setContact={setContact}
          showSystemTime={showSystemTime}
          setShowSystemTime={setShowSystemTime}
          messages={messages}
          onAdd={boundAdd}
          onRemove={removeMessage}
          onReorder={reorder}
          onReset={reset}
          onScreenshot={handleScreenshot}
          screenshotLoading={screenshotLoading}
          templates={templates}
        />

        {/* Right preview */}
        <div style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "28px 32px",
          background: "radial-gradient(ellipse 70% 70% at 50% 50%, #0d1f1a 0%, #060c09 100%)",
          overflow: "auto",
          position: "relative",
        }}>
          {/* Background glow */}
          <div style={{ position: "absolute", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(37,211,102,0.06) 0%, transparent 70%)", pointerEvents: "none" }} />

          <ChatPreview
            ref={chatRef}
            contact={contact}
            messages={messages}
            showSystemTime={showSystemTime}
            systemTime={systemTime}
          />
        </div>
      </div>

      {/* ── Footer ── */}
      <footer style={{
        flexShrink: 0,
        textAlign: "center",
        padding: "8px",
        color: "rgba(255,255,255,0.15)",
        fontSize: 11,
        borderTop: "1px solid rgba(255,255,255,0.04)",
        background: "rgba(0,0,0,0.2)",
      }}>
        SenseiTools · Fake WhatsApp Chat Generator · Made by{" "}
        <span style={{ color: "#25D366" }}>INCONNU BOY</span> · For educational & creative use only
      </footer>
    </div>
  );
        }
      
