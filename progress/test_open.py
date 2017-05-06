from selenium import webdriver

browser = webdriver.Chrome('/usr/local/bin/chromedriver')

browser.get('http://www.google.co.kr')
browser.quit()
