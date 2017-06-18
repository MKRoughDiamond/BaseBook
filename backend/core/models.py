from django.db import models
from django.contrib.auth.models import User

class BaseUser(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    nickname = models.CharField(max_length=20)#, related_name='baseuser_nickname')
    theme = models.CharField(max_length=8)

class Friend(models.Model):
    baseuser = models.ForeignKey(BaseUser,related_name='baseuser', on_delete=models.CASCADE, default=None)
    friend = models.ForeignKey(BaseUser, related_name='friend', on_delete=models.CASCADE)


class HashTag(models.Model):
    hashtagName = models.CharField(max_length=30)


class Feed(models.Model):
    SCOPE_CHOICES = (
        ('Public', 'Public'),
        ('Friends Only', 'Friends Only'),
        ('Private', 'Private'),
        ('Hidden', 'Hidden'),   # Same as 'private', but user can't change scope
    )
    FEED_TYPE_CHOICES = (
        ('Text', 'Text'),
        ('Markdown', 'Markdown'),
    )

    timestamp = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey(BaseUser,on_delete=models.CASCADE)
    contents = models.TextField()
    scope = models.CharField(max_length=13, choices=SCOPE_CHOICES)
    feedtype = models.CharField(max_length=10, choices=FEED_TYPE_CHOICES)
    
    # Store who liked/disliked
    like = models.ManyToManyField(BaseUser, related_name='liked', default=None)
    dislike = models.ManyToManyField(BaseUser, related_name='disliked', default=None)
    hashtag = models.ManyToManyField(HashTag, related_name='hashtags', default=None)
    

class Reply(models.Model):
    author = models.ForeignKey(BaseUser,on_delete=models.CASCADE)
    feed = models.ForeignKey(Feed, on_delete=models.CASCADE)
    contents = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)


def upload_path(instance, filename):
    return 'uploads/{0}/{1}'.format(instance.feed.author.nickname, filename)


class Picture(models.Model):
    feed = models.ForeignKey(Feed, on_delete=models.CASCADE)
    image = models.ImageField(upload_to=upload_path)
    # Access url with instance.image.url()


class ChatRoom(models.Model):
    timestamp = models.DateTimeField(auto_now_add=True)
    # user1's ID is always smaller than user2's ID
    baseuser1 = models.ForeignKey(BaseUser, related_name='baseuser1', on_delete=models.CASCADE, default=None)
    baseuser2 = models.ForeignKey(BaseUser, related_name='baseuser2', on_delete=models.CASCADE, default=None)
    updated1 = models.DateTimeField()
    updated2 = models.DateTimeField()
    
    
class MultiChatUser(models.Model):
    baseuser = models.ForeignKey(BaseUser, on_delete=models.CASCADE, default=None)
    updated = models.DateTimeField()
    
    def __str__(self):  # used in MultiChatRoomSerializer
        return self.baseuser.nickname
    
    
class MultiChatRoom(models.Model):
    timestamp = models.DateTimeField(auto_now_add=True)
    users = models.ManyToManyField(MultiChatUser, related_name='users', default=None)
    isMafiaRoom = models.BooleanField(default=False)
    

class Chat(models.Model):
    room = models.ForeignKey(ChatRoom, on_delete=models.CASCADE, blank=True, null=True, default=None)
    multiroom = models.ForeignKey(MultiChatRoom, on_delete=models.CASCADE, blank=True, null=True, default=None)
    baseuser = models.ForeignKey(BaseUser, on_delete=models.CASCADE, default=None)
    timestamp = models.DateTimeField(auto_now_add=True)
    contents = models.TextField()
    invisible = models.ManyToManyField(BaseUser, related_name='invisible', default=None)
    
    class Meta:
        ordering = ['timestamp']
    
    
    
