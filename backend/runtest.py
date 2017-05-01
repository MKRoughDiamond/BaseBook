import requests, usertest
from time import sleep

def signup_post_test(link, data, uname, upwd):
    sleep(0.05)
    try:
        res = requests.post(link, data=data, auth=(uname,upwd))
        if res.status_code != 200:
            print("ERROR: signup post")
            exit(1)
    except Exception:
        print("ERROR: cannot post signup")
        exit(1)
    print('signup success')

def login_post_test(link, uname, upwd):
    sleep(0.05)
    try:
        res = requests.post(link, auth=(uname,upwd))
        if res.status_code != 200:
            print("ERROR: login post")
            exit(1)
    except Exception:
        print("ERROR: cannot post login")
        exit(1)
    print('login success')

link = 'http://localhost:8000/signup'
print('1. Signup')

for i in range(1,10):
    data = "user{0}nickname".format(i)
    uname = "user{0}".format(i)
    upwd = "user{0}passwd".format(i)
    signup_post_test(link, data, uname, upwd)

print('2.login')

for i in range(1,10):
    uname = "user{0}".format(i)
    upwd = "user{0}passwd".format(i)
    login_post_test(link, uname, upwd)

