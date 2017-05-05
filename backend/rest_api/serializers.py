from django.contrib.auth.models import User
from rest_framework import serializers
from core.models import Base4User, Friend, Feed, Reply, Picture
from django.db import models


class UserSerializer(serializers.ModelSerializer):
    #baseuser_nickname =
    class Meta:
        model = User
        fields = ('id', 'username')#,'nickname')