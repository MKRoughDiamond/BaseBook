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
        headers = {
            'Content-Type': 'application/json',
        }
        res = requests.post(url, headers=headers, auth=(uname,upwd))
        if res.status_code != 200:
            wrong_status_code('post login', url, res.status_code)
    except Exception as e:
        unexpected_exception('post login', url, e)
    print('success')

def feed_post_test(url, contents, scope, uname, upwd):
    sleep(0.05)
    try:
        data = {'contents': contents, 'scope': scope}
        headers = {
            'Content-Type': 'application/json',
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
            wrong_status_code('get feed', url, res.status_code)
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
            wrong_status_code('get feed', url, res.status_code)
    except Exception as e:
        unexpected_exception('get feed', url, e)
    print('success')

def feed_likes_post_test(url, uname, upwd):
    sleep(0.05)
    try:
        headers = {'Content-Type': 'application/json'}
        res = requests.post(url, headers=headers, auth=(uname, upwd))
        if res.status_code != 200:
            wrong_status_code('post likes', url, res.status_code)
    except Exception as e:
        unexpected_exception('post likes', url, e)
    print('success')

def feed_likes_get_test(url, uname, upwd):
    sleep(0.05)
    try:
        headers = {'Content-Type': 'application/json'}
        res = requests.get(url, headers=headers, auth=(uname, upwd))
        if res.status_code != 200:
            wrong_status_code('get likes', url, res.status_code)
    except Exception as e:
        unexpected_exception('get likes', url, e)
    print('success')
    
def feed_likes_delete_test(url, uname, upwd):
    sleep(0.05)
    try:
        headers = {'Content-Type': 'application/json'}
        res = requests.delete(url, headers=headers, auth=(uname, upwd))
        if res.status_code != 200:
            wrong_status_code('delete likes', url, res.status_code)
    except Exception as e:
        unexpected_exception('delete likes', url, e)
    print('success')
    
def feed_dislikes_post_test(url, uname, upwd):
    sleep(0.05)
    try:
        headers = {'Content-Type': 'application/json'}
        res = requests.post(url, headers=headers, auth=(uname, upwd))
        if res.status_code != 200:
            wrong_status_code('post dislikes', url, res.status_code)
    except Exception as e:
        unexpected_exception('post dislikes', url, e)
    print('success')

def feed_dislikes_get_test(url, uname, upwd):
    sleep(0.05)
    try:
        headers = {'Content-Type': 'application/json'}
        res = requests.get(url, headers=headers, auth=(uname, upwd))
        if res.status_code != 200:
            wrong_status_code('get dislikes', url, res.status_code)
    except Exception as e:
        unexpected_exception('get dislikes', url, e)
    print('success')
    
def feed_dislikes_delete_test(url, uname, upwd):
    sleep(0.05)
    try:
        headers = {'Content-Type': 'application/json'}
        res = requests.delete(url, headers=headers, auth=(uname, upwd))
        if res.status_code != 200:
            wrong_status_code('delete dislikes', url, res.status_code)
    except Exception as e:
        unexpected_exception('delete dislikes', url, e)
    print('success')
    
def chat_new_chat_test(url, uname, upwd):
    sleep(0.05)
    try:
        headers = {'Content-Type': 'application/json'}
        res = requests.post(url, headers=headers, auth=(uname, upwd))
        if res.status_code != 200:
            wrong_status_code('new chat', url, res.status_code)
    except Exception as e:
        unexpected_exception('new chat', url, e)
    print('success')    
 
def chat_post_chat_test(url, contents, uname, upwd):
    sleep(0.05)
    try:
        data = {'contents': contents}
        headers = {'Content-Type': 'application/json'}
        res = requests.post(url, data=json.dumps(data), headers=headers, auth=(uname, upwd))
        if res.status_code != 200:
            wrong_status_code('post chat', url, res.status_code)
    except Exception as e:
        unexpected_exception('post chat', url, e)
    print('success') 
    
def chat_get_prev_chat_test(url, uname, upwd):
    sleep(0.05)
    try:
        headers = {'Content-Type': 'application/json'}
        res = requests.get(url, headers=headers, auth=(uname, upwd))
        if res.status_code != 200:
            wrong_status_code('get prev chat', url, res.status_code)
    except Exception as e:
        unexpected_exception('get prev chat', url, e)
    print('success') 
        
def chat_get_all_chat_test(url, uname, upwd):
    sleep(0.05)
    try:
        headers = {'Content-Type': 'application/json'}
        res = requests.get(url, headers=headers, auth=(uname, upwd))
        if res.status_code != 200:
            wrong_status_code('get all chat', url, res.status_code)
    except Exception as e:
        unexpected_exception('get all chat', url, e)
    print('success')
    
#def profile_test(url, ):
#    sleep(0.05)
#    try:
#        pass
#    except Exception as e:
#        unexpected_exception('get feed', url, e)
#    print('success')


def test_end():
    sleep(0.05)
    print('################################################################')
    print('all test success')
    print('################################################################')
