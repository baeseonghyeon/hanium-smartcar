from django.shortcuts import render
from .models import MapInfo
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse
from main.models import CarInfo

@csrf_exempt
def car_point(request):
    #맵 2차원 배열로 쪼갬
    mapin = MapInfo.objects.get(id='1')
    park = mapin.map.split('s')
    park2 = [[0 for x in range(14)] for y in range(14)]
    for x in range(14):
        park2[x] = park[x].split(', ')

    #현재 출발, 도착 좌표 입력
    xxxx = request.POST['xxx']
    yyyy = request.POST['yyy']
    aaaa = request.POST['aaa']
    bbbb = request.POST['bbb']
    views_map = ''
    park2[int(xxxx)][int(yyyy)] = '3'
    park2[int(aaaa)][int(bbbb)] = '5'

    #맵에 저장
    for x in range(14):
        for y in range(14):
            views_map += park2[x][y]
            if y != 13:
                views_map += ', '
        views_map += 's'
    mapin.map = views_map
    mapin.save()
    
    #차량정보에 출발, 도착 위치 저장
    mainin = CarInfo.objects.get(id=request.POST['car_number'])
    mainin.now_x = xxxx
    mainin.now_y = yyyy
    mainin.target_x = aaaa
    mainin.target_y = bbbb
    mainin.save()
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
def bfs(request):
    db_map = MapInfo.objects.get(id='1') #알고리즘용
    mapin = MapInfo.objects.get(id='1') #저장용
    id = request.POST['car_number']
    carin = CarInfo.objects.get(id=id)
    xxxx = request.POST['xxx']
    yyyy = request.POST['yyy']
    aaaa = request.POST['aaa']
    bbbb = request.POST['bbb']
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

    #최단거리 알고리즘
    visit = [[0] * 14 for _ in range(14)]
    queue = []
    path = []
    path_real = []
    dir = [[0, 1], [1, 0], [0, -1], [-1, 0]]
    queue.append([start1, start2])
    while queue:
        node = queue.pop(0)
        if node == [destination1, destination2]:
            path.reverse()
            temp = path[0][0]
            path_real.append(path[0][1])
            for i in range(len(path)):
                if path[i][1] == temp:
                    path_real.append(path[i][1])
                    temp = path[i][0]
            path_real.append([start1, start2])
            path_real.reverse()
        x = node[0]
        y = node[1]
        visit[x][y] = 1
        for i in range(4):
            wx = x + dir[i][0]
            wy = y + dir[i][1]
            if visit[wx][wy] == 0 and park2[wx][wy] == 0:
                visit[wx][wy] = 1
                queue.append([wx, wy])
                path.append([node, [wx, wy]])
    print(path_real)

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
    print(value2)
    # # #pi로 전송할 데이터 뽑아내기
    index = 0
    code = ''
    try:
        while True:
            print('--------------------')
            print(value2[index][0], value2[index][1])
            print(index)
            if value2[index + 2][0] == value2[index][0] + 1:
                if value2[index + 2][1] == value2[index][1] + 1:
                    if value2[index + 1][1] > value2[index][1]:
                        print('우회전')
                        index += 2
                        code += '2 '
                        continue
                    elif value2[index + 1][0] > value2[index][0]:
                        print('좌회전')
                        index += 2
                        code += '3 '
                        continue
                elif value2[index + 2][1] == value2[index][1] - 1:
                    if value2[index + 1][1] < value2[index][1]:
                        print('좌회전')
                        index += 2
                        code += '3 '
                        continue
            elif value2[index + 2][0] == value2[index][0] - 1:
                if value2[index + 2][1] == value2[index][1] - 1:
                    if value2[index][1] > value2[index + 1][1]:
                        print('우회전')
                        index += 2
                        code += '2 '
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
    print(code)
    #경로저장
    for idx, val in enumerate(path_real):
        # if idx == 0:   #출발위치 표시
        #     continue
        kim2[val[0]][val[1]] = '4'
        views_route += str(val[0])
        views_route += 'a'
        views_route += str(val[1])
        views_route += ']'
    print(views_route)
    kim2[1][1] = '3'
    #맵 저장
    for x in range(14):
        for y in range(14):
            views_map += str(kim2[x][y])
            if y != 13:
                views_map += ', '
        views_map += 's'
    print(code)
    mapin.map = views_map
    mapin.save()
    carin.car_route = views_route
    carin.car_speed = '30km/h'
    carin.car_code = code
    carin.car_arrive_time = '12분후'
    carin.car_now_situation = '직진'
    carin.car_destination_distance = '10km'
    carin.save()
    return HttpResponse('')