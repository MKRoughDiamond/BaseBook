from django.contrib.auth.models import User
import usertest
import json
import requests

# First of all, it initializes debt information.

for i in range(1,10):
    username = "test{0}".format(i)
    try:
        user = User.objects.get(username = username)
        user.delete()
    except User.DoesNotExist:
        continue

print("---------------")
for (username, pwd) in usertest.create_users(10):
    user = User.objects.create_user(username, password=pwd)
    user.save()

print("User created successful")
