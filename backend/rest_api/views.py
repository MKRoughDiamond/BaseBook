from django.shortcuts import render
from django.http import HttpResponse
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login
from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from django.db import IntegrityError
from django.core.exceptions import ObjectDoesNotExist
from django.utils import timezone

from rest_api.serializers import UserSerializer, FeedListSerializer, FeedSerializer, ReplySerializer, ReplyListSerializer, LikeSerializer, DislikeSerializer, ChatRoomSerializer, ChatSerializer, FriendListSerializer
from rest_api.permissions import IsCurrUser, IsCurrUserReply
from core.models import Feed, Reply, Chat, ChatRoom, Friend
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

    def get(self, request, username=None):
        if username is None: # Newsfeed query
            friends = Friend.objects.filter(user=request.user).values('friend')
            friend_feeds = Feed.objects.filter(author__in=friends, scope__in=['Public', 'Friends Only'])
            my_feeds = Feed.objects.filter(author=request.user)
            feeds = (my_feeds | friend_feeds)
        else: # Timeline query
            try:
                owner = User.objects.get(username=username)
            except ObjectDoesNotExist:
                return Response('', status=404)
            owner_friends = Friend.objects.filter(user=owner).values('friend')
            owner_feeds = Feed.objects.filter(author=owner)
            if request.user in owner_friends:
                feeds = owner_feeds.filter(scope__in=['Public', 'Friends Only'])
            else:
                feeds = owner_feeds.filter(scope='Public')
        
        feeds = feeds.order_by('-timestamp')
        serializer = FeedListSerializer(feeds)
        return Response(serializer.data)

    def post(self, request):
        contents = request.data.get('contents', None)
        scope = request.data.get('scope', None)
        if contents is None or (scope,scope) not in Feed.SCOPE_CHOICES:
            return Response('No Contents', status=400)
        
        feed = Feed(author_id=request.user.id, contents=contents, scope=scope)
        feed.save()
        return Response('', status=200)

    def options(self, request):
        return options_cors()

class FeedDetail(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (permissions.IsAuthenticated, IsCurrUser,)
    queryset = Feed.objects.all()
    serializer_class = FeedSerializer
    lookup_url_kwarg = 'pk'

class LikeList(APIView):

    def get(self, request, pk):
        try:
            likes = Feed.objects.get(pk=pk)
        except ObjectDoesNotExist:
            return Response('', status=404)
        serializer = LikeSerializer(likes)
        return Response(serializer.data)

    def post(self, request, pk):
        try:
            likes = Feed.objects.get(pk=pk)
        except ObjectDoesNotExist:
            return Response('', status=404)
        serializer = LikeSerializer(likes)
        data = serializer.data
        if request.user.username in data['likes']:
            return Response('Already Liked', status=400)
        else:
            user = User.objects.get(id=request.user.id)
            likes.like.add(user)
            return Response('', status=200)

    def delete(self, request, pk):
        try:
            likes = Feed.objects.get(pk=pk)
        except ObjectDoesNotExist:
            return Response('', status=404)
        serializer = LikeSerializer(likes)
        data = serializer.data
        if request.user.username in data['likes']:
            user = User.objects.get(id=request.user.id)
            likes.like.remove(user)
            return Response('', status=200)
        else:
            return Response('Not Yet Like', status=400)

    def options(self, request):
        return options_cors()

class DislikeList(APIView):

    def get(self, request, pk):
        try:
            dislikes = Feed.objects.get(pk=pk)
        except ObjectDoesNotExist:
            return Response('', status=404)
        serializer = DislikeSerializer(dislikes)
        return Response(serializer.data)

    def post(self, request, pk):
        try:
            dislikes = Feed.objects.get(pk=pk)
        except ObjectDoesNotExist:
            return Response('', status=404)
        serializer = DislikeSerializer(dislikes)
        data = serializer.data
        if request.user.username in data['dislikes']:
            return Response('Already Disliked', status=400)
        else:
            user = User.objects.get(id=request.user.id)
            dislikes.dislike.add(user)
            return Response('', status=200)

    def delete(self, request, pk):
        try:
            dislikes = Feed.objects.get(pk=pk)
        except ObjectDoesNotExist:
            return Response('', status=404)
        serializer = DislikeSerializer(dislikes)
        data = serializer.data
        if request.user.username in data['dislikes']:
            user = User.objects.get(id=request.user.id)
            dislikes.dislike.remove(user)
            return Response('', status=200)
        else:
            return Response('Not Yet Dislike', status=400)

    def options(self, request):
        return options_cors()

class ReplyList(APIView):
    def get(self, request, pk):
        replies = Reply.objects.filter(feed__id=pk).order_by('-timestamp')
        serializer = ReplyListSerializer(replies)
        return Response(serializer.data)

    def post(self, request, pk):
        contents = request.data.get('contents', None)
        if contents is None:
            return Response('No Contents', status=400)
        reply = Reply(feed_id=pk, contents=contents, author_id=request.user.id)
        reply.save()
        return Response('', status=200)

    def options(self, request):
        return options_cors()

class ReplyDetail(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (permissions.IsAuthenticated, IsCurrUserReply,)
    queryset = Reply.objects.all()
    serializer_class = ReplySerializer
    lookup_url_kwarg = 'pk'

class ChatRoomID(APIView):
    def post(self, request, username):
        user1 = request.user
        try:
            user2 = User.objects.get(username=username)
        except ObjectDoesNotExist:
            return Response('', status=404)
        if user1.id == user2.id:
            return Response('', status=400)
        if user1.id > user2.id:
            temp = user2
            user2 = user1
            user1 = temp
        try:
            room = ChatRoom.objects.get(user1=user1, user2=user2)
        except ObjectDoesNotExist: 
            time = timezone.now()
            room = ChatRoom(user1=user1, user2=user2, updated1=time, updated2=time)
            room.save()
        serializer = ChatRoomSerializer(room)
        return Response(serializer.data)

class ChatDetail(APIView):
    def get(self, request, pk):
        try:
            room = ChatRoom.objects.get(pk=pk)
        except ObjectDoesNotExist:
            return Response('', status=404)
        chats = Chat.objects.filter(room=room)
        if request.user == room.user1:
            chats = chats.filter(timestamp__gt=room.updated1)
            room.updated1 = timezone.now()
        elif request.user == room.user2:
            chats = chats.filter(timestamp__gt=room.updated2)
            room.updated2 = timezone.now()
        else:
            return Response('', status=401)
        room.save()
        serializer = ChatSerializer(chats)
        return Response(serializer.data)
    
    def post(self, request, pk):
        try:
            room = ChatRoom.objects.get(pk=pk)
        except ObjectDoesNotExist:
            return Response('', status=404)
        chat = Chat(room=room, user=request.user, contents=request.data.get('contents', ''))
        chat.save()
        return Response('')

class ChatAll(APIView):
    def get(self, request, pk):
        try:
            room = ChatRoom.objects.get(pk=pk)
        except ObjectDoesNotExist:
            return Response('', status=404)
        chats = Chat.objects.filter(room=room)
        if request.user == room.user1:
            room.updated1 = timezone.now()
        elif request.user == room.user2:
            room.updated2 = timezone.now()
        else:
            return Response('', status=401)
        room.save()
        serializer = ChatSerializer(chats)
        return Response(serializer.data)

class FriendList(APIView):
    def post(self, request, username):
        user1 = request.user
        user2 = User.objects.get(username=username)
        try:
            friend = Friend.objects.get(user=user1, friend=user2)
        except ObjectDoesNotExist:
            friend1 = Friend(user=user1, friend=user2)
            friend2 = Friend(user=user2, friend=user1)
            friend1.save()
            friend2.save()
            return Response('', status=200)
        # You are already friends!
        return Response('', status=400)
    def get(self, request, username):
        friends = Friend.objects.filter(user__username=username)
        serializer = FriendListSerializer(friends)
        return Response(serializer.data)



