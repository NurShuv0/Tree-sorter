"""
Django settings for Tree Sorter Django REST API.
All secrets and environment-specific values are loaded from the .env file.
"""

import os
from datetime import timedelta
from pathlib import Path

from dotenv import load_dotenv

# ── Paths ─────────────────────────────────────────────────────────────────────
BASE_DIR = Path(__file__).resolve().parent.parent

# Load .env from the backend directory
load_dotenv(BASE_DIR / ".env")

# ── Security ──────────────────────────────────────────────────────────────────
SECRET_KEY = os.getenv(
    "DJANGO_SECRET_KEY",
    "django-insecure-change-this-in-production-immediately",
)

DEBUG = os.getenv("DJANGO_DEBUG", "True").strip().lower() in ("true", "1", "yes")

ALLOWED_HOSTS = [
    h.strip()
    for h in os.getenv("DJANGO_ALLOWED_HOSTS", "localhost,127.0.0.1").split(",")
    if h.strip()
]

FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:5173")

# ── Installed Applications ────────────────────────────────────────────────────
INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    # Third-party
    "rest_framework",
    "corsheaders",
    "rest_framework_simplejwt.token_blacklist",
    # Local
    "accounts",
    "garden",
]

# ── Middleware ────────────────────────────────────────────────────────────────
# corsheaders must appear before CommonMiddleware
MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "corsheaders.middleware.CorsMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

ROOT_URLCONF = "config.urls"

# ── Templates ─────────────────────────────────────────────────────────────────
TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "config.wsgi.application"

# ── Database – MySQL 8.0+ ─────────────────────────────────────────────────────
# Do NOT use SQLite. All data must go to MySQL.
DATABASES = {
    "default": {
        "ENGINE": os.getenv("DB_ENGINE", "django.db.backends.mysql"),
        "NAME": os.getenv("DB_NAME", "tree_sorter"),
        "USER": os.getenv("DB_USER", "tree_sorter_user"),
        "PASSWORD": os.getenv("DB_PASSWORD", ""),
        "HOST": os.getenv("DB_HOST", "127.0.0.1"),
        "PORT": os.getenv("DB_PORT", "3306"),
        "OPTIONS": {
            "charset": "utf8mb4",
            # Enforce strict SQL mode so invalid data is rejected at the DB level.
            "init_command": (
                "SET sql_mode="
                "'STRICT_TRANS_TABLES,"
                "NO_ZERO_DATE,"
                "NO_ZERO_IN_DATE,"
                "ERROR_FOR_DIVISION_BY_ZERO'"
            ),
        },
        # Keep connections alive for 60 s to reduce connection overhead.
        "CONN_MAX_AGE": 60,
    }
}

# ── Password Validation ───────────────────────────────────────────────────────
# In DEBUG mode use only the minimum-length validator so developers can
# register quickly without strong passwords.
# In production (DEBUG=False) all four validators are enforced.
if DEBUG:
    AUTH_PASSWORD_VALIDATORS = [
        {
            "NAME": (
                "django.contrib.auth.password_validation.MinimumLengthValidator"
            ),
            "OPTIONS": {"min_length": 8},
        },
    ]
else:
    AUTH_PASSWORD_VALIDATORS = [
        {
            "NAME": (
                "django.contrib.auth.password_validation"
                ".UserAttributeSimilarityValidator"
            )
        },
        {
            "NAME": (
                "django.contrib.auth.password_validation.MinimumLengthValidator"
            ),
            "OPTIONS": {"min_length": 8},
        },
        {
            "NAME": (
                "django.contrib.auth.password_validation.CommonPasswordValidator"
            )
        },
        {
            "NAME": (
                "django.contrib.auth.password_validation.NumericPasswordValidator"
            )
        },
    ]

# ── Internationalisation ──────────────────────────────────────────────────────
LANGUAGE_CODE = "en-us"
TIME_ZONE = "Asia/Dhaka"
USE_I18N = True
USE_TZ = True

# ── Static Files ──────────────────────────────────────────────────────────────
STATIC_URL = "static/"
STATIC_ROOT = BASE_DIR / "staticfiles"

MEDIA_URL = "media/"
MEDIA_ROOT = BASE_DIR / "media"

# ── Default Primary Key Field ─────────────────────────────────────────────────
DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

# ── Django REST Framework ─────────────────────────────────────────────────────
REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": (
        "rest_framework_simplejwt.authentication.JWTAuthentication",
    ),
    # All endpoints require authentication by default.
    # Views that are public must explicitly set permission_classes = [AllowAny].
    "DEFAULT_PERMISSION_CLASSES": (
        "rest_framework.permissions.IsAuthenticated",
    ),
    "DEFAULT_RENDERER_CLASSES": (
        "rest_framework.renderers.JSONRenderer",
    ),
}

# ── Simple JWT ────────────────────────────────────────────────────────────────
SIMPLE_JWT = {
    "ACCESS_TOKEN_LIFETIME": timedelta(
        minutes=int(os.getenv("ACCESS_TOKEN_MINUTES", "15"))
    ),
    "REFRESH_TOKEN_LIFETIME": timedelta(
        days=int(os.getenv("REFRESH_TOKEN_DAYS", "7"))
    ),
    # Rotation: every successful refresh issues a new refresh token and
    # invalidates the old one (blacklisted after rotation).
    "ROTATE_REFRESH_TOKENS": True,
    "BLACKLIST_AFTER_ROTATION": True,
    # Update auth_user.last_login on token generation.
    "UPDATE_LAST_LOGIN": True,
    "AUTH_HEADER_TYPES": ("Bearer",),
    "AUTH_HEADER_NAME": "HTTP_AUTHORIZATION",
    "USER_ID_FIELD": "id",
    "USER_ID_CLAIM": "user_id",
}

# ── CORS ──────────────────────────────────────────────────────────────────────
# Only allow the Vite dev server. In production, replace with your real domain.
CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:5174",
]
CORS_ALLOW_CREDENTIALS = True
# Do NOT use CORS_ALLOW_ALL_ORIGINS = True in production.

# ── Email ─────────────────────────────────────────────────────────────────────
# Default: console backend prints emails to the terminal for local development.
# In production, switch to an SMTP backend and configure a delivery provider.
EMAIL_BACKEND = os.getenv(
    "EMAIL_BACKEND",
    "django.core.mail.backends.console.EmailBackend",
)
DEFAULT_FROM_EMAIL = os.getenv("DEFAULT_FROM_EMAIL", "noreply@treesorter.local")

# SMTP Configuration (used if EMAIL_BACKEND is set to smtp)
EMAIL_HOST = os.getenv("EMAIL_HOST", "smtp.gmail.com")
EMAIL_PORT = int(os.getenv("EMAIL_PORT", 587))
EMAIL_HOST_USER = os.getenv("EMAIL_HOST_USER", "")
EMAIL_HOST_PASSWORD = os.getenv("EMAIL_HOST_PASSWORD", "")
EMAIL_USE_TLS = os.getenv("EMAIL_USE_TLS", "True").lower() in ("true", "1", "yes")
