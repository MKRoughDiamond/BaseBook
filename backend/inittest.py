from django.contrib.auth.models import User
import testlibrary
import json, requests

# First of all, it initializes user information.

print('User deletion start')
for i in range(1,10):
    username = "test{0}".format(i)
    try:
        user = User.objects.get(username = username)
        user.delete()
    except User.DoesNotExist:
        continue

print('User deletion end')
print('User creation start')
for (uname, upwd) in testlibrary.create_users(10):
    user = User.objects.create_user(uname, password=upwd)
    user.save()

print('user creation end')
