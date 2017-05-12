from django.shortcuts import render
from django.http import HttpResponse
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login
from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from django.db import IntegrityError
from django.core.exceptions import ObjectDoesNotExist

from rest_api.serializers import UserSerializer, FeedListSerializer, FeedSerializer, ReplySerializer, LikeSerializer, DislikeSerializer
from rest_api.permissions import IsCurrUser, IsCurrUserReply
from core.models import Feed, Reply
#from core.models import BaseUser, Friend, Feed, Reply, Picture


# This function is needed to support POST with JSON in firefox.
def options_cors():
    response = HttpResponse()
    response['Access-Control-Allow-Origin'] = '*'
    response['Access-Control-Allow-Methods'] = 'POST, GET, OPTIONS, DELETE'
    response['Access-Control-Max-Age'] = 1000
    # note that '*' is not valid for Access-Control-Allow-Headers
    response['Access-Control-Allow-Headers'] = 'origin, x-csrftoken, content-type, accept'
    return response

# may only admin can access
class UserList(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (permissions.IsAdminUser,)

class UserDetail(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class user_login(APIView):
    permission_classes = (permissions.AllowAny,)
    
    def post(self, request):
        if request.user is not None:
            return Response('',status=200)
        else:
            return Response({'message': 'Invalid ID and password.'},status=400)
    
    def options(self, request):
        return options_cors()

class user_signup(APIView):
    permission_classes = (permissions.AllowAny,)
    
    def post(self, request):
        username = request.data.get('id', None)
        password = request.data.get('password', None)
        if username is None:
            return Response({'message':'Please put valid ID.'}, status=400)
        if password is None:
            return Response({'message':'Please put password.'}, status=400)
        
        try:
            user = User.objects.create_user(username, username+'@email.com', password)
        except IntegrityError:
            return Response({'message':'User already exists!'}, status=400)
        user.save()
        return Response('',status=200)
    
    def options(self, request):
        return options_cors()

class FeedList(APIView):

    def get(self, request):
        feeds = Feed.objects.filter(author__id=request.user.id)
        serializer = FeedListSerializer(feeds)
        return Response(serializer.data)

    def post(self, request):
        contents = request.data.get('contents', None)
        scope = request.data.get('scope', None)
        if contents is None:
            return Response('No Contents', status=400)
        feed = Feed(author_id=request.user.id, contents=contents)
        feed.save()
        return Response('', status=200)

class FeedDetail(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (permissions.IsAuthenticated, IsCurrUser,)
    queryset = Feed.objects.all()
    serializer_class = FeedSerializer

class LikeList(APIView):

    def get(self, request,pk):
        try:
            likes = Feed.objects.get(pk=pk)
        except ObjectDoesNotExist:
            return Response('', status=404)
        serializer = LikeSerializer(likes)
        return Response(serializer.data)

    def post(self, request,pk):
        try:
            likes = Feed.objects.get(pk=pk)
        except ObjectDoesNotExist:
            return Response('', status=404)
        serializer = LikeSerializer(likes)
        data = serializer.data
        if int(request.user.id) in data:
            return Response('Already Liked', status=400)
        else:
            user = User.objects.get(id=request.user.id)
            likes.like.add(user)
            return Response('', status=200)

    def delete(self, request,pk):
        try:
            likes = Feed.objects.get(pk=pk)
        except ObjectDoesNotExist:
            return Response('', status=404)
        serializer = LikeSerializer(likes)
        data = serializer.data
        if request.user.username in data:
            user = User.objects.get(id=request.user.id)
            likes.like.remove(user)
            return Response('', status=200)
        else:
            return Response('Not Yet Like', status=400)

class DislikeList(APIView):

    def get(self, request,pk):
        try:
            dislikes = Feed.objects.get(pk=pk)
        except ObjectDoesNotExist:
            return Response('', status=404)
        serializer = DislikeSerializer(dislikes)
        return Response(serializer.data)

    def post(self, request,pk):
        try:
            dislikes = Feed.objects.get(pk=pk)
        except ObjectDoesNotExist:
            return Response('', status=404)
        serializer = DislikeSerializer(dislikes)
        data = serializer.data
        if int(request.user.id) in data:
            return Response('Already Disliked', status=400)
        else:
            user = User.objects.get(id=request.user.id)
            dislikes.dislike.add(user)
            return Response('', status=200)

    def delete(self, request,pk):
        try:
            dislikes = Feed.objects.get(pk=pk)
        except ObjectDoesNotExist:
            return Response('', status=404)
        serializer = DislikeSerializer(dislikes)
        data = serializer.data
        if request.user.username in data:
            user = User.objects.get(id=request.user.id)
            dislikes.dislike.remove(user)
            return Response('', status=200)
        else:
            return Response('Not Yet Dislike', status=400)

class ReplyList(APIView):
    def get(self, request, pk):
        replies = Reply.objects.filter(feed__id=pk)
        serializer = ReplySerializer(replies)
        return Response(serializer.data)

    def post(self, request, pk):
        contents = request.data.get('contents', None)
        if contents is None:
            return Response('No Contents', status=400)
        reply = Reply(feed_id=pk, contents=contents, author_id=request.user.id)
        reply.save()
        return Response('', status=200)

class ReplyDetail(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (permissions.IsAuthenticated, IsCurrUserReply,)
    queryset = Reply.objects.all()
    serializer_class = ReplySerializer
    lookup_url_kwarg = 'pk'
