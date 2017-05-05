import requests, json
from testlibrary import N
from time import sleep
from socket import timeout


def signup_post_test(url, unickname, uname, upwd):
    sleep(0.05)
    try:
        post_data = {'id':uname,'password':upwd}
        headers = {'Content-Type': 'text/html'}
        print('1')
        res = requests.post(url,
                            data=json.dumps(post_data),
                            headers=headers)
        print('2')
        if res.status_code != 200:
            print("ERROR: signup post")
            exit(1)
    except Exception:
        print("ERROR: cannot post signup")
        exit(1)
    print('signup success')

def login_post_test(url, uname, upwd):
    sleep(0.05)
    try:
        post_data = {'id': uname, 'password': upwd}
        res = requests.post(url,data=json.dumps(post_data))
        if res.status_code != 200:
            print("ERROR: login post")
            exit(1)
    except Exception:
        print("ERROR: cannot post login")
        exit(1)
    print('login success')

link = 'http://localhost:8000/signup'
print('1. Signup')

for i in range(1, N):
    print('1-{0}'.format(i))
    unickname = "user{0}nickname".format(i)
    uname = "user{0}".format(i)
    upwd = "user{0}passwd".format(i)
    signup_post_test(link, unickname, uname, upwd)
link = 'http://localhost:8000/login'
print('2.login')

for i in range(1, N):
    print('2-{0}'.format(i))
    uname = "test{0}".format(i)
    upwd = "test{0}passwd".format(i)
    login_post_test(link, uname, upwd)


