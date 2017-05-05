from django.contrib.auth.models import User
from testlibrary import create_users, N
import json, requests

# First of all, it initializes user information.

print('User deletion start')
for i in range(1, N):
    #'''
    userlist = User.objects.all()
    for user in userlist:
        user.delete()
    #    '''

    '''
    uname = "test{0}".format(i)
    try:
        user = User.objects.get(username = uname)
        user.delete()
    except User.DoesNotExist:
        continue
        '''

print('User deletion end')
print('User creation start')
for (uname, upwd) in create_users():
    user = User.objects.create_user(uname, password=upwd)
    user.save()

print('user creation end')

