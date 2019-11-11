from selenium import webdriver
import os
import time
options = webdriver.ChromeOptions()
options.add_argument('headless')
options.add_argument('window-size=1280x1024')
options.add_argument("disable-gpu")
driver = webdriver.Chrome('D:\chromedriver_win32/chromedriver.exe', chrome_options=options)

# driver.get('http://192.168.0.12:5000/')
driver.get('https://new.syu.ac.kr/')
for x in range(10):
    print(x, '번')
    time.sleep(1)
    driver.get_screenshot_as_file('C:\SmartCar\smartcar\openapi/yahait.jpg')
# driver.get_screenshot_as_file('C:\SmartCar\smartcar\static\img/yahait.jpg')
driver.quit()