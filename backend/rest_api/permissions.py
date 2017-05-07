from rest_framework import permissions


class IsCurrUser(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if str(obj.author_id) == request.session['_auth_user_id']:
            return True
        else:
            return request.method == 'GET' and obj.scope == 'Public';
            
class IsCurrUserReply(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if str(obj.author_id) == request.session['_auth_user_id']:
            return True
        else:
            return request.method == 'GET';
