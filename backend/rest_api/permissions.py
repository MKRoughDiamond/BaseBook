from rest_framework import permissions


class IsCurrUser(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if obj.author_id == request.user.id:
            return True
        else:
            return request.method == 'GET' and obj.scope == 'Public';
            
class IsCurrUserReply(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if obj.author_id == request.user.id:
            return True
        else:
            return request.method == 'GET';
