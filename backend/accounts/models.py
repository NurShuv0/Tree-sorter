"""
UserProfile model – stores extended profile data for each Django User.

The standard django.contrib.auth.User model is used as-is.
Profile data is stored in this separate model with a OneToOne relation.
"""

from django.contrib.auth.models import User
from django.db import models


class UserProfile(models.Model):
    """Extended profile information for a registered user."""

    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        related_name="profile",
    )
    display_name = models.CharField(max_length=120, blank=True)
    avatar_url = models.URLField(max_length=500, blank=True)
    location = models.CharField(max_length=120, blank=True)
    # bio supports Bangla, English, emojis, and multilingual text via utf8mb4.
    bio = models.TextField(max_length=500, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "User Profile"
        verbose_name_plural = "User Profiles"

    def __str__(self) -> str:
        return f"Profile({self.user.username})"
