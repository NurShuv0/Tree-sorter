"""
Authentication views for the Tree Sorter Django REST API.

All endpoints live under /api/auth/.

Security notes:
- Login errors are deliberately generic to avoid username/email enumeration.
- Forgot-password always returns the same message regardless of account existence.
- JWT tokens are never logged.
- TODO: Add django-ratelimit or similar rate limiting before production deployment.
  Apply to RegisterView, LoginView, ForgotPasswordView at a minimum.
"""

import logging

from django.conf import settings
from django.contrib.auth import update_session_auth_hash
from django.contrib.auth.models import User
from django.contrib.auth.tokens import default_token_generator
from django.core.mail import send_mail
from django.utils.encoding import force_bytes
from django.utils.http import urlsafe_base64_encode
from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.exceptions import TokenError
from rest_framework_simplejwt.tokens import RefreshToken

from .serializers import (
    ChangePasswordSerializer,
    ForgotPasswordSerializer,
    LoginSerializer,
    RegisterSerializer,
    ResetPasswordSerializer,
    UpdateProfileSerializer,
    UserSerializer,
)

logger = logging.getLogger(__name__)


# ── Helpers ───────────────────────────────────────────────────────────────────


def _tokens_for_user(user: User) -> dict:
    """Return a dict with access and refresh JWT strings for the given user."""
    refresh = RefreshToken.for_user(user)
    return {
        "access": str(refresh.access_token),
        "refresh": str(refresh),
    }


def _user_data(user: User) -> dict:
    """Serialize user to a safe response dict."""
    return UserSerializer(user).data


# ── Health ────────────────────────────────────────────────────────────────────


class HealthView(APIView):
    """
    GET /api/auth/health/
    Public endpoint. Confirms the Django service and MySQL are reachable.
    """

    permission_classes = [AllowAny]

    def get(self, request: Request) -> Response:
        # Perform a lightweight DB query to confirm MySQL connectivity.
        try:
            from django.db import connection

            with connection.cursor() as cursor:
                cursor.execute("SELECT 1")
            db_status = "mysql"
        except Exception:
            db_status = "unavailable"

        return Response(
            {
                "success": True,
                "service": "Tree Sorter Django API",
                "status": "healthy",
                "database": db_status,
            }
        )


# ── Register ──────────────────────────────────────────────────────────────────


class RegisterView(APIView):
    """
    POST /api/auth/register/
    Public endpoint. Creates a user + profile and returns JWT tokens.
    TODO: Add rate limiting (e.g., 10 registrations per hour per IP) in production.
    """

    permission_classes = [AllowAny]

    def post(self, request: Request) -> Response:
        serializer = RegisterSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(
                {
                    "success": False,
                    "message": "Please correct the highlighted fields.",
                    "errors": serializer.errors,
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        user = serializer.save()
        tokens = _tokens_for_user(user)

        return Response(
            {
                "success": True,
                "message": "Account created successfully.",
                "user": _user_data(user),
                "tokens": tokens,
            },
            status=status.HTTP_201_CREATED,
        )


# ── Login ─────────────────────────────────────────────────────────────────────


class LoginView(APIView):
    """
    POST /api/auth/login/
    Public endpoint. Accepts username or email in the 'identifier' field.
    Returns a generic error for any invalid credential to avoid enumeration.
    TODO: Add rate limiting (e.g., 20 attempts per 15 min per IP) in production.
    """

    permission_classes = [AllowAny]

    @staticmethod
    def _invalid_credentials_response() -> Response:
        return Response(
            {"success": False, "message": "Invalid login credentials."},
            status=status.HTTP_401_UNAUTHORIZED,
        )

    def post(self, request: Request) -> Response:
        serializer = LoginSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(
                {"success": False, "message": "Invalid login credentials."},
                status=status.HTTP_401_UNAUTHORIZED,
            )

        identifier: str = serializer.validated_data["identifier"].strip()
        password: str = serializer.validated_data["password"]

        # Resolve identifier to a User – try email first, then username.
        user: User | None = None
        if "@" in identifier:
            normalised_email = User.objects.normalize_email(identifier)
            try:
                user = User.objects.get(email__iexact=normalised_email)
            except User.DoesNotExist:
                pass
        if user is None:
            try:
                user = User.objects.get(username__iexact=identifier)
            except User.DoesNotExist:
                pass

        # Generic rejection – do not reveal whether the account exists.
        if user is None or not user.check_password(password) or not user.is_active:
            return self._invalid_credentials_response()

        # Update last_login (also done by SIMPLE_JWT UPDATE_LAST_LOGIN, belt-and-braces).
        from django.contrib.auth import login

        login(request, user, backend="django.contrib.auth.backends.ModelBackend")

        tokens = _tokens_for_user(user)
        return Response(
            {
                "success": True,
                "message": "Signed in successfully.",
                "user": _user_data(user),
                "tokens": tokens,
            }
        )


# ── Logout ────────────────────────────────────────────────────────────────────


class LogoutView(APIView):
    """
    POST /api/auth/logout/
    Authenticated endpoint. Blacklists the submitted refresh token.
    Safe – never crashes on invalid, expired, or missing tokens.
    """

    permission_classes = [IsAuthenticated]

    def post(self, request: Request) -> Response:
        refresh_token = request.data.get("refresh")
        if refresh_token:
            try:
                token = RefreshToken(refresh_token)
                token.blacklist()
            except TokenError:
                # Token is already invalid or blacklisted – that is fine.
                pass
            except Exception:
                # Never let logout crash the response.
                pass

        return Response({"success": True, "message": "Signed out successfully."})


# ── Current User ──────────────────────────────────────────────────────────────


class MeView(APIView):
    """
    GET  /api/auth/me/  – Return the authenticated user's data.
    PATCH /api/auth/me/ – Update profile fields.
    Both require a valid Bearer access token.
    """

    permission_classes = [IsAuthenticated]

    def get(self, request: Request) -> Response:
        user = request.user
        # Ensure profile exists (safety net for admin-created users).
        from .models import UserProfile

        UserProfile.objects.get_or_create(user=user)
        user.refresh_from_db()
        return Response({"success": True, "user": _user_data(user)})

    def patch(self, request: Request) -> Response:
        serializer = UpdateProfileSerializer(
            instance=request.user,
            data=request.data,
            partial=True,
            context={"request": request},
        )
        if not serializer.is_valid():
            return Response(
                {
                    "success": False,
                    "message": "Please correct the highlighted fields.",
                    "errors": serializer.errors,
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        user = serializer.update(request.user, serializer.validated_data)
        return Response(
            {
                "success": True,
                "message": "Profile updated successfully.",
                "user": _user_data(user),
            }
        )


# ── Change Password ───────────────────────────────────────────────────────────


class ChangePasswordView(APIView):
    """
    POST /api/auth/change-password/
    Authenticated endpoint. Verifies current password before changing.
    After a successful change the client should clear tokens and re-authenticate.
    """

    permission_classes = [IsAuthenticated]

    def post(self, request: Request) -> Response:
        serializer = ChangePasswordSerializer(
            data=request.data, context={"request": request}
        )
        if not serializer.is_valid():
            return Response(
                {
                    "success": False,
                    "message": "Please correct the highlighted fields.",
                    "errors": serializer.errors,
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        user = request.user
        user.set_password(serializer.validated_data["new_password"])
        user.save()

        # Attempt to blacklist all outstanding refresh tokens for this user.
        # This is best-effort – the client must also clear its stored tokens.
        try:
            from rest_framework_simplejwt.token_blacklist.models import (
                OutstandingToken,
            )

            for token in OutstandingToken.objects.filter(user=user):
                try:
                    token_obj = RefreshToken(token.token)
                    token_obj.blacklist()
                except Exception:
                    pass
        except Exception:
            pass

        return Response(
            {
                "success": True,
                "message": "Password changed successfully. Please sign in again.",
            }
        )


# ── Forgot Password ───────────────────────────────────────────────────────────


class ForgotPasswordView(APIView):
    """
    POST /api/auth/forgot-password/
    Public endpoint. Always returns the same generic response to prevent
    account enumeration via email lookup.
    TODO: Add rate limiting before production.
    """

    permission_classes = [AllowAny]

    @staticmethod
    def _generic_response() -> Response:
        return Response(
            {
                "success": True,
                "message": (
                    "If an account exists for that email, "
                    "password reset instructions have been sent."
                ),
            }
        )

    def post(self, request: Request) -> Response:
        serializer = ForgotPasswordSerializer(data=request.data)
        if not serializer.is_valid():
            # Still return generic success to avoid enumeration.
            return self._generic_response()

        email = serializer.validated_data["email"]

        try:
            user = User.objects.get(email__iexact=email, is_active=True)
        except User.DoesNotExist:
            # Account not found – return generic response without revealing that.
            return self._generic_response()

        uid = urlsafe_base64_encode(force_bytes(user.pk))
        token = default_token_generator.make_token(user)
        reset_url = (
            f"{settings.FRONTEND_URL}/reset-password?uid={uid}&token={token}"
        )

        send_mail(
            subject="Tree Sorter – Password Reset",
            message=(
                f"Hello {user.username},\n\n"
                "You requested a password reset for your Tree Sorter account.\n\n"
                f"Click the link below to reset your password:\n{reset_url}\n\n"
                "This link expires after a short time.\n\n"
                "If you did not request this, you can safely ignore this email.\n\n"
                "— The Tree Sorter Team"
            ),
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[user.email],
            fail_silently=True,
        )

        return self._generic_response()


# ── Reset Password ────────────────────────────────────────────────────────────


class ResetPasswordView(APIView):
    """
    POST /api/auth/reset-password/
    Public endpoint. Validates uid + token and sets the new password.
    Returns a generic invalid-link error without revealing which part failed.
    """

    permission_classes = [AllowAny]

    def post(self, request: Request) -> Response:
        serializer = ResetPasswordSerializer(data=request.data)
        if not serializer.is_valid():
            # Surface only the first meaningful error message.
            errors = serializer.errors
            first_error = next(iter(errors.values()))
            message = (
                first_error[0]
                if isinstance(first_error, list)
                else "This password-reset link is invalid or has expired."
            )
            return Response(
                {"success": False, "message": message},
                status=status.HTTP_400_BAD_REQUEST,
            )

        user: User = serializer.validated_data["user"]
        user.set_password(serializer.validated_data["new_password"])
        user.save()

        return Response(
            {"success": True, "message": "Your password has been reset successfully."}
        )
