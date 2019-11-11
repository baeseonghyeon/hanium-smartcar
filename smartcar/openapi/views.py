from .models import IMG
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse
from selenium import webdriver
from PIL import Image
import io
import os, glob, numpy as np
from keras.models import load_model
import tensorflow as tf
import time

@csrf_exempt
def img(request):
    options = webdriver.ChromeOptions()
    options.add_argument('headless')
    options.add_argument('window-size=1280x1024')
    options.add_argument("disable-gpu")
    driver = webdriver.Chrome('D:\chromedriver_win32/chromedriver.exe', chrome_options=options)

    driver.get('http://192.168.0.10:5000/')
    while 1:
        driver.get_screenshot_as_file('C:\SmartCar\smartcar\openapi/yahait.jpg')
        time.sleep(2)
        # driver.get_screenshot_as_file('C:\SmartCar\smartcar\static\img/yahait.jpg')
    driver.quit()
    print('이미지 크롤링')

@csrf_exempt
def result_ai(request):
    # 기본 0 서행 1 멈춤 2 우회 3

    return 0
