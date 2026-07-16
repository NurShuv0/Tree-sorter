"""
Automated tests for the Tree Sorter accounts application.

Run with:
    python backend/manage.py test accounts

These tests use the Django test runner which creates a temporary test database
(test_tree_sorter) against MySQL, applies migrations, runs tests, and destroys
the database afterwards.

MySQL test database permissions required:
    GRANT ALL PRIVILEGES ON `test_tree_sorter`.* TO 'tree_sorter_user'@'localhost';
    GRANT ALL PRIVILEGES ON `test_tree_sorter`.* TO 'tree_sorter_user'@'127.0.0.1';
"""

from django.contrib.auth.models import User
from django.contrib.auth.tokens import default_token_generator
from django.utils.encoding import force_bytes
from django.utils.http import urlsafe_base64_encode
from rest_framework import status
from rest_framework.test import APIClient, APITestCase
from rest_framework_simplejwt.tokens import RefreshToken

from .models import UserProfile


# ── Test helpers ──────────────────────────────────────────────────────────────


def make_user(username="testuser", email="test@example.com", password="StrongPass123!"):
    """Create a user with a profile and return the user instance."""
    user = User.objects.create_user(username=username, email=email, password=password)
    UserProfile.objects.get_or_create(user=user)
    return user


def auth_client(user: User) -> APIClient:
    """Return an APIClient with a valid Bearer token for the given user."""
    client = APIClient()
    refresh = RefreshToken.for_user(user)
    client.credentials(HTTP_AUTHORIZATION=f"Bearer {str(refresh.access_token)}")
    return client


# ── Health ────────────────────────────────────────────────────────────────────


class HealthEndpointTests(APITestCase):
    def test_health_returns_200(self):
        response = self.client.get("/api/auth/health/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(response.data["success"])
        self.assertEqual(response.data["status"], "healthy")


# ── Registration ──────────────────────────────────────────────────────────────


class RegistrationTests(APITestCase):
    url = "/api/auth/register/"

    def _payload(self, **overrides):
        base = {
            "username": "newuser",
            "email": "new@example.com",
            "password": "StrongPass123!",
            "confirm_password": "StrongPass123!",
            "display_name": "New User",
        }
        base.update(overrides)
        return base

    def test_successful_registration(self):
        response = self.client.post(self.url, self._payload(), format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue(response.data["success"])
        self.assertIn("tokens", response.data)
        self.assertIn("access", response.data["tokens"])
        self.assertIn("refresh", response.data["tokens"])
        self.assertIn("user", response.data)
        # Verify profile was created
        user = User.objects.get(username="newuser")
        self.assertTrue(hasattr(user, "profile"))

    def test_duplicate_username_rejected(self):
        make_user(username="newuser")
        response = self.client.post(self.url, self._payload(), format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertFalse(response.data["success"])
        self.assertIn("username", response.data["errors"])

    def test_duplicate_email_rejected(self):
        make_user(email="new@example.com")
        response = self.client.post(
            self.url,
            self._payload(username="differentuser"),
            format="json",
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("email", response.data["errors"])

    def test_invalid_email_rejected(self):
        response = self.client.post(
            self.url, self._payload(email="not-an-email"), format="json"
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("email", response.data["errors"])

    def test_password_mismatch_rejected(self):
        response = self.client.post(
            self.url,
            self._payload(confirm_password="DifferentPass456!"),
            format="json",
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_weak_password_rejected(self):
        response = self.client.post(
            self.url,
            self._payload(password="123", confirm_password="123"),
            format="json",
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_password_not_returned_in_response(self):
        response = self.client.post(self.url, self._payload(), format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        user_data = response.data.get("user", {})
        self.assertNotIn("password", user_data)


# ── Login ─────────────────────────────────────────────────────────────────────


class LoginTests(APITestCase):
    url = "/api/auth/login/"

    def setUp(self):
        self.user = make_user(username="loginuser", email="login@example.com")

    def test_login_with_username(self):
        response = self.client.post(
            self.url,
            {"identifier": "loginuser", "password": "StrongPass123!"},
            format="json",
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(response.data["success"])
        self.assertIn("tokens", response.data)

    def test_login_with_email(self):
        response = self.client.post(
            self.url,
            {"identifier": "login@example.com", "password": "StrongPass123!"},
            format="json",
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(response.data["success"])

    def test_invalid_password_rejected(self):
        response = self.client.post(
            self.url,
            {"identifier": "loginuser", "password": "WrongPassword!"},
            format="json",
        )
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertFalse(response.data["success"])

    def test_nonexistent_user_rejected(self):
        response = self.client.post(
            self.url,
            {"identifier": "nobody@example.com", "password": "StrongPass123!"},
            format="json",
        )
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_inactive_user_rejected(self):
        self.user.is_active = False
        self.user.save()
        response = self.client.post(
            self.url,
            {"identifier": "loginuser", "password": "StrongPass123!"},
            format="json",
        )
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_generic_error_message(self):
        """Error must not reveal whether the account exists."""
        response = self.client.post(
            self.url,
            {"identifier": "loginuser", "password": "WrongPass!"},
            format="json",
        )
        self.assertEqual(response.data["message"], "Invalid login credentials.")


# ── Current User ──────────────────────────────────────────────────────────────


class MeTests(APITestCase):
    url = "/api/auth/me/"

    def setUp(self):
        self.user = make_user()

    def test_unauthenticated_request_rejected(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_authenticated_request_returns_user(self):
        client = auth_client(self.user)
        response = client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(response.data["success"])
        self.assertEqual(response.data["user"]["username"], "testuser")
        self.assertNotIn("password", response.data["user"])


# ── Token Refresh ─────────────────────────────────────────────────────────────


class TokenRefreshTests(APITestCase):
    url = "/api/auth/token/refresh/"

    def setUp(self):
        self.user = make_user()
        self.refresh = RefreshToken.for_user(self.user)

    def test_valid_refresh_returns_new_access_token(self):
        response = self.client.post(
            self.url, {"refresh": str(self.refresh)}, format="json"
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("access", response.data)

    def test_invalid_refresh_token_rejected(self):
        response = self.client.post(
            self.url, {"refresh": "invalid.token.here"}, format="json"
        )
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_refresh_token_rotation(self):
        """After rotation, a second refresh call with the same token should fail."""
        response1 = self.client.post(
            self.url, {"refresh": str(self.refresh)}, format="json"
        )
        self.assertEqual(response1.status_code, status.HTTP_200_OK)
        # The original refresh token is now blacklisted.
        response2 = self.client.post(
            self.url, {"refresh": str(self.refresh)}, format="json"
        )
        self.assertEqual(response2.status_code, status.HTTP_401_UNAUTHORIZED)


# ── Logout ────────────────────────────────────────────────────────────────────


class LogoutTests(APITestCase):
    url = "/api/auth/logout/"

    def setUp(self):
        self.user = make_user()

    def test_logout_blacklists_token(self):
        refresh = RefreshToken.for_user(self.user)
        client = auth_client(self.user)
        response = client.post(self.url, {"refresh": str(refresh)}, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(response.data["success"])

        # Trying to refresh with the blacklisted token should fail.
        refresh_response = self.client.post(
            "/api/auth/token/refresh/", {"refresh": str(refresh)}, format="json"
        )
        self.assertEqual(refresh_response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_logout_safe_with_no_token(self):
        """Logout should succeed even when no refresh token is provided."""
        client = auth_client(self.user)
        response = client.post(self.url, {}, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)


# ── Profile Update ────────────────────────────────────────────────────────────


class ProfileUpdateTests(APITestCase):
    url = "/api/auth/me/"

    def setUp(self):
        self.user = make_user()
        self.client = auth_client(self.user)

    def test_update_display_name(self):
        response = self.client.patch(
            self.url, {"display_name": "Updated Name"}, format="json"
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["user"]["display_name"], "Updated Name")

    def test_duplicate_email_rejected(self):
        make_user(username="other", email="other@example.com")
        response = self.client.patch(
            self.url, {"email": "other@example.com"}, format="json"
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("email", response.data["errors"])

    def test_protected_fields_not_updatable(self):
        """is_staff and is_superuser must not be changed through the profile endpoint."""
        response = self.client.patch(
            self.url,
            {"is_staff": True, "is_superuser": True},
            format="json",
        )
        # The request succeeds (ignoring unknown fields) but the user is not elevated.
        self.user.refresh_from_db()
        self.assertFalse(self.user.is_staff)
        self.assertFalse(self.user.is_superuser)


# ── Change Password ───────────────────────────────────────────────────────────


class ChangePasswordTests(APITestCase):
    url = "/api/auth/change-password/"

    def setUp(self):
        self.user = make_user()
        self.api_client = auth_client(self.user)

    def test_successful_password_change(self):
        response = self.api_client.post(
            self.url,
            {
                "current_password": "StrongPass123!",
                "new_password": "NewSecurePass456!",
                "confirm_new_password": "NewSecurePass456!",
            },
            format="json",
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(response.data["success"])
        # Verify password actually changed.
        self.user.refresh_from_db()
        self.assertTrue(self.user.check_password("NewSecurePass456!"))

    def test_wrong_current_password_rejected(self):
        response = self.api_client.post(
            self.url,
            {
                "current_password": "WrongPassword!",
                "new_password": "NewSecurePass456!",
                "confirm_new_password": "NewSecurePass456!",
            },
            format="json",
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("current_password", response.data["errors"])

    def test_password_mismatch_rejected(self):
        response = self.api_client.post(
            self.url,
            {
                "current_password": "StrongPass123!",
                "new_password": "NewSecurePass456!",
                "confirm_new_password": "DifferentPass789!",
            },
            format="json",
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)


# ── Forgot Password ───────────────────────────────────────────────────────────


class ForgotPasswordTests(APITestCase):
    url = "/api/auth/forgot-password/"

    def setUp(self):
        self.user = make_user(email="forgot@example.com")

    def test_generic_response_for_existing_email(self):
        response = self.client.post(
            self.url, {"email": "forgot@example.com"}, format="json"
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(response.data["success"])
        self.assertIn("If an account exists", response.data["message"])

    def test_generic_response_for_unknown_email(self):
        """Same response as for existing email – prevents enumeration."""
        response = self.client.post(
            self.url, {"email": "nobody@example.com"}, format="json"
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(response.data["success"])

    def test_invalid_email_still_returns_generic(self):
        response = self.client.post(
            self.url, {"email": "not-an-email"}, format="json"
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)


# ── Reset Password ────────────────────────────────────────────────────────────


class ResetPasswordTests(APITestCase):
    url = "/api/auth/reset-password/"

    def setUp(self):
        self.user = make_user(email="reset@example.com")
        self.uid = urlsafe_base64_encode(force_bytes(self.user.pk))
        self.token = default_token_generator.make_token(self.user)

    def _payload(self, **overrides):
        base = {
            "uid": self.uid,
            "token": self.token,
            "new_password": "BrandNewPass999!",
            "confirm_new_password": "BrandNewPass999!",
        }
        base.update(overrides)
        return base

    def test_successful_reset(self):
        response = self.client.post(self.url, self._payload(), format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(response.data["success"])
        self.user.refresh_from_db()
        self.assertTrue(self.user.check_password("BrandNewPass999!"))

    def test_invalid_token_rejected(self):
        response = self.client.post(
            self.url, self._payload(token="invalid-token"), format="json"
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertFalse(response.data["success"])

    def test_invalid_uid_rejected(self):
        response = self.client.post(
            self.url, self._payload(uid="invalid-uid"), format="json"
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertFalse(response.data["success"])

    def test_password_mismatch_rejected(self):
        response = self.client.post(
            self.url,
            self._payload(confirm_new_password="MismatchPass000!"),
            format="json",
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
