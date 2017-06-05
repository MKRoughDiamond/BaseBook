from time import sleep
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.common.exceptions import NoSuchElementException
from selenium.webdriver.support.ui import Select
import sys
################################################################
#(sleep factor)
S = 0.5
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
    sleep(S)

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
    sleep(S)

def signup_test(driver, uname, upwd, duplication, master):
    try:
        click(driver, 'SignUp')
        send(driver, 'input-username', uname)
        send(driver, 'input-password', upwd)
        send(driver, 'input-retypepassword', upwd)
        click(driver, 'SignUp')
        if master==True:
            exist = find_or_error(driver, 'login-error-box') and \
                    find_or_error(driver, 'login-error-msg') and \
                    find_or_error(driver, 'login-error-confirm')
            if exist:
                click(driver, 'login-error-confirm')
        else:
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

def signin_test(driver, uname, upwd):
    try:
        send(driver, 'input-username', uname)
        send(driver, 'input-password', upwd)
        click(driver, 'SignIn')
    except Exception as e:
        end_test('\nSignIn test failed', e)
    print(uname + ' SignIn success')

def feed_test(driver, contents, scope_index):
    try:
        dropdown = Select(find_by_id(driver, 'newFeed-scope'))
        dropdown.select_by_index(scope_index)
        send(driver, 'newFeed-text', contents)
        click(driver, 'newFeed-post')
    except Exception as e:
        end_test('\n{0} POST Feed test failed'.format(scopes[scope_index]), e)
    print(uname + ' POST Feed success')

def like_dislike_feed_test(driver, like_dislike):
    try:
        buttons = driver.find_elements_by_xpath("//button[@class='feed-{0}']".format(likes[like_dislike % 2]))
        for i in range(0, 3):
            button = buttons[i]
            button.click()
            sleep(S)
    except Exception as e:
        end_test('\n{0} POST like/dislike test failed'.format(likes[like_dislike]), e)
    print('POST ' + likes[like_dislike] + ' success')

def reply_test(driver, contents):
    try:
        #newReplys = driver.find_elements_by_xpath("//div[@id=newReply]/")
        textareas = driver.find_elements_by_xpath("//textarea[@id='newReply-text']")
        buttons = driver.find_elements_by_xpath("//button[@class='newReply-post']")
        for i in range(0, 3):
            textarea = textareas[i]
            send_keys(textarea, contents)
            button = buttons[i]
            button.click()
            sleep(S)
            print(' {0} '.format(i), end=' ')
        print('success')
    except Exception as e:
        end_test('\nPOST Reply test failed', e)

def start_chat_test(driver, other_username):
    try:
        click(driver, 'chat-button')
        sleep(S)
        send(driver, 'username-textbox', other_username)
        click(driver, 'chatting-start-button')
    except Exception as e:
        end_test('\nSTART Chat with {0} test failed'.format(other_username), e)
    print('START Chat with {0} test success'.format(other_username))

def chat_test(driver, contents, other_username):
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

test_url = 'http://localhost:3000'

if len(sys.argv) == 1:
    S *= 4
    test_url = 'http://13.124.80.116:9000'



#print(len(sys.argv))

for i in range(0, N):
    print('drivers[{0}] open'.format(i))
    drivers.append(webdriver.Chrome('/usr/local/bin/chromedriver'))
    drivers[i].get(test_url)
    print('drivers[{0}] open successful'.format(i))

################################################################
print('\nSignUp test:')

for i in range(0, N):
    uname = 'user{0}'.format(i)
    upwd = 'user{0}'.format(i)
#    signup_test(drivers[i], uname, upwd, False, True)
    signup_test(drivers[i], uname, upwd, True, True)

################################################################
print('\nSignIn test:')

for i in range(0, N):
    uname = 'user{0}'.format(i)
    upwd = 'user{0}'.format(i)
    signin_test(drivers[i], uname, upwd)

################################################################
print('\nPOST Feed test:')

for i in range(0, N):
    for j in range(0, F):
        print('{0} Feed {1}'.format(scopes[int(j / 2)], (j % 2) + 1), end=' ')
        contents = 'Frontend POST user{0}-{1} feed: #hash{0} 종강하고싶다{1}{1} #hash_{0} # ##'.format(i, j + 1)
        feed_test(drivers[i], contents, int(j/2))

################################################################
print('\nPOST like/dislike test:')

for i in range(0, N):
    for j in range(0, 3): #(0, F)
        print('{0} {1}th Feed'.format(likes[(i % 2)], j + 1), end=' ')
        like_dislike_feed_test(drivers[i], i % 2)

################################################################
print('\nPOST Reply test:')

for i in range(0, N):
    print('Reply user{0}'.format(i), end=' ')
    contents = 'Frontend - contents of POST user{0} reply: 종강하고싶다'.format(i)
    reply_test(drivers[i], contents)

################################################################
print('\nTO and START Chat test:')

for i in range(0, N):
    i2 = (i + 1) % N
    other_username = 'user{0}'.format(i2)
    start_chat_test(drivers[i], other_username)


################################################################
print('\nPOST Chat test:')

for j in range(0, C):
    for i in range(0, N):
        i2 = (i + 1) % N
        other_username = 'user{0}'.format(i2)
        chat_test(drivers[i], 'Hey user{0} {1}{1}!'.format(i2, j), other_username)
    pass

print('one-side chat test')

i = 0
for j in range(0, C * 5):
    i2 = (i + 1) % N
    other_username = 'user{0}'.format(j)
    chat_test(drivers[i], 'Hey user{0} {1}{1}!(one side)'.format(i2, j), other_username)

################################################################
print('\nTo Feed / Chat / Timeline / HashFeed test:')

click(drivers[0], 'main-title-name')
sleep(2 * S)
print('To Main Page success')

hash = drivers[0].find_element_by_xpath("//button[@class='feed-hashtag']")
hash.click()
sleep(2 * S)
print('To HashFeed Page success')

send(drivers[0], 'find-people-search', 'user')
sleep(S)
click(drivers[0], 'totimelineuser1')
sleep(2 * S)
print('To user\'s Timeline Page success')

feed_writer = drivers[0].find_element_by_xpath("//div[@class='feed-writer']")
feed_writer.click()
sleep(2 * S)
print('To user\'s Timeline Page success')

click(drivers[0], 'main-title-name')
sleep(2 * S)
print('To Main Page success')

click(drivers[0], 'logout')
sleep(2 * S)
print('logout success')

################################################################
#print('\nTo Feed / Chat / Timeline / HashFeed test:')

################################################################
sleep(4 * S)
for i in range(0, N):
    drivers[i].quit()
print('FrontEnd Test terminated')
