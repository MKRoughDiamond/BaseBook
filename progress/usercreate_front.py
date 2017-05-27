from time import sleep
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.common.exceptions import NoSuchElementException
from selenium.webdriver.support.ui import Select
import sys
################################################################
#(number of users)
N = 2
#(number of feed per scope) * (number of scope)
F = 1*3
#(number of reply per feed)
R = 2
#(number of chat)
C = 1
################################################################
drivers = []
scopes = ['Public', 'Friend Only', 'Private']
likes = ['like', 'dislike']
################################################################
def end_test(message, e):
    print(message)
    print('Exception Message: ', e)
    sys.exit(1)

def find_by_id(driver, name):
    try:
        ret = driver.find_element_by_id(name)
    except NoSuchElementException as e:
        end_test('find_by_id: Cannot find %s' % name, e)
        sys.exit(1)
    return ret

def find_or_error(driver, name):
    try:
        driver.find_element_by_id(name)
    except NoSuchElementException:
        return False
    return True

def send_keys(_element, _key):
    try:
        _element.send_keys(_key + Keys.RETURN)
    except Exception as e:
        end_test('Cannot send %s' % _key ,e)
    sleep(0.5)

def send(driver, name, _key):
    try:
        _element = find_by_id(driver, name)
        _element.send_keys(_key + Keys.RETURN)
    except Exception as e:
        end_test('Cannot send {0} to {1}'.format(_key, name), e)

def click(driver, name):
    try:
        _element = find_by_id(driver, name)
        _element.click()
    except Exception as e:
        end_test('Cannot click %s' % name, e)
    sleep(0.5)

def signup_test(driver, uname, upwd, duplication):
    try:
        click(driver, 'SignUp')
        send(driver, 'input-username', uname)
        send(driver, 'input-password', upwd)
        send(driver, 'input-retypepassword', upwd)
        click(driver, 'SignUp')
        if duplication==True:
            exist = find_or_error(driver, 'login-error-box') and \
                    find_or_error(driver, 'login-error-msg') and \
                    find_or_error(driver, 'login-error-confirm')
            if(not exist):
                print('Duplicated SignUp('+uname+') test failed')
                sys.exit(1)
            click(driver, 'login-error-confirm')
            print('Duplicated SignUp('+uname+') test success')
        else:
            exist = find_or_error(driver, 'login-error-box') or \
                    find_or_error(driver, 'login-error-msg') or \
                    find_or_error(driver, 'login-error-confirm')
            if exist:
                print('SignUp(' + uname + ') test failed')
                sys.exit(1)
            print(uname + ' SignUp success')
    except Exception as e:
        end_test('\nSignUp test failed', e)

################################################################
for i in range(0, 1):
    print('drivers[{0}] open'.format(i))
    drivers.append(webdriver.Chrome('/usr/local/bin/chromedriver'))
    #drivers[i].get('http://localhost:3000')
    drivers[i].get('http://13.124.80.116:3000')
    print('drivers[{0}] open successful'.format(i))


################################################################
print('\nSignUp test:')

for i in range(0, N):
    uname = 'user{0}'.format(i)
    upwd = 'user{0}'.format(i)
    signup_test(drivers[0], uname, upwd, False)

drivers[0].quit()