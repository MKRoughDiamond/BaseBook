from django.contrib.auth.models import User
from rest_framework import serializers
from core.models import BaseUser, Friend, Feed, Reply, Picture
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
        fields = ('id', 'contents', 'like', 'dislike', 'scope', 'author')

class ReplySerializer(serializers.BaseSerializer):
    def to_representation(self, obj):
        return {
            'id': obj.id,
            'contents': obj.contents,
            'author': obj.author.username
        }
