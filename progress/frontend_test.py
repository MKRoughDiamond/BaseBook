from time import sleep
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
import sys
#from ..backend.testlibrary import N

# (number of user) + 1
#N = 6

def signup_test(uname, upwd, duplication):
    try:
        browser.find_element_by_id('SignUp').click()
        sleep(1)
        # print('Clicking SignUp button success')

        browser.find_element_by_id('input-username').send_keys(uname + Keys.RETURN)
        sleep(0.5)
        browser.find_element_by_id('input-password').send_keys(upwd + Keys.RETURN)
        sleep(0.5)
        browser.find_element_by_id('input-retypepassword').send_keys(upwd + Keys.RETURN)
        sleep(0.5)
        # print('Typing id and passwd success')

        browser.find_element_by_id('SignUp').click()
        sleep(1)
        # print('Re-Clicking SignUp button success')
        if duplication==True:
            print('Duplicated SignUp('+uname+') test failed')
            sys.exit(1)
        else:
            print(uname + ' SignUp success')
    except Exception as e:
        if duplication==True:
            print('Duplicated SignUp('+uname+') test success')
        else:
            print('SignUp test failed')
            print(e)
            sys.exit(1)

def signin_test(uname, upwd):
    try:
        browser.find_element_by_id('input-username').send_keys(uname + Keys.RETURN)
        sleep(0.5)
        browser.find_element_by_id('input-password').send_keys(upwd + Keys.RETURN)
        sleep(0.5)
        browser.find_element_by_id('SignIn').click()
        sleep(1.0)
        print(uname + ' SignIn success')
    except Exception as e:
        print('SignIn test failed')
        print(e)
        sys.exit(1)



print('################################################################')
print('FrontEnd Test')
print('################################################################')

print('Browser open')


try:
    browser = webdriver.Chrome('/usr/local/bin/chromedriver')
    browser.get('http://localhost:3000')
    print('Browser open successful')

    ################################
    print('\nSignUp test:')

    uname = 'user{0}'.format(1)
    upwd = 'user{0}passwd'.format(1)
    signup_test(uname, upwd, False)
    signup_test(uname, upwd, True)

    ################################
    print('\nSignIn test:')

    signin_test(uname, upwd)

except Exception as e:
    print('next step failed')
    print(e)


sleep(2)
browser.quit()
print('FrontEnd Test terminated')
