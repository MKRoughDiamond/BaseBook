import requests, json
from time import sleep

# (number of user) + 1
N = 6

# number of feed
F = 10

# number of reply
R = 15

'''
backend 완성 후 pass 부분 구현 바람
'''

def test_start(test_name):
    print('################################################################')
    print(test_name + ' Test')
    print('################################################################')

def create_users():
    ls = []
    for i in range(1, N):
        ls.append(("test{0}".format(i), "test{0}passwd".format(i)))
    return ls

def signup_post_test(url, unickname, uname, upwd):
    sleep(0.05)
    try:
        post_data = {'id':uname,'password':upwd}
        headers = {'Content-Type': 'application/json'}

        res = requests.post(url,
                            data=json.dumps(post_data),
                            headers=headers)
        if res.status_code != 200:
            print("ERROR: signup post")
            exit(1)
    except Exception:
        print("ERROR: cannot post signup")
        exit(1)
    print('success')

def login_post_test(url, uname, upwd):
    sleep(0.05)
    try:
        post_data = {'id': uname, 'password': upwd}
        headers = {'Content-Type': 'application/json'}
        res = requests.post(url,
                            data=json.dumps(post_data),
                            headers=headers)
        if res.status_code != 200:
            print("ERROR: login post")
            exit(1)
    except Exception:
        print("ERROR: cannot post login")
        exit(1)
    print('success')

def feed_test(url, ):
    sleep(0.05)
    pass

def feed_id_test(url, ):
    sleep(0.05)
    pass

def feed_reply_test(url, ):
    sleep(0.05)
    pass

def profile_test(url, ):
    sleep(0.05)
    pass

