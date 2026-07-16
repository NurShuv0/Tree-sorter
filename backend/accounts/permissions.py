# accounts/permissions.py
# Custom DRF permission classes (none required beyond IsAuthenticated / AllowAny
# for the current feature set, but this module is a placeholder for future
# role-based or object-level permissions).

from rest_framework.permissions import BasePermission


class IsSelf(BasePermission):
    """Allow access only when the requesting user matches the object's user."""

    def has_object_permission(self, request, view, obj) -> bool:
        return bool(request.user and request.user == obj)
