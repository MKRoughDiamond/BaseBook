import requests, json
from time import sleep
import sys, base64

# (number of user)
N = 5

'''
backend 완성 후 pass 부분 구현 바람
'''

def test_start(test_name):
    print('################################################################')
    print(test_name + ' Test')
    print('################################################################')

def auth_user_id_pwd(i):
    return ('test{0}'.format(i), 'test{0}passwd'.format(i))

def wrong_status_code(message, url, code):
    print('\nERROR: {0}'.format(message))
    print('url={0}'.format(url))
    print('Error code: ' + str(code))
    sys.exit(1)

def unexpected_exception(message, url, e):
    print('\nException: cannot {0}'.format(message))
    print('url={0}'.format(url))
    print('Message: ', e)
    sys.exit(1)

def signup_post_test(url, unickname, uname, upwd):
    sleep(0.05)
    try:
        data = {'id':uname,'password':upwd}
        headers = {'Content-Type': 'application/json'}
        res = requests.post(url, data=json.dumps(data), headers=headers)
        if res.status_code != 200:
            wrong_status_code('post signup',url,res.status_code)
    except Exception as e:
        unexpected_exception('post signup',url,e)
    print('success')

def login_post_test(url, uname, upwd):
    sleep(0.05)
    try:
        #auth_user = uname + ':' + upwd
        #print(auth_user)
        #hash64 = base64.b64encode(auth_user.encode('utf-8'))  # type = bytes
        headers = {
            'Content-Type': 'application/json',
            #'Authorization': 'Basic %s' % hash64
        }
        res = requests.post(url, headers=headers, auth=(uname,upwd))
        #print(res.text)
        if res.status_code != 200:
            wrong_status_code('post login', url, res.status_code)
    except Exception as e:
        unexpected_exception('post login', url, e)
    print('success')

def feed_post_test(url, contents, scope, uname, upwd):
    sleep(0.05)
    try:
        #hash = new Buffer(`${uname}:${upwd}`).toString('base64')
        #auth_user = uname + ':' + upwd
        #hash64 = base64.b64encode(auth_user.encode('utf-8')) #type = bytes
        #print(hash64)
        data = {'contents': contents, 'scope': scope}
        headers = {
            'Content-Type': 'application/json',
            #'Authorization': 'Basic %s' % hash64
        }
        res = requests.post(url, data=json.dumps(data), headers=headers, auth=(uname,upwd))
        if res.status_code != 200:
            wrong_status_code('post feed', url, res.status_code)
    except Exception as e:
        unexpected_exception('post feed', url, e)
    print('success')

def feed_get_test(url, uname, upwd):
    sleep(0.05)
    try:
        headers = {'Content-Type': 'application/json'}
        res = requests.get(url, headers=headers, auth=(uname,upwd))
        if res.status_code != 200:
            wrong_status_code('post feed', url, res.status_code)
        pass
    except Exception as e:
        unexpected_exception('get feed', url, e)
    print('success')

def feed_id_get_test(url, uname, upwd, seen):
    sleep(0.05)
    try:
        headers = {'Content-Type': 'application/json'}
        res = requests.get(url, headers = headers, auth=(uname,upwd))
        if (seen and res.status_code!=200) or \
            (not seen and res.status_code==200):
            wrong_status_code('get feed', url, res.status_code)
    except Exception as e:
        unexpected_exception('get feed', url, e)
    print('success')

def feed_reply_post_test(url, contents, uname, upwd):
    sleep(0.05)
    try:
        data = {'contents': contents}
        headers = {'Content-Type': 'application/json'}
        res = requests.post(url, data=json.dumps(data), headers=headers, auth=(uname, upwd))
        if res.status_code != 200:
            wrong_status_code('post feed', url, res.status_code)
    except Exception as e:
        unexpected_exception('get feed', url, e)
    print('success')

def feed_reply_get_test(url, uname, upwd):
    sleep(0.05)
    try:
        headers = {'Content-Type': 'application/json'}
        res = requests.get(url, headers=headers, auth=(uname, upwd))
        if res.status_code != 200:
            wrong_status_code('post feed', url, res.status_code)
    except Exception as e:
        unexpected_exception('get feed', url, e)
    print('success')

def profile_test(url, ):
    sleep(0.05)
    try:
        pass
    except Exception as e:
        unexpected_exception('get feed', url, e)
    print('success')

