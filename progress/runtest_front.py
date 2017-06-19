from time import sleep
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.common.exceptions import NoSuchElementException
from selenium.webdriver.support.ui import Select
import sys
################################################################
#(sleep factor)
S = 2
#(number of users)
N = 3
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
        _element.send_keys(_key)# + Keys.RETURN)
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

def signup_test(driver, uname, unick, upwd, duplication, master):
    try:
        click(driver, 'SignUp')
        send(driver, 'input-username', uname)
        send(driver, 'input-nickname', unick)
        send(driver, 'input-password', upwd)
        send(driver, 'input-retypepassword', upwd)
        sleep(0.5 * S)
        #if find_or_error(driver, 'SignUp') == True:
        #    click(driver, 'SignUp')
        sleep(0.5 * S)
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
    #    click(driver, 'SignIn')
    except Exception as e:
        end_test('\nSignIn test failed', e)
    print(uname + ' SignIn success')

def feed_test(driver, contents, scope_index, feed_type):
    try:
        dropdown = Select(find_by_id(driver, 'newFeed-scope'))
        dropdown.select_by_index(scope_index)

        dropdown = Select(find_by_id(driver, 'newFeed-feedtype'))
        if feed_type is 'Text':
            dropdown.select_by_index(0)
        elif feed_type is 'Dropdown':
            dropdown.select_by_index(1)

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
        for i in range(0, 2):
            textarea = textareas[i]
            send_keys(textarea, contents)
            button = buttons[i]
            button.click()
            sleep(S)
            print(' {0} '.format(i), end=' ')
        print('success')
    except Exception as e:
        end_test('\nPOST Reply test failed', e)

def start_chat_test(driver, other_nickname):
    try:
        click(driver, 'chat-button')
        sleep(S)
        send(driver, 'username-textbox', other_nickname)
        click(driver, 'chatting-start-button')
    except Exception as e:
        end_test('\nSTART Chat with {0} test failed'.format(other_nickname), e)
    print('START Chat with {0} test success'.format(other_nickname))

def chat_test(driver, contents, other_nickname):
    try:
        send(driver, 'new-chat-text', contents)
        click(driver, 'new-chat-post')
    except Exception as e:
        end_test('\nPOST CHAT with {0} test failed'.format(other_nickname), e)
    print('POST CHAT message {0} to {1} test success'.format(contents, other_nickname))

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
    S *= 2
    test_url = 'http://13.124.80.116:9000'


for i in range(0, N):
    print('drivers[{0}] open'.format(i))
    drivers.append(webdriver.Chrome('/usr/local/bin/chromedriver'))
    drivers[i].get(test_url)
    print('drivers[{0}] open successful'.format(i))

################################################################
sleep(S)
print('\nSignUp test:')

for i in range(0, N):
    uname = 'user{0}'.format(i)
    unick = 'nick{0}'.format(i)
    upwd = 'user{0}'.format(i)
#    signup_test(drivers[i], uname, unick, upwd, False, True)
    signup_test(drivers[i], uname, unick, upwd, True, True)

################################################################
sleep(S)
print('\nSignIn test:')

for i in range(0, N):
    uname = 'user{0}'.format(i)
    upwd = 'user{0}'.format(i)
    signin_test(drivers[i], uname, upwd)

################################################################
sleep(S)
print('\nPOST Feed test:')

for i in range(0, N):
    for j in range(0, F):
        print('{0} Feed {1}'.format(scopes[int(j % 3)], (j % 3) + 1), end=' ')
        contents = 'Frontend POST user{0}-{1} feed: #hash{0} 종강하고싶다{1}{1} #hash_{0} # ##'.format(i, j + 1)
        feed_test(drivers[i], contents, int(j % 3), 'Text')

for i in range(0, N):
    print('Markdown post by nick{0}'.format(i))
    contents = '# Waiting for jonggang...'
    feed_test(drivers[i], contents, 0, 'Dropdown')

################################################################
sleep(S)
print('\nPOST like/dislike test:')

for i in range(0, N):
    for j in range(0, 3): #(0, F)
        print('{0} {1}th Feed'.format(likes[(i % 2)], j + 1), end=' ')
        like_dislike_feed_test(drivers[i], i % 2)

################################################################
sleep(S)
print('\nPOST Reply test:')

for i in range(0, N):
    print('Reply user{0}'.format(i), end=' ')
    contents = 'Frontend - contents of POST user{0} reply: 종강하고싶다'.format(i)
    reply_test(drivers[i], contents)

################################################################
sleep(S)
print('\nTO and START Chat test:')

for i in range(0, 2):
    i2 = (i + 1) % 2
    other_nickname = 'nick{0}'.format(i2)
    start_chat_test(drivers[i], other_nickname)


################################################################
sleep(S)
print('\nPOST Chat test:')


for j in range(0, C):
    for i in range(0, 2):
        i2 = (i + 1) % 2
        other_nickname = 'nick{0}'.format(i2)
        chat_test(drivers[i], 'Hey nick{0} {1}{1}!'.format(i2, j), other_nickname)

print('one-side chat test')

i = 0
for j in range(0, 5 * C):
    i2 = (i + 1) % 2
    other_nickname = 'nick{0}'.format(i2)
    chat_test(drivers[i], 'Hey nick{0} {1}{1}!(one side)'.format(i2, j), other_nickname)

################################################################
sleep(S)
print('\nPOST MultiChat test:')

for i in range(0, N):
    click(drivers[i], 'main-title-name')
sleep(2 * S)
print('To Main Page success')

for i in range(0, N):
    click(drivers[i], 'multichat-button')
sleep(S)
print('To Multichat Page success')

click(drivers[0], 'multichat-create-button')

for i in range(0, N):
    multichatroom = drivers[i].find_element_by_xpath("//div[@class='multichat-room']")
    multichatroom.click()

print('Enter multichat room success')

for j in range(0, 5 * C):
    for i in range(0, N):
        i2 = (i + 1) % N
        other_nickname = 'nick{0}'.format(i2)
        chat_test(drivers[i], 'Hey nick{0} {1}{1}!'.format(i2, j), other_nickname)

print('POST multichat success')

################################################################
sleep(S)
print('\nTo Feed / Chat / Timeline / HashFeed / Profile test:')

for i in range(0, N):
    click(drivers[i], 'main-title-name')
sleep(2 * S)
print('To Main Page success')

hash = drivers[0].find_element_by_xpath("//button[@class='feed-hashtag']")
hash.click()
sleep(2 * S)
print('To HashFeed Page success')

send(drivers[0], 'find-people-search', 'nick')
sleep(S)
click(drivers[0], 'totimelinenick2')
sleep(2 * S)
print('To user2\'s Timeline Page success')


print('Reply to user2\'s Timeline', end=' ')
contents = 'Frontend - contents of POST user1 reply: ㄹㅇ 언제 끝날까'
reply_test(drivers[0], contents)
sleep(S)
print('POST Reply to user1\'s Timeline')

feed_writer = drivers[0].find_element_by_xpath("//div[@class='feed-writer']")
feed_writer.click()
sleep(2 * S)
print('To user1\'s Timeline Page success')

click(drivers[0],'friend-button')
sleep(S)
print('Add user1 to Friend List success')

click(drivers[0], 'main-title-name')
sleep(2 * S)
print('To Main Page success')

for i in range(0, 2):
    click(drivers[0], 'profile')
    print('To Profile Page success')

    send(drivers[0], 'input-nickname', 'Change{0}'.format(i))
    sleep(0.5 * S)
    passwords = drivers[0].find_elements_by_xpath("//input[@id='input-password']")
    sleep(0.5 * S)
    print('nickname send success')

    if i is 0:
        newPW = 'user0user0'
        currPW = 'user0'
    elif i is 1:
        newPW = 'user0'
        currPW = 'user0user0'

    send_keys(passwords[0], newPW)
    sleep(0.5 * S)
    send(drivers[0], 'input-retypepassword', newPW)
    sleep(0.5 * S)
    send_keys(passwords[1], currPW)
    sleep(0.5 * S)
    print('password send success')

    circle = drivers[0].find_element_by_xpath("//div[@title='#f44336']")
    circle.click()
    sleep(0.5 * S)

    default_theme = drivers[0].find_element_by_xpath("//input[@type='checkbox']")
    default_theme.click()
    print('change theme success')

    sleep(0.5 * S)

    confirm = drivers[0].find_element_by_xpath("//button[@id='change-password']")
    confirm.click()

    print('Change Profile success {0}'.format(i + 1))
    sleep(S)

for i in range(0, N):
    click(drivers[i], 'logout')
sleep(2 * S)
print('logout success')

################################################################
#print('\nTo Feed / Chat / Timeline / HashFeed test:')

################################################################
sleep(3 * S)
for i in range(0, N):
    drivers[i].quit()
print('FrontEnd Test terminated')
