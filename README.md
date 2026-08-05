# 🌳 Tree Sorter

A full-stack plant management application featuring AI-powered tree guidance, disease scanning, plant browsing, weather integration, and a complete user authentication system.

---

## Technology Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, TypeScript, Vite, Tailwind CSS v4 |
| UI Components | Radix UI, Lucide React, Sonner |
| Routing | React Router v7 |
| Auth | JWT (djangorestframework-simplejwt) |
| Disease Classifier | TensorFlow.js (`@tensorflow/tfjs`, `@tensorflow/tfjs-tflite`), EfficientNetV2B0 TFLite (100% on-device WASM) |
| Django API | Python 3.10+, Django 4.2, Django REST Framework |
| AI Chat API | Node.js, Express 5, Ollama / Gemini |
| Database | MySQL 8.0+ (utf8mb4) |

---

## Prerequisites

- **Node.js** 18 or newer (with npm)
- **Python** 3.10 or newer (`python` available in PATH)
- **MySQL Server** 8.0 or newer running on port 3306
- **Git**

---

## 1. Clone and Install Node Dependencies

```powershell
git clone <your-repo-url>
cd Tree-sorter-main
npm install
```

---

## 2. Configure Frontend Environment

```powershell
copy .env.example .env
```

The `.env` file contains defaults that work for local development. Key variables:

| Variable | Purpose |
|---|---|
| `VITE_DJANGO_API_URL` | Django auth API (`http://localhost:8000/api`) |
| `VITE_CHAT_API_URL` | Express AI chat API (`http://localhost:5000/api`) |
| `GEMINI_API_KEY` | Optional – only needed for Gemini AI provider |
| `AI_PROVIDER` | `ollama` (local) or `gemini` |

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

Create a dedicated application user (for both localhost and 127.0.0.1):

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

The test runner creates a temporary `test_tree_sorter` database:

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

All other values have sensible defaults for local development.

### Run migrations:

```powershell
# Option A: npm scripts (uses venv Python automatically)
npm run django:migrate

# Option B: venv Python directly
backend\.venv\Scripts\python.exe backend\manage.py migrate
```

Create a Django superuser (for admin panel):

```powershell
# Option A
backend\.venv\Scripts\python.exe backend\manage.py createsuperuser

# Option B: activate venv first, then run in the same terminal
backend\.venv\Scripts\activate
python backend\manage.py createsuperuser
```

Verify the configuration:

```powershell
npm run django:check
# or: backend\.venv\Scripts\python.exe backend\manage.py check
```

---

## 5. Running the Application

Three processes must run simultaneously during local development. Open three PowerShell terminals.

**Terminal 1 – Django API (port 8000)**

Option A – direct venv Python (recommended, works in any prompt):
```powershell
backend\.venv\Scripts\python.exe backend\manage.py runserver 8000
```

Option B – activate venv first, then run (all in the same terminal session):
```powershell
backend\.venv\Scripts\activate
python backend\manage.py runserver 8000
```

Or use the npm script:
```powershell
npm run django:run
```

**Terminal 2 – Express AI Chat API (port 5000)**

```powershell
npm run server
```

**Terminal 3 – Vite Frontend (port 5173)**

```powershell
npm run dev
```

---

## 6. Development URLs

| Service | URL |
|---|---|
| Frontend (Vite) | http://localhost:5173 |
| Django Admin | http://localhost:8000/admin/ |
| Django API Health | http://localhost:8000/api/auth/health/ |
| Express AI Chat | http://localhost:5000/api/chat |

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

## 8. Running Backend Tests

```powershell
python backend\manage.py test accounts
```

Or:

```powershell
npm run django:test
```

Tests run against MySQL (creating `test_tree_sorter` temporarily).

---

## 9. Frontend Build

```powershell
npm run build
```

Output goes to `dist/`.

---

## 10. AI Plant Disease Classifier (On-Device WASM)

The application features an **on-device AI Plant Disease Classifier** powered by an **EfficientNetV2B0** TFLite model (`public/plant_disease_classifier_float32.tflite`).

### Key Features & Architecture

- **100% On-Device & Private**: Inference runs locally in the user's browser using `@tensorflow/tfjs-tflite` WebAssembly. No plant photos are ever uploaded to an external server.
- **38 Canonical Disease & Health Classes**: Covers 14 plant varieties (Apple, Tomato, Potato, Corn, Grape, Bell Pepper, Peach, Cherry, Strawberry, Blueberry, Raspberry, Squash, Soybean, Orange) with detailed diagnostic metadata.
- **Full Care Guidance**: Each diagnosis provides confidence %, severity rating, visual symptoms/observations, 5-step immediate care plan, long-term prevention tips, and alternate condition candidates.
- **Integrated AI Assistant**: 1-click option to ask the AI Tree Guide follow-up questions pre-populated with the scan diagnosis.
- **Cross-Origin Isolation**: Dev server configured with `Cross-Origin-Opener-Policy` (COOP) and `Cross-Origin-Embedder-Policy` (COEP) headers in `vite.config.ts` for WASM multi-threading support.

---

## 11. Troubleshooting

### MySQL: Access denied

Check `DB_USER`, `DB_PASSWORD`, `DB_HOST` in `backend/.env`.
Verify the MySQL user has the correct host (`localhost` vs `127.0.0.1`).

### MySQL: Unknown database

Run the `CREATE DATABASE` SQL from section 3 above.

### PyMySQL: ImportError

```powershell
cd backend && .venv\Scripts\activate && pip install PyMySQL cryptography
```

### Django: Cannot create test database

Grant test database permissions (see section 3, test permissions).

### Bangla text appears corrupted

Confirm the database was created with `utf8mb4` charset (see section 3).

### CORS errors in browser

Ensure the Django server is running on port 8000 and `CORS_ALLOWED_ORIGINS` in
`backend/config/settings.py` includes `http://localhost:5173`.

---

## 12. Production Readiness Notes

Before deploying to production:

- Set `DJANGO_DEBUG=False`
- Generate a 50+ character random `DJANGO_SECRET_KEY`
- Set `DJANGO_ALLOWED_HOSTS` to your real domain only
- Update `CORS_ALLOWED_ORIGINS` to your real frontend URL
- Use HTTPS everywhere
- Consider moving JWT tokens to secure, HttpOnly, SameSite cookies
- Use a managed MySQL instance with SSL connections
- Do NOT expose port 3306 publicly
- Set up automated database backups
- Store secrets in a secret manager (e.g., AWS Secrets Manager)
- Add rate limiting to register, login, and forgot-password endpoints
- Configure an SMTP email provider (replace console backend)
- Add error monitoring (e.g., Sentry)
- Add structured logging (without secrets)
