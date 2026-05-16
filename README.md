# ⚡ SenseiTools — Fake WhatsApp Chat Generator

> Create realistic WhatsApp conversations instantly.  
> Made with ❤️ by **INCONNU BOY**

---

## 📁 Project Structure

```
senseitools/
├── server/
│   └── index.js          # Express API server
├── client/
│   ├── public/
│   │   └── favicon.svg
│   ├── src/
│   │   ├── components/
│   │   │   ├── ControlPanel.jsx   # Left sidebar with all controls
│   │   │   ├── ChatPreview.jsx    # Phone mockup + WhatsApp UI
│   │   │   └── StatusIcon.jsx     # ✓ ✓✓ ✓✓(blue) SVG icons
│   │   ├── hooks/
│   │   │   └── useMessages.js     # Message state management
│   │   ├── utils/
│   │   │   └── time.js            # Time helpers
│   │   ├── App.jsx                # Root component
│   │   ├── main.jsx               # Entry point
│   │   └── index.css              # Global styles + Tailwind
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── package.json
├── package.json           # Root (Express deps + scripts)
├── vercel.json            # Vercel config
├── render.yaml            # Render config
├── Procfile               # Railway / Heroku
├── .env.example
└── .gitignore
```

---

## 🚀 Local Development

```bash
# 1. Clone & install root deps
npm install

# 2. Install client deps
cd client && npm install && cd ..

# 3. Copy env
cp .env.example .env

# 4. Run both server + client (hot reload)
npm run dev
```

- Client: http://localhost:5173  
- API: http://localhost:3001/api/health

---

## ☁️ Deploy on Vercel

> Best for **static-first** deployment (API routes as serverless functions).

```bash
npm i -g vercel
vercel login
vercel --prod
```

Or connect your GitHub repo in the Vercel dashboard:
- **Build Command:** `cd client && npm install && npm run build`
- **Output Directory:** `client/dist`
- **Install Command:** `npm install`

---

## 🟣 Deploy on Render

1. Push to GitHub
2. Go to [render.com](https://render.com) → New → Web Service
3. Connect your repo
4. Settings:
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `npm start`
   - **Environment:** Node
5. Add env var: `NODE_ENV=production`

Or use the included `render.yaml` — Render will auto-detect it.

---

## 🚂 Deploy on Railway

1. Push to GitHub
2. Go to [railway.app](https://railway.app) → New Project → Deploy from GitHub
3. Railway auto-detects `Procfile` and `package.json`
4. Add env var: `NODE_ENV=production`

Done! Railway will run `npm start` automatically.

---

## ✨ Features

- 💬 Add messages with custom text, sender, time, and status
- 👤 Custom contact name + avatar (URL or file upload)
- ↕️ Drag & drop to reorder messages
- 🗑 Delete individual messages
- 📸 Export chat as PNG via html2canvas
- 📂 Pre-built templates loaded from API
- 🎨 Pixel-perfect WhatsApp UI replica
- 📱 Phone frame mockup with notch
- 🌓 Dark control panel + light WhatsApp preview

---

## 🛠 Tech Stack

| Layer | Tech |
|-------|------|
| Frontend | React 18 + Vite |
| Styling | Tailwind CSS + inline styles |
| Screenshot | html2canvas |
| Backend | Express.js |
| Deploy | Vercel / Render / Railway |

---

*SenseiTools · For educational & creative use only*
