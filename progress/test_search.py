import time
from selenium import webdriver
from selenium.webdriver.common.keys import Keys

browser = webdriver.Chrome('/usr/local/bin/chromedriver')
browser.get('http://www.google.co.kr')
search = browser.find_element_by_id('lst-ib')
search.send_keys('sanghoon park'+Keys.RETURN)

browser.execute_script("window.scrollTo(0, document.body.scrollHeight);")

time.sleep(10)

browser.quit()
