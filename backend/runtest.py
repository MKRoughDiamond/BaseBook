from testlibrary import N
import testlibrary as TL
from random import randint


localhost = 'http://localhost:8000/'

TL.test_start('BackEnd')

#####################################################
print('1. POST signup')
link = localhost + 'signup/'

for i in range(1, N+1):
    print('1-{0}. test{0} SignUp'.format(i), end=' ')
    unickname = "test{0}nickname".format(i)
    uname = "test{0}".format(i)
    upwd = "test{0}passwd".format(i)
    TL.signup_post_test(link, unickname, uname, upwd)

#####################################################
print('2. POST login')
link = localhost + 'login/'

for i in range(1, N+1):
    print('2-{0}. test{0} SignIn'.format(i), end=' ')
    uname = "test{0}".format(i)
    upwd = "test{0}passwd".format(i)
    TL.login_post_test(link, uname, upwd)

#####################################################
print('3. POST feed')
link = localhost + 'feed/'

scopes = ['Public','Friends Only','Private','Hidden']
# number of feed of each user
NF = [0]
# total number of Feed
F = 0

for i in range(1, N+1):
    M = randint(1, 4) # number of feed for ith user
    #M = 4
    print('3-{0}. user test{0} will post {1} feed'.format(i,M))
    NF.append(M)
    F += M
    uname = "test{0}".format(i)
    upwd = "test{0}passwd".format(i)
    for j in range(1, M+1):
        print('posting feed{0}: '.format(j), end=' ')
        contents = 'contents of POST {0}-{1} feed: 종강하고싶다{1}{1}'.format(i,j)
        scope = scopes[0] #global or private, will be changed by i%4 later
        TL.feed_post_test(link, contents, scope, uname, upwd)

#####################################################
print('4. GET feed')
link = localhost + 'feed/'

for i in range(1, N+1):
    print('4-{0}. user test{0} will get feed'.format(i), end=' ')
    uname = "test{0}".format(i)
    upwd = "test{0}passwd".format(i)
    TL.feed_get_test(link, uname, upwd)

#####################################################
print('5. GET feed/<id>')
sum = 0

for i in range(1, N+1):
    print('5-{0}. user test{0} will get feed by id'.format(i))
    uname = "test{0}".format(i)
    upwd = "test{0}passwd".format(i)
    # see own's all post and (other's) one global post, one private post
    limit = NF[i]
    #if i != N:
    #    limit += 2
    sum += NF[i-1]
    #print('{0} sum: {1}'.format(i,sum))
    for j in range(1, limit+1):
        print('getting {0} feed: '.format(sum+j), end=' ')
        link = localhost + 'feed/' + str(sum+j) + '/'
        seen = True
        #if i != N and (sum+j) == limit-1:
        #    seen = False # other user's private feed
        TL.feed_id_get_test(link, uname, upwd, seen)

#####################################################
print('6. POST feed/<id>/reply')

# number of reply of each feed
NR = [0]
#total number of reply
R = 0

for i in range(1, N+1):
    print('6-{0}. user test{0} will post {1} reply'.format(i, NF[i]))
    uname = "test{0}".format(i)
    upwd = "test{0}passwd".format(i)
    for j in range(1, NF[i]+1):
        R += 1
        print('posting reply(my feed){0}: '.format(R), end=' ')
        link = localhost + 'feed/' + str(R) + '/reply/'
        contents = 'contents of POST {0}-{1} reply: 아무것도 안하고 싶다'.format(i,j)
        TL.feed_reply_post_test(link, contents, uname, upwd)
    '''for j in range(1, N+1):
        if i==j: continue
        R += 1
        print('posting reply(other user\'s feed){0}: '.format(j), end=' ')
        link = localhost + 'feed/' + str(j) + '/reply/'
        contents = 'contents of POST {0}-{1} reply: 아무것도 안하고 싶다{1}{1}'.format(i, j)
        TL.feed_reply_post_test(link, contents, uname, upwd)'''


#####################################################
print('7. GET feed/<id>/reply')
sum = 0
R = 0

for i in range(1, N+1):
    print('7-{0}. user test{0} will get {1} reply'.format(i, NF[i]))
    uname = "test{0}".format(i)
    upwd = "test{0}passwd".format(i)
    sum += NF[i-1]
    for j in range(1, NF[i]+1):
        R += 1
        print('getting all reply of feed{0}: '.format(R), end=' ')
        link = localhost + 'feed/' + str(sum+j) + '/reply/'
        TL.feed_reply_get_test(link, uname, upwd)
        for k in range(1, 1+1):
            print('getting 1 reply of id {0}: '.format(R), end=' ')
            link = localhost + 'feed/' + str(sum + j) + '/reply/' + str(R)
            TL.feed_reply_get_test(link, uname, upwd)

#####################################################
#print('8. profile')

for i in range(1, N+1):
    #link = localhost + 'profile'
    pass



















