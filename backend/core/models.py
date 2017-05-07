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
        ('global', 'global'),
        ('friend', 'friend'),
        ('private', 'private'),
        ('hidden', 'hidden'),   # Same as 'private', but user can't change scope
    )
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    contents = models.TextField()
    scope = models.CharField(max_length=7, choices=SCOPE_CHOICES)
    # Store who liked/disliked
    like = models.ManyToManyField(User, related_name='liked', default=None)
    dislike = models.ManyToManyField(User, related_name='disliked', default=None)
    

class Reply(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    feed = models.ForeignKey(Feed, on_delete=models.CASCADE)
    contents = models.TextField()


def upload_path(instance, filename):
    return 'uploads/{0}/{1}'.format(instance.feed.author.username, filename)


class Picture(models.Model):
    feed = models.ForeignKey(Feed, on_delete=models.CASCADE)
    image = models.ImageField(upload_to=upload_path)
    # Access url with instance.image.url()
