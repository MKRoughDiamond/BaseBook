from django.contrib.auth.models import User
from rest_framework import serializers
from core.models import BaseUser, Friend, Feed, Reply, Picture, ChatRoom, Chat, HashTag, MultiChatRoom, BaseUser
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
    hashtags = serializers.SerializerMethodField()

    def get_hashtags(self,obj):
        hashtags = []
        for e in obj.hashtag.all():
            hashtags += [ e.hashtagName ]
        return hashtags

    class Meta:
        model = Feed
        fields = ('id','feedtype', 'contents', 'scope', 'author','hashtags')

class HashTagListSerializer(serializers.BaseSerializer):
    def to_representation(self,obj):
        hashtags = []
        for e in obj:
            hashtags += [ e.hashtagName ]

        return {
            'hashtags': hashtags
        }

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
        for e in obj.dislike.all():
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
    author = serializers.ReadOnlyField(source='author.username')
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

        
class MultiChatRoomSerializer(serializers.ModelSerializer):
    users = serializers.StringRelatedField(many=True)
    class Meta:
        model = MultiChatRoom
        fields = ('id', 'isMafiaRoom', 'users')

    
class FriendListSerializer(serializers.BaseSerializer):
    def to_representation(self, obj):
        friendlist = []
        for e in obj:
            friendlist += [ e.friend.username ]
        return {
            'friend': friendlist
        }

class BaseUserSerializer(serializers.BaseSerializer):
    def to_representation(self, obj):
        return {
            'id': obj.user.id,
            'username': obj.user.username,
            'nickname': obj.nickname,
            'theme' : obj.theme
        }
