from django.shortcuts import render
from .models import MapInfo
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse
from main.models import CarInfo

@csrf_exempt
def car_point(request):
    mapin = MapInfo.objects.get(id='1')
    park = mapin.map.split('s')
    soon = ''
    xxxx = request.POST['xxx']
    yyyy = request.POST['yyy']
    aaaa = request.POST['aaa']
    bbbb = request.POST['bbb']
    park2 = [[0 for x in range(14)] for y in range(14)]
    for x in range(14):
        park2[x] = park[x].split(', ')
    park2[int(xxxx)][int(yyyy)] = '3'
    park2[int(aaaa)][int(bbbb)] = '5'
    for x in range(14):
        for y in range(14):
            soon += park2[x][y]
            if y != 13:
                soon += ', '
        soon += 's'
    mapin.map = soon
    mapin.save()
    return HttpResponse('')

@csrf_exempt
def reset_xy(request):
    carnumber = request.POST['carnumber']
    xxxx = request.POST['xxx']
    yyyy = request.POST['yyy']
    aaaa = request.POST['aaa']
    bbbb = request.POST['bbb']
    soon = ''

    mapin = MapInfo.objects.get(id='1')
    db_map = MapInfo.objects.get(id='1')

    park2 = [[0 for x in range(14)] for y in range(14)]
    carin = CarInfo.objects.get(carnumber=carnumber)
    park = mapin.map.split('s')
    for x in range(14):
        park2[x] = park[x].split(', ')
    park2[int(carin.now_x)][int(carin.now_y)] = '0'
    park2[int(carin.target_x)][int(carin.target_y)] = '0'
    carin.now_x = ''
    carin.now_y = ''
    carin.target_x = ''
    carin.target_y = ''
    carin.save()
    for x in range(14):
        for y in range(14):
            soon += park2[x][y]
            if y != 13:
                soon += ', '
        soon += 's'
    mapin.map = soon
    mapin.save()
    return HttpResponse('')

@csrf_exempt
def bfs(request):
    db_map = MapInfo.objects.get(id='1') #알고리즘용
    mapin = MapInfo.objects.get(id='1') #저장용
    xxxx = request.POST['xxx']
    yyyy = request.POST['yyy']
    aaaa = request.POST['aaa']
    bbbb = request.POST['bbb']
    soon = ''
    
    #알고리즘 적용할 map
    park = db_map.map.split('s')
    park2 = [[0 for x in range(14)] for y in range(14)]
    for x in range(14):
        for y in range(14):
            park2[x][y] = int(park2[x][y])
            if park2[x][y] == 8:
                park2[x][y] = 1
                
    #db에 저장할 map
    kim = db_map.map.split('s')
    kim2 = [[0 for x in range(14)] for y in range(14)]
    for x in range(14):
        kim2[x] = kim[x].split(', ')
    for x in range(14):
        park2[x] = park[x].split(', ')

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

    #알고리즘 저장
    for idx, val in enumerate(path_real):
        if idx != 0:
            kim2[val[0]][val[1]] = '4'
    # for x in kim2:
    #     print(x)
    for x in range(14):
        for y in range(14):
            soon += str(kim2[x][y])
            if y != 13:
                soon += ', '
        soon += 's'
    mapin.map = soon
    mapin.save()
    return HttpResponse('')