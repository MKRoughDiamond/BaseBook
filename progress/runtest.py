from testlibrary import N, F, R
import testlibrary

'''
backend 완성 후 pass 부분 구현 바람
'''

localhost = 'http://localhost:8000/'

testlibrary.test_start('BackEnd')


link = localhost + 'signup/'
print('1. Signup')

for i in range(1, N):
    print('1-{0}'.format(i))
    unickname = "user{0}nickname".format(i)
    uname = "user{0}".format(i)
    upwd = "user{0}passwd".format(i)
    testlibrary.signup_post_test(link, unickname, uname, upwd)

link = localhost + 'login/'
print('2. login')

for i in range(1, N):
    print('2-{0}'.format(i))
    uname = "test{0}".format(i)
    upwd = "test{0}passwd".format(i)
    testlibrary.login_post_test(link, uname, upwd)

link = localhost + 'feed/'
print('3. feed')

for i in range(1, N):
    print('3-{0}'.format(i))
    testlibrary.feed_test(link,)
    pass

print('4. feed/<id>')

for i in range(1, F):
    link = localhost + 'feed/' + str(i) + '/'
    pass

print('5. feed/<id>/reply')

for i in range(1, R):
    link = localhost + 'feed/' + str(i) + '/reply/'
    pass

print('6. profile')

for i in range(1, N):
    #link = localhost + 'profile'
    pass