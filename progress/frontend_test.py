from time import sleep
from selenium import webdriver
from selenium.webdriver.common.keys import Keys

# (number of user) + 1
N = 6

import os
import sys
sys.path.append(os.path.dirname(os.path.abspath(os.path.dirname(__file__))) )
#import testlibrary.py

print('################################')
print('FrontEnd Test')
print('################################')

print('Browser open')
try:
    browser = webdriver.Chrome('/usr/local/bin/chromedriver')
    browser.get('http://localhost:3000')
    print('Browser open successful')

    ################################
    print('\nSignUp test:')

    uname = 'user{0}'.format(1)
    upwd  = 'user{0}passwd'.format(1)

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
    print(uname + ' SignUp Successful')

    ################################
    print('\nSignIn test:')

    browser.find_element_by_id('input-username').send_keys(uname + Keys.RETURN)
    sleep(0.5)
    browser.find_element_by_id('input-password').send_keys(upwd + Keys.RETURN)
    sleep(0.5)
    browser.find_element_by_id('SignIn').click()
    sleep(1.0)

    print(uname + ' SignIn Successful')

except Exception:
    print('next step failed')


sleep(2)
print('FrontEnd Test terminated')
browser.quit()
