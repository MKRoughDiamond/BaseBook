from django.shortcuts import render
from django.http import HttpResponse
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.db import IntegrityError
from django.contrib.sessions.backends.db import SessionStore

from rest_api.serializers import UserSerializer, FeedListSerializer, FeedSerializer, ReplySerializer
from core.models import Feed, Reply
#from core.models import BaseUser, Friend, Feed, Reply, Picture


def options_cors():
    response = HttpResponse()
    response['Access-Control-Allow-Origin'] = '*'
    response['Access-Control-Allow-Methods'] = 'POST, GET, OPTIONS'
    response['Access-Control-Max-Age'] = 1000
    # note that '*' is not valid for Access-Control-Allow-Headers
    response['Access-Control-Allow-Headers'] = 'origin, x-csrftoken, content-type, accept'
    return response

# may only admin can access
class UserList(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    #permission_classes =

class UserDetail(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class user_login(APIView):
    permission_classes = (permissions.AllowAny,)
    
    def post(self, request):
        username = request.data.get('id', None)
        password = request.data.get('password', None)
        if username is None or password is None:
            return Response('Bad request', status=400)
        
        user = authenticate(username=username, password=password)
        if user is not None:
            if user.is_active:
                request.session.set_expiry(86400) #sets the exp. value of the session
                login(request, user) #the user is now logged in
                return Response('login success',status=200)
            return Response('login fail',status=403)
        else:
            return Response('login fail',status=400)
    
    def options(self, request):
        return options_cors()

class user_signup(APIView):
    permission_classes = (permissions.AllowAny,)
    
    def post(self, request):
        username = request.data.get('id', None)
        password = request.data.get('password', None)
        if username is None or password is None:
            return Response('Bad request', status=400)
        try:
            user = User.objects.create_user(username, 'default@email.com', password)
        except IntegrityError:
            return Response('BaseUser duplication', status=400)
        user.save()
        return Response('',status=200)
    
    def options(self, request):
        return options_cors()

class FeedList(APIView):

    def get(self, request):
        feeds = Feed.objects.filter(author__id=request.session['_auth_user_id'])
        serializer = FeedListSerializer(feeds)
        return Response(serializer.data)

    def post(self, request):
        contents = request.data.get('contents', None)
        if contents is None:
            return Response('No Contents', status=400)
        feed = Feed(author_id=request.session['_auth_user_id'], contests=contents)
        feed.save()
        return Response('', status=200)

class FeedDetail(generics.RetrieveAPIView):
    #permission_classes
    queryset = Feed.objects.all()
    serializer_class = FeedSerializer

class ReplyList(APIView):
    #permission_classes
    def get(self, request, pk):
        replies = Reply.objects.filter(feed_id=pk)
        serializer = ReplySerializer(replies, many=True)
        return Response(serializer.data)

    def post(self, request, pk):
        if not '_auth_user_id' in request.session:
            return Response('Not Found', status=404)

        contents = request.data.get('contents', None)
        if contents is None:
            return Response('No Contents', status=400)
        reply = Reply(feed_id=pk, contents=contents, author_id=request.session['_auth_user_id'])
        reply.save()
        return Response('', status=200)
