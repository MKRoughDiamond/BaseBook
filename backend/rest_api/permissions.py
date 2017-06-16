from rest_framework import permissions
from core.models import Friend


class IsCurrUser(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method == 'DELETE':
            return request.user == obj.author
        if request.method != 'GET':
            return True
        if obj.scope == 'Public':
            return True
        elif obj.scope == 'Friends Only':
            return request.user == obj.author or \
                request.user.id in list(Friend.objects.filter(user=obj.author).values_list('friend', flat=True))
        else:
            return request.user == obj.author
            
class IsCurrUserReply(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method == 'DELETE':
            return request.user == obj.author
        if request.method == 'GET':
            return True
        if request.method == 'OPTIONS':
            return True
        return request.user == obj.author

    def has_permission(self, request, view):
        return True

class IsAuthNotOptions(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.method == 'OPTIONS':
            return True
        return permissions.IsAuthenticated.has_permission(self, request, view)
    
class IsAdminUser(permissions.BasePermission):
    """
    Allows access only to admin users.
    """
    def has_permission(self, request):
        return request.user and request.user.is_staff