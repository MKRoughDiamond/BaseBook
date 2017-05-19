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

def signup_post_test(driver, uname, upwd, duplication, masterS):
    try:
        click(driver, 'SignUp')
        send(driver, 'input-username', uname)
        send(driver, 'input-password', upwd)
        send(driver, 'input-retypepassword', upwd)
        click(driver, 'SignUp')
        if masterS == False: ######
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
        if find_or_error(driver, 'login-error-confirm') == True:
            click(driver, 'login-error-confirm')
    except Exception as e:
        end_test('\nSignUp test failed', e)

def signin_post_test(driver, uname, upwd):
    try:
        send(driver, 'input-username', uname)
        send(driver, 'input-password', upwd)
        click(driver, 'SignIn')
    except Exception as e:
        end_test('\nSignIn test failed', e)
    print(uname + ' SignIn success')

def feed_post_test(driver, contents, scope_index):
    try:
        dropdown = Select(find_by_id(driver, 'newFeed-scope'))
        dropdown.select_by_index(scope_index)
        send(driver, 'newFeed-text', contents)
        click(driver, 'newFeed-post')
    except Exception as e:
        end_test('\n{0} POST Feed test failed'.format(scopes[scope_index]), e)
    print(uname + ' POST Feed success')

def like_dislike_post_test(driver, feed_index):
    like_index = feed_index % 2
    try:
        click(driver, 'feed{0}-'.format(feed_index + 1) + likes[like_index])
        #button = driver.find_element_by_xpath("//div[@id='feed-entries']/div[{0}]/div[1]/button[{1}]/".format(feed_index + 1, 4 - like_index))
        #button.click()
    except Exception as e:
        end_test('\n{0} POST Good/Bad test failed'.format(likes[like_index]), e)
    print('POST ' + likes[like_index] + ' success')

def reply_post_test(driver, contents, feed_index):
    try:
        pass
    except Exception as e:
        end_test('\n{0} POST Reply test failed'.format(feed_index), e)

def start_chat_test(driver, other_username):
    try:
        click(driver, 'chat-button')
        sleep(0.5)
        send(driver, 'username-textbox', other_username)
        click(driver, 'chatting-start-button')
    except Exception as e:
        end_test('\nSTART Chat with {0} test failed'.format(other_username), e)
    print('START Chat with {0} test success'.format(other_username))

def chat_post_test(driver, contents, other_username):
    try:
        send(driver, 'new-chat-text', contents)
        click(driver, 'new-chat-post')
    except Exception as e:
        end_test('\nPOST CHAT with {0} test failed'.format(other_username), e)
    print('POST CHAT message {0} to {1} test success'.format(contents, other_username))

'''
Select dropdown = new Select(driver.findElement(By.id("designation")));
dropdown.selectByVisibleText("Programmer ");
dropdown.selectByIndex(1);
dropdown.selectByValue("prog");
'''

print('################################################################')
print('FrontEnd Test')
print('################################################################')

for i in range(0, N):
    print('drivers[{0}] open'.format(i))
    drivers.append(webdriver.Chrome('/usr/local/bin/chromedriver'))
    drivers[i].get('http://localhost:3000')
    #drivers[i].get('http://13.124.80.116:3000')
    print('drivers[{0}] open successful'.format(i))

################################################################
print('\nSignUp test:')

for i in range(0, N):
    uname = 'userF{0}'.format(i)
    upwd = 'userF{0}passwd'.format(i)
    signup_post_test(drivers[i], uname, upwd, False, True)
    signup_post_test(drivers[i], uname, upwd, True, True)

################################################################
print('\nSignIn test:')

for i in range(0, N):
    uname = 'userF{0}'.format(i)
    upwd = 'userF{0}passwd'.format(i)
    signin_post_test(drivers[i], uname, upwd)

################################################################
print('\nPOST Feed test:')

for i in range(0, N):
    for j in range(0, F):
        print('{0} Feed {1}'.format(scopes[int(j / 2)], (j % 2) + 1), end=' ')
        contents = 'Frontend - contents of POST userF{0}-{1} feed: 종강하고싶다{1}{1}'.format(i, j + 1)
        feed_post_test(drivers[i], contents, int(j/2))

################################################################
print('\nPOST like/dislike test:')

for i in range(0, N):
    for j in range(0, F): #(0, F)
        print('{0} Feed {1}'.format(likes[(i % 2)], j), end=' ')
        like_dislike_post_test(drivers[i], F * i + j)

################################################################
'''print('\nPOST Reply test:')

for i in range(0, N):
    for j in range(0, F):
        print('Reply {0}'.format(j), end=' ')
        contents = 'Frontend - contents of POST userF{0}-{1} reply: 종강하고싶다{1}{1}'.format(i, j + 1)
        reply_post_test(drivers[i], contents, j)
'''
################################################################
print('\nTO and START Chat test:')

for i in range(0, N):
    j = (i + 1) % N
    other_username = 'userF{0}'.format(j)
    start_chat_test(drivers[i], other_username)


################################################################
print('\nPOST Chat test:')

for j in range(0, C):
    for i in range(0, N):
        i2 = (i + 1) % N
        other_username = 'userF{0}'.format(j)
        chat_post_test(drivers[i], 'Hey userF{0} {1}{1}!'.format(i2, j), other_username)
    pass

print('one-side chat test')

i = 0
for j in range(0, C * 5):
    i2 = (i + 1) % N
    other_username = 'userF{0}'.format(j)
    chat_post_test(drivers[i], 'Hey userF{0} {1}{1}!(one side)'.format(i2, j), other_username)

################################################################
sleep(4)
for i in range(0, N):
    drivers[i].quit()
print('FrontEnd Test terminated')
