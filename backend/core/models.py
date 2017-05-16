from django.db import models
from django.contrib.auth.models import User

class BaseUser(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    nickname = models.CharField(max_length=20)#, related_name='baseuser_nickname')

class Friend(models.Model):
    user = models.ForeignKey(User,related_name='user', on_delete=models.CASCADE)
    friend = models.ForeignKey(User, related_name='friends', on_delete=models.CASCADE)


class Feed(models.Model):
    SCOPE_CHOICES = (
        ('Public', 'Public'),
        ('Friends Only', 'Friends Only'),
        ('Private', 'Private'),
        ('Hidden', 'Hidden'),   # Same as 'private', but user can't change scope
    )
    timestamp = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey(User,on_delete=models.CASCADE)
    contents = models.TextField()
    scope = models.CharField(max_length=13, choices=SCOPE_CHOICES)
    # Store who liked/disliked
    like = models.ManyToManyField(User, related_name='liked', default=None)
    dislike = models.ManyToManyField(User, related_name='disliked', default=None)
    

class Reply(models.Model):
    author = models.ForeignKey(User,on_delete=models.CASCADE)
    feed = models.ForeignKey(Feed, on_delete=models.CASCADE)
    contents = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)


def upload_path(instance, filename):
    return 'uploads/{0}/{1}'.format(instance.feed.author.username, filename)


class Picture(models.Model):
    feed = models.ForeignKey(Feed, on_delete=models.CASCADE)
    image = models.ImageField(upload_to=upload_path)
    # Access url with instance.image.url()


class ChatRoom(models.Model):
    timestamp = models.DateTimeField(auto_now_add=True)
    # user1's ID is always smaller than user2's ID
    user1 = models.ForeignKey(User, related_name='user1', on_delete=models.CASCADE)
    user2 = models.ForeignKey(User, related_name='user2', on_delete=models.CASCADE)
    updated1 = models.DateTimeField()
    updated2 = models.DateTimeField()


class Chat(models.Model):
    room = models.ForeignKey(ChatRoom, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now_add=True)
    contents = models.TextField()
    
    class Meta:
        ordering = ['timestamp']
    
    
    
