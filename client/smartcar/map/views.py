from django.shortcuts import render
from .models import MapInfo
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse
from main.models import CarInfo
import time

@csrf_exempt
def refresh(request):
    #차량위치정보 변경
    aa = request.POST['target_x']
    bb = request.POST['target_y']
    carin = CarInfo.objects.get(id=request.POST['car_number'])
    soon = ''
    park = carin.car_route.split(']')
    park2 = [[0 for x in range(len(park)-1)] for y in range(len(park)-1)]
    for x in range(len(park)-1):
        park2[x] = park[x].split('a')

    #맵 변경
    mapin = MapInfo.objects.get(id=1)
    kim = mapin.map.split('s')
    kim2 = [[0 for x in range(14)] for y in range(14)]
    for x in range(14):
        kim2[x] = kim[x].split(', ')
    for x in range(len(park)-1):
        kim2[int(park2[x][0])][int(park2[x][1])] = '0'
    for x in range(14):
        for y in range(14):
            soon += str(kim2[x][y])
            if y != 13:
                soon += ', '
        soon += 's'
    mapin.map = soon
    mapin.save()
    carin.now_x = aa
    carin.now_y = bb
    carin.target_x = ''
    carin.target_y = ''
    carin.car_route = '1'
    carin.car_code = '1'
    carin.save()
    return HttpResponse('')

@csrf_exempt
def reset_xy(request):
    #차넘버, 출발,도착좌표 받아오기
    id = request.POST['car_number']
    xxxx = request.POST['xxx']
    yyyy = request.POST['yyy']
    aaaa = request.POST['aaa']
    bbbb = request.POST['bbb']
    soon = ''

    #맵 2차원 배열로 쪼갬
    db_map = MapInfo.objects.get(id='1')
    kim = db_map.map.split('s')
    kim2 = [[0 for x in range(14)] for y in range(14)]
    for x in range(14):
        kim2[x] = kim[x].split(', ')

    #출발, 도착 좌표 초기화
    kim2[int(xxxx)][int(yyyy)] = '0'
    kim2[int(aaaa)][int(bbbb)] = '0'

    #CarInfo의 route값으로 경로 초기화
    carin = CarInfo.objects.get(id=id)
    park = carin.car_route.split(']')
    park3 = len(park) - 1
    park2 = [[0 for x in range(park3)] for y in range(park3)]
    for x in range(park3):
        park2[x] = park[x].split('a')
    for x in range(park3):
        kim2[int(park2[x][0])][int(park2[x][1])] = '0'

    #초기화 후 맵 수정, 저장
    for x in range(14):
        for y in range(14):
            soon += str(kim2[x][y])
            if y != 13:
                soon += ', '
        soon += 's'
    db_map.map = soon
    db_map.save()

    #도착점, 출발점, 경로 초기화
    carin.now_x = '1'
    carin.now_y = '1'
    carin.target_x = ''
    carin.target_y = ''
    carin.car_route = '1'
    carin.car_speed = ''
    carin.car_arrive_time = ''
    carin.car_now_situation = ''
    carin.car_destination_distance = ''
    carin.save()
    return HttpResponse('')

@csrf_exempt
def reset_xy2(request):
    carin = CarInfo.objects.get(id=request.POST['car_number'])
    carin.now_x = '1'
    carin.now_y = '1'
    carin.save
    return HttpResponse('')

