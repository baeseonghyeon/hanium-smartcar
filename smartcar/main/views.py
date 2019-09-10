from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from .models import CarInfo, PiInfo, ContainerInfo
from map.models import MapInfo
from django.http import HttpResponseRedirect, HttpResponse
import requests

import time

@csrf_exempt
def Car_input(request):
    car_name = request.POST['car_name']
    pi_id = request.POST['pi_id']
    carin = CarInfo.objects.create()
    carin.car_name = car_name
    carin.pi_id = PiInfo.objects.get(pi_id=pi_id)
    carin.save()
    return HttpResponseRedirect('/')

@csrf_exempt
def pi_test3(request):
    # data = request.GET
    # pi_con = data.dict()
    # pi_id = pi_con['car_id']
    # con_id = pi_con['ConInf']
    # destination_x = pi_con['destination_x']
    # destination_y = pi_con['destination_y']

    pi_id = request.POST['sample_car_id']
    con_id = request.POST['con_id']
    destination_x = request.POST['x']
    destination_y = request.POST['y']
    carin = CarInfo.objects.get(id=pi_id)
    if carin.container_id == None:
        carin.container_id = ContainerInfo.objects.get(container_id=con_id)
        carin.save()
    bfs(request, carin.id, carin.now_x, carin.now_y, destination_x, destination_y)
    return HttpResponseRedirect('/')

@csrf_exempt
def pi_test4(request):
    index = 0
    move = [0 for x in range(20)]
    i = 0
    route = request.POST['code'].split(']')
    route2 = [[0 for x in range(2)] for y in range(len(route)-1)]
    for x in range(len(route)-1):
        route2[x] = route[x].split('a')
    for x in range(len(route2)-1):
        for y in range(2):
            route2[x][y] = int(route2[x][y])
    try:
        while 1:
            if route2[index + 2][0] == route2[index][0] + 1:
                if route2[index + 2][1] == route2[index][1] + 1:
                    if route2[index][0] == route2[index][0]:
                        move[i] = '21'
                        index += 2
                        i += 1
                        continue
                    elif route2[index +1][1] == route2[index][1]:
                        move[i] = '33'
                        index += 2
                        i += 1
                        continue
            if route2[index + 2][0] == route2[index][0] - 1:
                if route2[index + 2][1] == route2[index][1] + 1:
                    if route2[index][0] == route2[index + 1][0]:
                        move[i] = '31'
                        index += 2
                        i += 1
                        continue
                    elif route2[index + 1][1] == route2[index][1]:
                        move[i] = '23'
                        index += 2
                        i += 1
                continue
            if route2[index + 2][0] == route2[index][0] - 1:
                if route2[index + 2][1] == route2[index][1] - 1:
                    if route2[index][0] == route2[index + 1][0]:
                        move[i] = '22'
                        index += 2
                        i += 1
                        continue
                    elif route2[index + 1][1] == route2[index][1]:
                        move[i] = '34'
                        index += 2
                        i += 1
                        continue
            if route2[index + 2][0] == route2[index][0] + 1:
                if route2[index + 2][1] == route2[index][1] - 1:
                    if route2[index + 1][1] == route2[index][1]:
                        move[i] = '24'
                        index += 2
                        i += 1
                        continue
                    elif route2[index + 1][0] == route2[index][0]:
                        move[i] = '32'
                        index += 2
                        i += 1
                        continue
            if route2[index][0] == route2[index + 1][0]:
                if route2[index][1] > route2[index + 1][1]:
                    move[i] = '13'
                    index += 1
                    i += 1
                    continue
                if route2[index][1] < route2[index + 1][1]:
                    move[i] = '11'
                    index += 1
                    i += 1
                    continue
            if route2[index][1] == route2[index + 1][1]:
                if route2[index + 1][0] > route2[index][0]:
                    move[i] = '12'
                    index += 1
                    i += 1
                    continue
                if route2[index][0] > route2[index + 1][0]:
                    move[i] = '14'
                    index += 1
                    i += 1
                    continue
    except (IndexError, TypeError):
        pass
    print(move)
    id = request.POST['car_id']
    for x in range(len(move)):
        car_pi(move[x], 2*x, id, request)
    return HttpResponseRedirect('/')

@csrf_exempt
def car_pi(code, index, id, request):
    data = {
        'code': code,
        'index': index,
        'id': id
    }
    time.sleep(3)
    URL = 'http://127.0.0.1:8000/main/pi_test5'
    request = requests.post(URL, params=data)
    return HttpResponseRedirect('/')

@csrf_exempt
def pi_test5(request):
    data = request.GET
    diction = data.dict()
    carin = CarInfo.objects.get(id=diction['id'])
    carin.for_commute = diction['index']
    carin.now_behavior = diction['code']
    carin.save()
    print(diction['id'])
    print(diction['index'])
    print(diction['code'])
    return HttpResponseRedirect('/')

@csrf_exempt
def Car_detail(request):
    num = request.POST['carNumber']
    return render(request, 'car_detail.html', {'carNumber': num})

@csrf_exempt
def position(request):
    carin = CarInfo.objects.get(id=request.POST['car_number'])
    carin.position = request.POST['position']
    carin.save()
    return HttpResponseRedirect('')

@csrf_exempt
def straight_xy(request):
    carin = CarInfo.objects.get(id=request.POST['car_number'])
    posi = carin.position
    if posi == '3':
        cc = int(carin.now_y)
        cc += 1
        carin.now_y = cc
    elif posi == '1':
        cc = int(carin.now_x)
        cc -= 1
        carin.now_x = cc
    elif posi == '2':
        cc = int(carin.now_y)
        cc -= 1
        carin.now_y = cc
    elif posi == '4':
        cc = int(carin.now_x)
        cc += 1
        carin.now_x = cc
    carin.save()
    return HttpResponseRedirect('')

@csrf_exempt
def back_xy(request):
    carin = CarInfo.objects.get(id=request.POST['car_number'])
    posi = carin.position
    if posi == '3':
        cc = int(carin.now_y)
        cc -= 1
        carin.now_y = cc
    elif posi == '1':
        cc = int(carin.now_x)
        cc += 1
        carin.now_x = cc
    elif posi == '2':
        cc = int(carin.now_y)
        cc += 1
        carin.now_y = cc
    elif posi == '4':
        cc = int(carin.now_x)
        cc -= 1
        carin.now_x = cc
    carin.save()
    return HttpResponseRedirect('')

@csrf_exempt
def right_xy(request):
    carin = CarInfo.objects.get(id=request.POST['car_number'])
    posi = carin.position
    if posi == '3':
        cc = int(carin.now_x)
        ss = int(carin.now_y)
        cc += 1
        ss += 1
        carin.now_x = cc
        carin.now_y = ss
    elif posi == '1':
        cc = int(carin.now_x)
        ss = int(carin.now_y)
        cc -= 1
        ss += 1
        carin.now_x = cc
        carin.now_y = ss
    elif posi == '2':
        cc = int(carin.now_x)
        ss = int(carin.now_y)
        cc -= 1
        ss -= 1
        carin.now_x = cc
        carin.now_y = ss
    elif posi == '4':
        cc = int(carin.now_x)
        ss = int(carin.now_y)
        cc += 1
        ss -= 1
        carin.now_x = cc
        carin.now_y = ss
    carin.save()
    return HttpResponseRedirect('')

@csrf_exempt
def left_xy(request):
    carin = CarInfo.objects.get(id=request.POST['car_number'])
    posi = carin.position
    if posi == '3':
        cc = int(carin.now_x)
        ss = int(carin.now_y)
        cc -= 1
        ss += 1
        carin.now_x = cc
        carin.now_y = ss
    elif posi == '1':
        cc = int(carin.now_x)
        ss = int(carin.now_y)
        cc -= 1
        ss -= 1
        carin.now_x = cc
        carin.now_y = ss
    elif posi == '2':
        cc = int(carin.now_x)
        ss = int(carin.now_y)
        cc += 1
        ss -= 1
        carin.now_x = cc
        carin.now_y = ss
    elif posi == '4':
        cc = int(carin.now_x)
        ss = int(carin.now_y)
        cc += 1
        ss += 1
        carin.now_x = cc
        carin.now_y = ss
    carin.save()
    return HttpResponseRedirect('')

@csrf_exempt
def bfs(request, car_id, xxx, yyy, aaa, bbb):
    db_map = MapInfo.objects.get(id='1') #알고리즘용
    mapin = MapInfo.objects.get(id='1') #저장용

    id = car_id
    carin = CarInfo.objects.get(id=id)
    xxxx = xxx
    yyyy = yyy
    aaaa = aaa
    bbbb = bbb
    views_map = ''
    views_route = ''

    #알고리즘 적용할 map
    park = db_map.map.split('s')
    park2 = [[0 for x in range(14)] for y in range(14)]
    for x in range(14):
        park2[x] = park[x].split(', ')
    for x in range(14):
        for y in range(14):
            park2[x][y] = int(park2[x][y])
            if park2[x][y] == 8:
                park2[x][y] = 1
            if park2[x][y] == 2:
                park2[x][y] = 1

    #db에 저장할 map
    kim = db_map.map.split('s')
    kim2 = [[0 for x in range(14)] for y in range(14)]
    for x in range(14):
        kim2[x] = kim[x].split(', ')

    start1 = int(xxxx)
    start2 = int(yyyy)
    destination1 = int(aaaa)
    destination2 = int(bbbb)
    park2[destination1][destination2] = 0

    map_time = [[0 for x in range(14)] for y in range(14)]
    map = [park2, map_time]
    # 알고리즘
    # 맵의 가로세로. 맵 수정 시 변경
    visit = [[0] * 14 for _ in range(14)]
    queue = []
    path = []
    path_real = []
    dir = [[0, 1], [1, 0], [0, -1], [-1, 0]]
    queue.append([start1, start2])
    while queue:
        node = queue.pop(0)
        x = node[0]
        y = node[1]
        visit[x][y] = 1
        time_now = int(time.time())
        for i in range(4):
            wx = x + dir[i][0]
            wy = y + dir[i][1]
            if visit[wx][wy] == 0 and (map[0][wx][wy] != 1 and map[0][wx][wy] != 2) and map[1][wx][wy] < time_now:
                visit[wx][wy] = 1
                queue.append([wx, wy])
                # 부모노드, 현재위치
                path.append([node, [wx, wy]])
                if [wx, wy] == [destination1, destination2]:
                    path.reverse()
                    temp = path[0][0]
                    path_real.append(path[0][1])
                    for i in range(len(path)):
                        if path[i][1] == temp:
                            path_real.append(path[i][1])
                            temp = path[i][0]
                    path_real.append([start1, start2])
                    path_real.reverse()
                    # print(path_real)
                    for j in range(len(path_real)):
                        # 시간 추가하기 한 칸을 일단 0.1초로 설정
                        map[1][path_real[j][0]][path_real[j][1]] = time_now + (0.1 * j)
                    queue.clear()
                    break

    # #pi로 전송하기 위한 데이터 가공
    value = ''
    path1 = len(path_real)
    value2 = [[0 for x in range(path1)] for y in range(path1)]
    for idx, val in enumerate(path_real):
        value += str(val[0])
        value += ', '
        value += str(val[1])
        value += ']'
    value1 = value.split(']')
    for x in range(path1):
        value2[x] = value1[x].split(', ')

    for x in range(path1):
        for y in range(2):
            value2[x][y] = int(value2[x][y])
    #pi로 전송할 데이터 뽑아내기
    index = 0
    code = ''
    position = '3'
    try:
        while True:
            if value2[index + 2][0] == value2[index][0] + 1:
                if value2[index + 2][1] == value2[index][1] + 1:
                    if value2[index + 1][0] == value2[index][0]:
                        print('우회전')
                        index += 2
                        code += '2 '
                        continue
                    elif value2[index + 1][1] == value2[index][1]:
                        print('좌회전')
                        index += 2
                        code += '3 '
                        continue
            elif value2[index + 2][0] == value2[index][0] - 1:
                if value2[index + 2][1] == value2[index][1] - 1:
                    if value2[index][0] == value2[index + 1][0]:
                        print('우회전')
                        index += 2
                        code += '2 '
                        continue
                    elif value2[index][1] == value2[index + 1][1]:
                        print('좌회전')
                        index += 2
                        code += '3 '
                        continue
            elif value2[index + 2][0] == value2[index][0] - 1:
                if value2[index + 2][1] == value2[index][1] + 1:
                    if value2[index][1] == value2[index + 1][1]:
                        print('우회전')
                        index += 2
                        code += '2 '
                        continue
                    elif value2[index][0] == value2[index + 1][0]:
                        print('좌회전')
                        index += 2
                        code += '3 '
                        continue
            elif value2[index + 2][0] == value2[index][0] + 1:
                if value2[index + 2][1] == value2[index][1] - 1:
                    if value2[index][1] == value2[index + 1][1]:
                        print('우회전')
                        index += 2
                        code += '2 '
                        continue
                    elif value2[index][0] == value2[index + 1][0]:
                        print('좌회전')
                        index += 2
                        code += '3 '
                        continue
            elif value2[index][0] == value2[index + 1][0]:
                if value2[index][1] > value2[index + 1][1]:
                    print('전진')
                    code += '1 '
                    index += 1
                    continue
                elif value2[index][1] < value2[index + 1][1]:
                    print('전진')
                    code += '1 '
                    index += 1
                    continue
            elif value2[index][1] == value2[index + 1][1]:
                if value2[index + 1][0] > value2[index][0]:
                    print('전진')
                    code += '1 '
                    index += 1
                    continue
                elif value2[index][0] > value2[index + 1][0]:
                    print('전진')
                    code += '1 '
                    index += 1
                    continue
            index += 1
    except IndexError:
        pass
    code += '1 '
    #경로저장
    idx = 0
    try:
        while True:
            if path_real[idx][0] + 1 == path_real[idx + 2][0]:
                if path_real[idx][1] + 1 == path_real[idx + 2][1]:
                    if path_real[idx][0] == path_real[idx + 1][0]:
                        kim2[path_real[idx][0]][path_real[idx][1]] = '41'
                        kim2[path_real[idx + 1][0]][path_real[idx + 1][1]] = '43'
                        kim2[path_real[idx + 2][0]][path_real[idx + 2][1]] = '42'
                        idx += 3
                        continue
                    elif path_real[idx][1] == path_real[idx + 1][1]:
                        kim2[path_real[idx][0]][path_real[idx][1]] = '42'
                        kim2[path_real[idx + 1][0]][path_real[idx + 1][1]] = '44'
                        kim2[path_real[idx + 2][0]][path_real[idx + 2][1]] = '41'
                        idx += 3
                        continue
            if path_real[idx][0] - 1 == path_real[idx + 2][0]:
                if path_real[idx][1] + 1 == path_real[idx + 2][1]:
                    if path_real[idx][1] == path_real[idx + 1][1]:
                        kim2[path_real[idx][0]][path_real[idx][1]] = '42'
                        kim2[path_real[idx + 1][0]][path_real[idx + 1][1]] = '45'
                        kim2[path_real[idx + 2][0]][path_real[idx + 2][1]] = '41'
                        idx += 3
                        continue
                    elif path_real[idx][0] == path_real[idx + 1][0]:
                        kim2[path_real[idx][0]][path_real[idx][1]] = '41'
                        kim2[path_real[idx + 1][0]][path_real[idx + 1][1]] = '46'
                        kim2[path_real[idx + 2][0]][path_real[idx + 2][1]] = '42'
                        idx += 3
                        continue
            if path_real[idx][0] - 1 == path_real[idx + 2][0]:
                if path_real[idx][1] - 1 == path_real[idx + 2][1]:
                    if path_real[idx][1] == path_real[idx + 1][1]:
                        kim2[path_real[idx][0]][path_real[idx][1]] = '42'
                        kim2[path_real[idx + 1][0]][path_real[idx + 1][1]] = '43'
                        kim2[path_real[idx + 2][0]][path_real[idx + 2][1]] = '41'
                        idx += 3
                        continue
                    elif path_real[idx][0] == path_real[idx + 1][0]:
                        kim2[path_real[idx][0]][path_real[idx][1]] = '41'
                        kim2[path_real[idx + 1][0]][path_real[idx + 1][1]] = '44'
                        kim2[path_real[idx + 2][0]][path_real[idx + 2][1]] = '42'
                        idx += 3
                        continue
            if path_real[idx][0] + 1 == path_real[idx + 2][0]:
                if path_real[idx][1] - 1 == path_real[idx + 2][1]:
                    if path_real[idx][1] == path_real[idx + 1][1]:
                        kim2[path_real[idx][0]][path_real[idx][1]] = '42'
                        kim2[path_real[idx + 1][0]][path_real[idx + 1][1]] = '46'
                        kim2[path_real[idx + 2][0]][path_real[idx + 2][1]] = '41'
                        idx += 3
                        continue
                    elif path_real[idx][0] == path_real[idx + 1][0]:
                        kim2[path_real[idx][0]][path_real[idx][1]] = '41'
                        kim2[path_real[idx + 1][0]][path_real[idx + 1][1]] = '45'
                        kim2[path_real[idx + 2][0]][path_real[idx + 2][1]] = '42'
                        idx += 3
                        continue
            if path_real[idx][0] == path_real[idx + 1][0]:
                if path_real[idx][1] + 1 == path_real[idx + 1][1]:
                    kim2[path_real[idx][0]][path_real[idx][1]] = '41'
                    idx += 1
                    continue
                elif path_real[idx][1] - 1 == path_real[idx + 1][1]:
                    kim2[path_real[idx][0]][path_real[idx][1]] = '41'
                    idx += 1
                    continue
            if path_real[idx][1] == path_real[idx + 1][1]:
                if path_real[idx][0] + 1 == path_real[idx + 1][0]:
                    kim2[path_real[idx][0]][path_real[idx][1]] = '42'
                    idx += 1
                    continue
                elif path_real[idx][0] - 1 == path_real[idx + 1][0]:
                    kim2[path_real[idx][0]][path_real[idx][1]] = '42'
                    idx += 1
                    continue
    except IndexError:
        pass
    # indexerror 때문에 경로 끝까지 못 가는 부분 처리
    ix = len(path_real)-3
    if kim2[path_real[ix][0]][path_real[ix][1]] == '41' or '42':
        if kim2[path_real[ix + 1][0]][path_real[ix + 1][1]] == '0':
            kim2[path_real[ix + 1][0]][path_real[ix + 1][1]] = kim2[path_real[ix][0]][path_real[ix][1]]
            kim2[path_real[ix + 2][0]][path_real[ix + 2][1]] = kim2[path_real[ix][0]][path_real[ix][1]]
    for x in range(14):
        print(kim2[x])

    # 저장하기 위해 map -> string 변환
    for idx, val in enumerate(path_real):
        views_route += str(val[0])
        views_route += 'a'
        views_route += str(val[1])
        views_route += ']'

    #맵 저장
    for x in range(14):
        for y in range(14):
            views_map += str(kim2[x][y])
            if y != 13:
                views_map += ', '
        views_map += 's'
    mapin.map = views_map
    mapin.save()
    carin.target_x = aaaa
    carin.target_y = bbbb
    carin.car_route = views_route
    carin.car_speed = '30km/h'
    carin.car_code = code
    carin.car_arrive_time = '12분후'
    carin.car_now_situation = '직진'
    carin.car_destination_distance = '10km'
    carin.save()
    return HttpResponse('')