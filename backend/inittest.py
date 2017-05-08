from django.contrib.auth.models import User
from testlibrary import N
import testlibrary
import json, requests
import sys

testlibrary.test_start('Initialization')

print('User deletion start')
try:
    for i in range(1, N):
        userlist = User.objects.all()
        for user in userlist:
            if user.username != 'admin':
                user.delete()
except Exception as e:
    print('User deletion failed')
    print(e)
    sys.exit(1)

print('User deletion end')

########################################

print('Admin creation start')

try:
    user = User.objects.create_superuser(username='admin',
                                         password='adminpasswd',
                                         email='default@email.com')
    user.save()
except Exception as e:
    print('Admin creation failed')
    print(e)
    sys.exit(1)

print('Admin creation end')
