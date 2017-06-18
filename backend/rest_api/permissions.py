from rest_framework import permissions
from core.models import Friend


class IsCurrUser(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method == 'DELETE':
            return request.user == obj.author.user
        if request.method != 'GET':
            return True
        if obj.scope == 'Public':
            return True
        elif obj.scope == 'Friends Only':
            return request.user == obj.author.user or \
                request.user.id in list(Friend.objects.filter(baseuser__user=obj.author.user).values_list('friend', flat=True))
        else:
            return request.user == obj.author.user
            
class IsCurrUserReply(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method == 'DELETE':
            return request.user == obj.author.user
        if request.method == 'GET':
            return True
        if request.method == 'OPTIONS':
            return True
        return request.user == obj.author.user

    def has_permission(self, request, view):
        return True

class IsAuthNotOptions(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.method == 'OPTIONS':
            return True
        return permissions.IsAuthenticated.has_permission(self, request, view)
