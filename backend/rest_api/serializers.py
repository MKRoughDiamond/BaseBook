from django.contrib.auth.models import User
from rest_framework import serializers
from core.models import BaseUser, Friend, Feed, Reply, Picture, ChatRoom, Chat
from django.db import models


class UserSerializer(serializers.ModelSerializer):
    #baseuser_nickname =
    class Meta:
        model = User
        fields = ('id', 'username')#,'nickname')

class FeedListSerializer(serializers.BaseSerializer):
    def to_representation(self, obj):
        feedlist = []
        for e in obj:
            feedlist += [ e.id ]

        return {
            'id': feedlist
        }

class FeedSerializer(serializers.ModelSerializer):
    author = serializers.ReadOnlyField(source='author.username')
    class Meta:
        model = Feed
        fields = ('id', 'contents', 'scope', 'author')

class LikeSerializer(serializers.BaseSerializer):
    def to_representation(self,obj):
        likes = []
        for e in obj.like.all():
            likes += [ e.username ]
        return {
            'likes': likes
        }

class DislikeSerializer(serializers.BaseSerializer):
    def to_representation(self,obj):
        dislikes = []
        for e in obj:
            dislikes += [ e.username ]
        return {
            'dislikes': dislikes
        }

class ReplyListSerializer(serializers.BaseSerializer):
    def to_representation(self, obj):
        replylist = []
        for e in obj:
            replylist += [ e.id ]

        return {
            'id': replylist
        }

class ReplySerializer(serializers.ModelSerializer):
    class Meta:
        model = Reply
        fields = ('id', 'feed_id', 'contents', 'author',)

class ChatRoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChatRoom
        fields = ('id',)


class ChatSerializer(serializers.BaseSerializer):
    def to_representation(self, obj):
        chatlist = []
        for e in obj:
            chatlist += [ {
                'username': e.user.username,
                'timestamp': e.timestamp,
                'contents': e.contents
            }]
        return {
            'chat': chatlist
        }
    
