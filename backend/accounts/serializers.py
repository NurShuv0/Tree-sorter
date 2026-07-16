"""
Serializers for the accounts application.

Validation is the authoritative layer – Django password validators and
field-level checks happen here before any database write.
"""

from django.contrib.auth.models import User
from django.contrib.auth.password_validation import validate_password
from django.contrib.auth.tokens import default_token_generator
from django.core.exceptions import ValidationError as DjangoValidationError
from django.utils.encoding import force_str
from django.utils.http import urlsafe_base64_decode
from rest_framework import serializers

from .models import UserProfile


# ── Helpers ───────────────────────────────────────────────────────────────────


def _run_password_validators(password: str, user: User | None = None) -> None:
    """
    Run Django's configured password validators.
    Raises serializers.ValidationError on failure.
    """
    try:
        validate_password(password, user=user)
    except DjangoValidationError as exc:
        raise serializers.ValidationError(list(exc.messages)) from exc


# ── Read serializers ──────────────────────────────────────────────────────────


class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ["display_name", "avatar_url", "location", "bio"]


class UserSerializer(serializers.ModelSerializer):
    """Safe read-only representation of a user. No password or admin fields."""

    display_name = serializers.CharField(source="profile.display_name")
    avatar_url = serializers.CharField(source="profile.avatar_url")
    location = serializers.CharField(source="profile.location")
    bio = serializers.CharField(source="profile.bio")

    class Meta:
        model = User
        fields = [
            "id",
            "username",
            "email",
            "display_name",
            "avatar_url",
            "location",
            "bio",
            "date_joined",
            "last_login",
        ]
        read_only_fields = fields


# ── Registration ──────────────────────────────────────────────────────────────


class RegisterSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=150)
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True, min_length=8)
    confirm_password = serializers.CharField(write_only=True)
    display_name = serializers.CharField(max_length=120, required=False, allow_blank=True)

    def validate_username(self, value: str) -> str:
        value = value.strip()
        if User.objects.filter(username__iexact=value).exists():
            raise serializers.ValidationError("This username is already taken.")
        return value

    def validate_email(self, value: str) -> str:
        value = User.objects.normalize_email(value)
        if User.objects.filter(email__iexact=value).exists():
            raise serializers.ValidationError("An account with this email already exists.")
        return value

    def validate(self, attrs: dict) -> dict:
        if attrs["password"] != attrs["confirm_password"]:
            raise serializers.ValidationError({"confirm_password": "Passwords do not match."})
        _run_password_validators(attrs["password"])
        return attrs

    def create(self, validated_data: dict) -> User:
        """Create User + UserProfile atomically inside a transaction."""
        from django.db import transaction

        with transaction.atomic():
            user = User.objects.create_user(
                username=validated_data["username"],
                email=validated_data["email"],
                password=validated_data["password"],
            )
            UserProfile.objects.create(
                user=user,
                display_name=validated_data.get("display_name", "").strip(),
            )
        return user


# ── Login ─────────────────────────────────────────────────────────────────────


class LoginSerializer(serializers.Serializer):
    """Accept either a username or an email in the identifier field."""

    identifier = serializers.CharField()
    password = serializers.CharField(write_only=True)


# ── Profile update ────────────────────────────────────────────────────────────


class UpdateProfileSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=150, required=False)
    email = serializers.EmailField(required=False)
    display_name = serializers.CharField(max_length=120, required=False, allow_blank=True)
    avatar_url = serializers.URLField(max_length=500, required=False, allow_blank=True)
    location = serializers.CharField(max_length=120, required=False, allow_blank=True)
    bio = serializers.CharField(max_length=500, required=False, allow_blank=True)

    def validate_username(self, value: str) -> str:
        value = value.strip()
        user = self.context["request"].user
        if User.objects.filter(username__iexact=value).exclude(pk=user.pk).exists():
            raise serializers.ValidationError("This username is already taken.")
        return value

    def validate_email(self, value: str) -> str:
        value = User.objects.normalize_email(value)
        user = self.context["request"].user
        if User.objects.filter(email__iexact=value).exclude(pk=user.pk).exists():
            raise serializers.ValidationError("An account with this email already exists.")
        return value

    def update(self, instance: User, validated_data: dict) -> User:
        from django.db import transaction

        with transaction.atomic():
            # User fields
            if "username" in validated_data:
                instance.username = validated_data["username"]
            if "email" in validated_data:
                instance.email = validated_data["email"]
            instance.save(update_fields=["username", "email"])

            # Profile fields
            profile: UserProfile = instance.profile
            profile_fields = ["display_name", "avatar_url", "location", "bio"]
            changed = []
            for field in profile_fields:
                if field in validated_data:
                    setattr(profile, field, validated_data[field])
                    changed.append(field)
            if changed:
                profile.save(update_fields=changed + ["updated_at"])

        instance.refresh_from_db()
        return instance


# ── Change Password ───────────────────────────────────────────────────────────


class ChangePasswordSerializer(serializers.Serializer):
    current_password = serializers.CharField(write_only=True)
    new_password = serializers.CharField(write_only=True, min_length=8)
    confirm_new_password = serializers.CharField(write_only=True)

    def validate(self, attrs: dict) -> dict:
        if attrs["new_password"] != attrs["confirm_new_password"]:
            raise serializers.ValidationError(
                {"confirm_new_password": "New passwords do not match."}
            )
        user = self.context["request"].user
        if not user.check_password(attrs["current_password"]):
            raise serializers.ValidationError(
                {"current_password": "The current password is incorrect."}
            )
        if attrs["current_password"] == attrs["new_password"]:
            raise serializers.ValidationError(
                {"new_password": "New password must be different from the current password."}
            )
        _run_password_validators(attrs["new_password"], user=user)
        return attrs


# ── Forgot / Reset Password ───────────────────────────────────────────────────


class ForgotPasswordSerializer(serializers.Serializer):
    email = serializers.EmailField()

    def validate_email(self, value: str) -> str:
        return User.objects.normalize_email(value)


class ResetPasswordSerializer(serializers.Serializer):
    uid = serializers.CharField()
    token = serializers.CharField()
    new_password = serializers.CharField(write_only=True, min_length=8)
    confirm_new_password = serializers.CharField(write_only=True)

    def validate(self, attrs: dict) -> dict:
        if attrs["new_password"] != attrs["confirm_new_password"]:
            raise serializers.ValidationError(
                {"confirm_new_password": "Passwords do not match."}
            )

        # Decode UID safely
        try:
            uid_decoded = force_str(urlsafe_base64_decode(attrs["uid"]))
            user = User.objects.get(pk=uid_decoded)
        except (TypeError, ValueError, OverflowError, User.DoesNotExist):
            raise serializers.ValidationError(
                {"uid": "This password-reset link is invalid or has expired."}
            )

        # Validate the token
        if not default_token_generator.check_token(user, attrs["token"]):
            raise serializers.ValidationError(
                {"token": "This password-reset link is invalid or has expired."}
            )

        _run_password_validators(attrs["new_password"], user=user)
        attrs["user"] = user
        return attrs
