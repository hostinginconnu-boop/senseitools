require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "SenseiTools API running 🚀", version: "1.0.0" });
});

app.get("/api/templates", (req, res) => {
  res.json({
    templates: [
      {
        id: "love",
        name: "Love Chat 💕",
        contact: { name: "Sophia 💖", avatar: "https://ui-avatars.com/api/?name=Sophia&background=e91e63&color=fff&size=128&bold=true&rounded=true", verified: false },
        messages: [
          { text: "Good morning beautiful 🌅", sender: "me", time: "08:12", status: "read" },
          { text: "Morning!! Did you sleep well? 😍", sender: "contact", time: "08:14", status: "read" },
          { text: "Dreamed of you 💭❤️", sender: "me", time: "08:15", status: "delivered" },
        ],
      },
      {
        id: "friends",
        name: "Friend Group 🎉",
        contact: { name: "Alex 🔥", avatar: "https://ui-avatars.com/api/?name=Alex&background=ff6b35&color=fff&size=128&bold=true&rounded=true", verified: false },
        messages: [
          { text: "Bro are you coming tonight?? 🎮", sender: "contact", time: "19:00", status: "read" },
          { text: "100% bro, I'll bring the snacks 🍕", sender: "me", time: "19:02", status: "read" },
          { text: "LESSGOOO 🔥🔥🔥", sender: "contact", time: "19:03", status: "read" },
        ],
      },
      {
        id: "work",
        name: "Work Chat 💼",
        contact: { name: "Manager 📊", avatar: "https://ui-avatars.com/api/?name=Manager&background=2196f3&color=fff&size=128&bold=true&rounded=true", verified: true },
        messages: [
          { text: "Hey, is the report ready for the meeting?", sender: "contact", time: "09:30", status: "read" },
          { text: "Yes! Sending it over in 5 minutes ✅", sender: "me", time: "09:31", status: "read" },
          { text: "Perfect, thanks! 👍", sender: "contact", time: "09:32", status: "read" },
        ],
      },
    ],
  });
});

// Serve React build — cherche client/dist dans plusieurs chemins possibles
const POSSIBLE_BUILD_PATHS = [
  path.join(__dirname, "../client/dist"),
  path.join(process.cwd(), "client/dist"),
];

const buildPath = POSSIBLE_BUILD_PATHS.find((p) => fs.existsSync(p));

if (process.env.NODE_ENV === "production") {
  if (buildPath) {
    console.log(`📁 Serving static from: ${buildPath}`);
    app.use(express.static(buildPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(buildPath, "index.html"));
    });
  } else {
    console.warn("⚠️  client/dist not found — run the build first.");
  }
}

app.listen(PORT, () => {
  console.log(`✅ SenseiTools running on port ${PORT} [${process.env.NODE_ENV || "development"}]`);
});
