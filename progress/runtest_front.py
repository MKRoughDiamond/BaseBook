from time import sleep
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.common.exceptions import NoSuchElementException
import sys


def find_by_id(browser, name):
    try:
        ret = browser.find_element_by_id(name)
    except NoSuchElementException:
        print('Cannot find %s' % name)
        sys.exit(1)
    return ret


def find_or_error(browser, name):
    try:
        browser.find_element_by_id(name)
    except NoSuchElementException:
        return False
    return True


def send_keys(browser, _element, _key):
    try:
        _element.send_keys(_key + Keys.RETURN)
    except Exception as e:
        print('Cannot send %s' % _key)
        print('Message: ', e)
        sys.exit(1)
    sleep(0.5)


def send(browser, name, _key):
    try:
        _element = find_by_id(browser, name)
        _element.send_keys(_key + Keys.RETURN)
    except Exception as e:
        print('Message: ', e)
        sys.exit(1)


def click(browser, name):
    try:
        _element = find_by_id(browser, name)
        _element.click()
    except Exception as e:
        print('Message: ', e)
        sys.exit(1)
    sleep(0.5)


def signup_post_test(browser, uname, upwd, duplication):
    try:
        click(browser, 'SignUp')

        send(browser, 'input-username', uname)
        send(browser, 'input-password', upwd)
        send(browser, 'input-retypepassword', upwd)

        click(browser, 'SignUp')
        if duplication==True:
            exist = find_or_error(browser, 'login-error-box') and \
                    find_or_error(browser, 'login-error-msg') and \
                    find_or_error(browser, 'login-error-confirm')
            if(not exist):
                print('Duplicated SignUp('+uname+') test failed')
                sys.exit(1)
            click(browser, 'login-error-confirm')
            print('Duplicated SignUp('+uname+') test success')
        else:
            exist = find_or_error(browser, 'login-error-box') or \
                    find_or_error(browser, 'login-error-msg') or \
                    find_or_error(browser, 'login-error-confirm')
            if exist:
                print('SignUp(' + uname + ') test failed')
                sys.exit(1)
            print(uname + ' SignUp success')
    except Exception as e:
        print('SignUp test failed')
        print(e)
        sys.exit(1)


def signin_post_test(browser, uname, upwd):
    try:
        send(browser, 'input-username', uname)
        send(browser, 'input-password', upwd)
        click(browser, 'SignIn')
    except Exception as e:
        print('SignIn test failed')
        print(e)
        sys.exit(1)
    print(uname + ' SignIn success')


def feed_post_test(browser, contents):
    try:
        send(browser, 'newFeed-text', contents)
        click(browser, 'newFeed-post')
    except Exception as e:
        print('POST Feed test failed')
        print(e)
        sys.exit(1)
    print(uname + ' POST Feed success')


print('################################################################')
print('FrontEnd Test')
print('################################################################')

print('Browser open')


browser = webdriver.Chrome('/usr/local/bin/chromedriver')
browser.get('http://localhost:3000')
print('Browser open successful')

################################
print('\nSignUp test:')

for i in range(1, 3):
    uname = 'user{0}'.format(i)
    upwd = 'user{0}passwd'.format(i)
    signup_post_test(browser, uname, upwd, False)
    signup_post_test(browser, uname, upwd, True)


################################
print('\nSignIn test:')

uname = 'user{0}'.format(1)
upwd = 'user{0}passwd'.format(1)
signin_post_test(browser, uname, upwd)

################################
print('\nPOST Feed test:')

for i in range(1, 6):
    print('Feed %d' % i, end=' ')
    contents = 'Frontend - contents of POST user{0}-{1} feed: 종강하고싶다{1}{1}'.format(1, i)
    feed_post_test(browser, contents)


################################
sleep(4)
browser.quit()
print('FrontEnd Test terminated')