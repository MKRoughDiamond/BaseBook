from django.shortcuts import render
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
#from rest_framework.decorators import api_view

from rest_api.serializers import UserSerializer
#from core.models import BaseUser, Friend, Feed, Reply, Picture


# may only admin can access
class UserList(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    #permission_classes =

class UserDetail(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class user_login(APIView):
    def post(self, request):
        username = request.POST.get('id','')
        password = request.POST.get('password','')
        user = authenticate(username=username, password=password)
        if user is not None:
            if user.is_active:
                request.session.set_expiry(86400) #sets the exp. value of the session
                login(request, user) #the user is now logged in
                return Response('login success',status=200)
            return Response('login fail',status=403)
        else:
            return Response('login fail',status=400)

class user_signup(APIView):
    def post(self, request):
        username = request.GET.get('id', '')
        password = request.GET.get('password', '')

        try:
            user = User.objects.create_user(username, password=password)
        except User.IntegrityError:
            return Response('BaseUser duplication', status=400)
        user.save()
        return Response('BaseUser created successfully',status=200)