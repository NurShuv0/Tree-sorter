# 🌳 Tree Sorter

A full-stack intelligent plant management application featuring a **live AI chatbot**, **on-device plant disease scanner**, **real-time weather integration**, plant browsing, and a complete JWT-based user authentication system.

---

## 🖥️ Technology Stack

| Layer | Technology |
|---|---|
| **Frontend** | React 18, TypeScript, Vite, Tailwind CSS v4 |
| **UI Components** | Radix UI, Lucide React, Sonner, Motion |
| **Routing** | React Router v7 |
| **AI Chat API** | Node.js, Express 5 — **Groq (Llama 3.3 70B)** / Gemini / Ollama |
| **Disease Classifier** | TensorFlow.js (`tfjs` + `tfjs-tflite`), EfficientNetV2B0 TFLite — 100% on-device WASM |
| **Weather** | Open-Meteo API (free, no key) + Browser Geolocation + OpenStreetMap Nominatim |
| **Django API** | Python 3.10+, Django 4.2, Django REST Framework |
| **Auth** | JWT (`djangorestframework-simplejwt`) |
| **Database** | MySQL 8.0+ (utf8mb4) |

---

## ✨ Features

- 🤖 **AI Tree Guide Chatbot** — Powered by **Groq Llama 3.3 70B** (free) with smart local knowledge fallback
- 🔬 **On-Device Disease Scanner** — 38 disease/health classes across 14 plant species, runs entirely in the browser (no uploads)
- 🌤️ **Live Weather** — Real GPS-based weather (temperature, humidity, condition) with city name and plant recommendations
- 🌿 **Plant Catalog** — Filterable/searchable plant database with care instructions and favorites
- 🔐 **Full Auth System** — Register, login, JWT refresh, password reset with email

---

## 📋 Prerequisites

- **Node.js** 18 or newer (with npm)
- **Python** 3.10 or newer (`python` available in PATH)
- **MySQL Server** 8.0 or newer running on port 3306
- **Git**

---

## 1. Clone and Install Node Dependencies

```powershell
git clone https://github.com/NurShuv0/Tree-sorter.git
cd Tree-sorter-main
npm install
```

---

## 2. Configure Environment Variables

```powershell
copy .env.example .env
```

Edit `.env` and fill in your values:

| Variable | Purpose | Required |
|---|---|---|
| `AI_PROVIDER` | `groq` (recommended), `gemini`, or `ollama` | Yes |
| `GROQ_API_KEY` | Free key from [console.groq.com](https://console.groq.com) — no credit card | If using Groq |
| `GEMINI_API_KEY` | From [aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey) | If using Gemini |
| `VITE_DJANGO_API_URL` | Django auth API (default: `http://localhost:8000/api`) | Yes |
| `VITE_CHAT_API_URL` | Express AI chat API (default: `http://localhost:5000/api`) | Yes |

> **Recommended**: Use Groq — it is completely free (just an email sign-up), very fast, and supports multi-turn conversation. No Google Cloud or credit card needed.

---

## 3. MySQL Database Setup

Open a MySQL prompt as root:

```bash
mysql -u root -p
```

Create the database:

```sql
CREATE DATABASE tree_sorter
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;
```

Create a dedicated application user:

```sql
CREATE USER 'tree_sorter_user'@'localhost'
  IDENTIFIED BY 'your-secure-password-here';

GRANT ALL PRIVILEGES ON tree_sorter.*
  TO 'tree_sorter_user'@'localhost';

CREATE USER 'tree_sorter_user'@'127.0.0.1'
  IDENTIFIED BY 'your-secure-password-here';

GRANT ALL PRIVILEGES ON tree_sorter.*
  TO 'tree_sorter_user'@'127.0.0.1';

FLUSH PRIVILEGES;
```

### Permissions for running Django tests

```sql
GRANT ALL PRIVILEGES ON `test_tree_sorter`.*
  TO 'tree_sorter_user'@'localhost';

GRANT ALL PRIVILEGES ON `test_tree_sorter`.*
  TO 'tree_sorter_user'@'127.0.0.1';
```

---

## 4. Django Backend Setup

### Create Python virtual environment

```powershell
cd backend
python -m venv .venv
.venv\Scripts\activate
python -m pip install --upgrade pip
python -m pip install -r requirements.txt
cd ..
```

### Configure backend environment

```powershell
copy backend\.env.example backend\.env
```

Edit `backend\.env` and set at minimum:

```env
DJANGO_SECRET_KEY=replace-with-a-long-random-secret-50-plus-chars
DB_PASSWORD=your-secure-password-here
```

### Run migrations

```powershell
# Option A: npm script (uses venv Python automatically)
npm run django:migrate

# Option B: venv Python directly
backend\.venv\Scripts\python.exe backend\manage.py migrate
```

Create a Django superuser (for admin panel):

```powershell
backend\.venv\Scripts\python.exe backend\manage.py createsuperuser
```

---

## 5. Running the Application

Three processes must run simultaneously. Open **three separate terminals**:

**Terminal 1 — Django REST API (port 8000)**

```powershell
backend\.venv\Scripts\python.exe backend\manage.py runserver 8000
```

**Terminal 2 — Express AI Chat API (port 5000)**

```powershell
npm run server
```

**Terminal 3 — Vite Frontend (port 5173)**

```powershell
npm run dev
```

Then open **[http://localhost:5173](http://localhost:5173)** in your browser.

---

## 6. Development URLs

| Service | URL | Description |
|---|---|---|
| **Frontend** | http://localhost:5173 | Main web application |
| **Express API** | http://localhost:5000 | AI Chat backend |
| **Express Health** | http://localhost:5000/api/health | API health check |
| **Django Admin** | http://localhost:8000/admin/ | Django admin panel |
| **Django API** | http://localhost:8000/api/auth/ | Auth REST API |

---

## 7. Authentication Endpoints

All endpoints are under `http://localhost:8000/api/auth/`.

| Method | Endpoint | Auth Required | Description |
|---|---|---|---|
| GET | `/health/` | No | Service health check |
| POST | `/register/` | No | Create account |
| POST | `/login/` | No | Sign in (username or email) |
| POST | `/token/refresh/` | No | Refresh access token |
| POST | `/logout/` | Yes | Blacklist refresh token |
| GET | `/me/` | Yes | Current user data |
| PATCH | `/me/` | Yes | Update profile |
| POST | `/change-password/` | Yes | Change password |
| POST | `/forgot-password/` | No | Send reset email |
| POST | `/reset-password/` | No | Reset with uid+token |

---

## 8. AI Chat API

The Express server at port 5000 supports three AI providers selectable via `AI_PROVIDER` in `.env`:

| Provider | `AI_PROVIDER` value | Key needed | Speed | Notes |
|---|---|---|---|---|
| **Groq** | `groq` | `GROQ_API_KEY` (free) | ⚡ Very fast | **Recommended** — Llama 3.3 70B |
| **Gemini** | `gemini` | `GEMINI_API_KEY` | Fast | Requires Google Cloud 2SV |
| **Ollama** | `ollama` | None | Slow (local GPU/CPU) | Requires Ollama installed locally |
| **Local Fallback** | automatic | None | Instant | Used if all providers fail — covers 38 diseases, 10 tree species |

### Get a free Groq key (< 2 minutes)

1. Visit [console.groq.com](https://console.groq.com) → Sign Up (email only)
2. Go to **API Keys** → **Create API Key**
3. Copy the key (`gsk_...`) and add to `.env`:
   ```env
   GROQ_API_KEY=gsk_your_key_here
   AI_PROVIDER=groq
   ```

---

## 9. Plant Disease Classifier (On-Device WASM)

The disease scanner runs **100% in the browser** using WebAssembly — no photos are ever uploaded.

- **Model**: EfficientNetV2B0 TFLite (`public/plant_disease_classifier_float32.tflite`)
- **38 disease/health classes** across 14 plant species (Apple, Tomato, Potato, Corn, Grape, Pepper, Peach, Cherry, Strawberry, Blueberry, Raspberry, Squash, Soybean, Orange)
- **Per-diagnosis output**: Confidence %, severity rating, visual symptoms, 5-step care plan, prevention tips
- **WASM headers**: Dev server configured with `Cross-Origin-Opener-Policy` (COOP) and `Cross-Origin-Embedder-Policy` (COEP) in `vite.config.ts` for multi-threading support

---

## 10. Live Weather

The Weather page uses **real GPS-based weather data** — no API key required:

- **Geolocation**: Browser `navigator.geolocation` API
- **Weather data**: [Open-Meteo](https://open-meteo.com) (free, no key, WMO weather codes)
- **City name**: [OpenStreetMap Nominatim](https://nominatim.openstreetmap.org) reverse geocoding
- **Plant recommendations**: Automatically filtered by live temperature, humidity, and season

> Allow location access when the browser prompts to see your real weather.

---

## 11. Running Tests

**Frontend chat API unit tests:**

```powershell
npm run test
```

**Django backend tests:**

```powershell
npm run django:test
# or: backend\.venv\Scripts\python.exe backend\manage.py test accounts
```

---

## 12. Production Build

```powershell
npm run build
```

Output goes to `dist/`. Serve with any static file server or CDN.

---

## 13. Troubleshooting

### AI chatbot gives generic answers

Ensure `GROQ_API_KEY` is set and `AI_PROVIDER=groq` in `.env`, then restart `npm run server`.

### Weather shows error / location denied

Click the location icon in your browser's address bar and allow access, then refresh the page.

### MySQL: Access denied

Check `DB_USER`, `DB_PASSWORD`, `DB_HOST` in `backend/.env`. Verify the MySQL user has the correct host (`localhost` vs `127.0.0.1`).

### MySQL: Unknown database

Run the `CREATE DATABASE` SQL from section 3 above.

### PyMySQL: ImportError

```powershell
cd backend
.venv\Scripts\activate
pip install PyMySQL cryptography
```

### Django: Cannot create test database

Grant test database permissions (see section 3, test permissions).

### Bangla text appears corrupted

Confirm the database was created with `utf8mb4` charset (see section 3).

### CORS errors in browser

Ensure the Django server is running on port 8000 and `CORS_ALLOWED_ORIGINS` in `backend/config/settings.py` includes `http://localhost:5173`.

---

## 14. Security Notes for Production

Before deploying:

- Set `DJANGO_DEBUG=False`
- Generate a 50+ character random `DJANGO_SECRET_KEY`
- Set `DJANGO_ALLOWED_HOSTS` to your real domain only
- Update `CORS_ALLOWED_ORIGINS` to your real frontend URL
- Use HTTPS everywhere
- Do NOT commit `.env` files to version control (already in `.gitignore`)
- Use a secret manager for `GROQ_API_KEY` and `GEMINI_API_KEY` in production
- Use a managed MySQL instance with SSL connections
- Do NOT expose port 3306 publicly
- Set up automated database backups
- Add rate limiting to register, login, and forgot-password endpoints
- Configure an SMTP email provider (replace console backend)
- Add error monitoring (e.g., Sentry)
