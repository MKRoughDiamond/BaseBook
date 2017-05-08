from testlibrary import N
import testlibrary as TL
from random import randint

'''
backend 완성 후 pass 부분 구현 바람
'''

localhost = 'http://localhost:8000/'

TL.test_start('BackEnd')

#####################################################
print('1. Signup')
link = localhost + 'signup/'

for i in range(1, N+1):
    print('1-{0}. test{0} SignUp'.format(i), end=' ')
    unickname = "test{0}nickname".format(i)
    uname = "test{0}".format(i)
    upwd = "test{0}passwd".format(i)
    TL.signup_post_test(link, unickname, uname, upwd)

#####################################################
print('2. login')
link = localhost + 'login/'

for i in range(1, N+1):
    print('2-{0}. test{0} SignIn'.format(i), end=' ')
    uname = "test{0}".format(i)
    upwd = "test{0}passwd".format(i)
    TL.login_post_test(link, uname, upwd)

#####################################################
print('3. feed')
link = localhost + 'feed/'

scopes = ['global','friend','private','hidden']
# number of feed of each user
NF = [0]
# total number of Feed
F = 0

for i in range(1, N+1):
    M = randint(1, 2)*2 # number of feed for ith user
    print('3-{0}. user test{0} will post {1} feed'.format(i,M))
    NF += [M]
    F += M
    auth_user = ('test{0}.'.format(i), 'test{0}passwd'.format(i))
    for j in range(1, M+1):
        print('posting {0}: '.format(j), end=' ')
        contents = 'contents of POST {0}-{1} feed: 종강하고싶다{1}{1}'.format(i,j)
        scope = scopes[(i%2)*2] #global or private, will be changed by i%4 later
        TL.feed_test(link, contents, scope, auth_user)

#####################################################
print('4. feed/<id>')

for i in range(1, N+1):
    print('4-{0}. user test{0} will get feed'.format(i))
    sum = 0
    uname = "test{0}".format(i)
    upwd = "test{0}passwd".format(i)
    auth_user = (uname, upwd)
    # see own's all post and (other's) one global post, one private post
    limit = NF[i]
    if i != N:
        limit += 2
    sum += NF[i-1]
    for j in range(1, limit+1):
        print('getting {0} feed: '.format(sum+j))
        link = localhost + 'feed/' + str(sum+j) + '/'
        seen = True
        if i != N and (sum+j) == limit-1:
            seen = False # other user's private feed
        TL.feed_id_test(link, auth_user, seen)
    pass

#####################################################
print('5. feed/<id>/reply')

# number of reply of each feed
NR = [0]
#total number of reply
R = 0

for i in range(1, N+1):
    print('5-{0}. user test{0} will post {1} reply')
    for j in range(1, NF[i]+1):
        M = 0 # number of reply for ith feed
    if i%2 == 0:
        M = randint(0, 3)
    link = localhost + 'feed/' + str(i) + '/reply/'
    pass

#####################################################
print('6. profile')

for i in range(1, N+1):
    #link = localhost + 'profile'
    pass
