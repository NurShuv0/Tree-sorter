"""Django admin registrations for the accounts application."""

from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth.models import User

from .models import UserProfile


class UserProfileInline(admin.StackedInline):
    model = UserProfile
    can_delete = False
    verbose_name_plural = "Profile"
    fields = ("display_name", "avatar_url", "location", "bio")


class UserAdmin(BaseUserAdmin):
    """Extended user admin that embeds the profile inline."""

    inlines = (UserProfileInline,)


# Re-register User with the extended admin.
admin.site.unregister(User)
admin.site.register(User, UserAdmin)


@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    list_display = ("user", "display_name", "location", "created_at", "updated_at")
    list_filter = ("created_at",)
    search_fields = ("user__username", "user__email", "display_name", "location")
    readonly_fields = ("created_at", "updated_at")
    ordering = ("-created_at",)
