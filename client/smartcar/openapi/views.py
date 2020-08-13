from django.views.decorators.csrf import csrf_exempt
from PIL import Image
import os, glob, numpy as np
# from keras.models import load_model
import time
import requests
# import tensorflow as tf
from main.models import CarInfo, PiInfo, ContainerInfo
from main.views import bfs
from map.models import MapInfo
import urllib.request
now_sign1 = 0
now_sign2 = 0

#사진을 가지고 차량 전방의 장애물 판독
# @csrf_exempt
# def camera(request):
#     print('camera 함수 실행')
#     image_w = 64
#     image_h = 64
#
#     pixels = image_h * image_w * 3
#
#     X = []
#
#     img = Image.open("C:\SmartCar\smartcar\openapi/yahait.jpg")
#     img = img.convert("RGB")
#     img = img.resize((image_w, image_h))
#     data = np.asarray(img)
#     X.append(data)
#
#     X = np.array(X)
#     model = load_model('C:\SmartCar\smartcar\openapi/1911151024.model')
#
#     prediction = model.predict(X)
#     np.set_printoptions(formatter={'float': lambda x: "{0:0.3f}".format(x)})
#     cnt = 0
#
#     pre_ans = prediction.argmax()
#     print('식별값은', pre_ans)

@csrf_exempt
def camera2():
    print('camera 함수 실행')
    image_w = 64
    image_h = 64

    pixels = image_h * image_w * 3

    X = []

    img = Image.open("C:\SmartCar\smartcar\openapi/yahait2.jpg")
    img = img.convert("RGB")
    img = img.resize((image_w, image_h))
    data = np.asarray(img)
    X.append(data)

    X = np.array(X)
    model1 = load_model('C:\SmartCar\smartcar\openapi/model4.model')

    prediction = model1.predict(X)
    np.set_printoptions(formatter={'float': lambda x: "{0:0.3f}".format(x)})

    pre_ans = prediction.argmax()
    print('식별값은', pre_ans)

    return pre_ans

#차량 스트리밍 서버에서 사진을 캡쳐해오는 함수
@csrf_exempt
def img(reqeust):
    print(reqeust)
    global now_sign1
    while 1:
        before_sign1 = now_sign1
        # urllib.request.urlretrieve('http://192.168.0.10:5000/?action=snapshot', 'yahait.jpg')
        now_sign1 = camera()
        if before_sign1 != now_sign1:
            result_ai(int(now_sign1), 1)
        time.sleep(1)

@csrf_exempt
def img2():
    global now_sign2
    while 1:
        before_sign2 = now_sign2
        # urllib.request.urlretrieve('http://192.168.0.18:5000/?action=snapshot', 'yahait2.jpg')
        now_sign2 = camera2()
        if before_sign2 != now_sign2:
            result_ai(int(now_sign2), 2)
        time.sleep(2)

@csrf_exempt
def result_ai(val, id):
    # 기본 0 서행 1 멈춤 2 우회 3
    print('val:'+val+'id:'+id)
    if val == 0:
        slow_n_stop(val, id)
    elif val == 1 or 2:
        print('멈춤 or 서행')
        slow_n_stop(val, id)
    elif val == 3:
        print('3우회')
        slow_n_stop(val, id)
        turn(id)
    return 0

#서행
@csrf_exempt
def slow_n_stop(val, id):
    # 기본 0 서행 1 멈춤 2 우회 3
    data = {
        'data': val
    }
    if id == 1:
        URL = 'http://192.168.0.12:8000/OpenCV'
    elif id == 2:
        URL = 'http://192.168.0.19:8000/OpenCV'
    response = requests.post(URL, params=data, allow_redirects=False)
    return 0

#우회
@csrf_exempt
def turn(request, id):
    # 기본 0 서행 1 멈춤 2 우회 3
    carin = CarInfo.objects.get(id=id)
    carin.car_route = '1'
    carin.car_code = '1'
    carin.container_id = ContainerInfo(container_id="t")
    carin.sample = '1'
    carin.for_commute = '1'
    carin.for_index = '1'
    carin.save()
    bfs(request, carin.id, carin.now_x, carin.now_y, carin.target_x, carin.target_y)
    return 0

@csrf_exempt
def camera():
    print('camera 함수 실행')
    image_w = 64
    image_h = 64

    pixels = image_h * image_w * 3

    X = []
    img = Image.open("C:\SmartCar\smartcar\openapi/yahait.jpg")
    img = img.convert("RGB")
    img = img.resize((image_w, image_h))
    data = np.asarray(img)
    X.append(data)
    X = np.array(X)
    model = load_model('C:\SmartCar\smartcar\openapi/1911151024.model')
    print("3")
    prediction = model.predict(X)
    np.set_printoptions(formatter={'float': lambda x: "{0:0.3f}".format(x)})
    cnt = 0
    print("4")
    pre_ans = prediction.argmax()
    print('식별값은', pre_ans)