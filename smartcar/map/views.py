from django.shortcuts import render
from .models import MapInfo
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse

@csrf_exempt
def car_point(request):
    mapin = MapInfo.objects.get(id='1')
    park = mapin.map.split('s')
    soon = ''
    t = request.POST['xxx']
    z = request.POST['yyy']
    park2 = [[0 for x in range(20)] for y in range(20)]
    for x in range(20):
        park2[x] = park[x].split(', ')
    # park2[1][1] = '0'
    # park2[9][9] = '0'
    # park2[1][3] = '0'
    park2[int(t)-1][int(z)-1] = '3'
    for x in range(20):
        for y in range(20):
            soon += park2[x][y]
            soon += ', '
        soon += 's'
    mapin.map = soon
    mapin.save()
    return HttpResponse('')

@csrf_exempt
def destination_point(request):
    mapin = MapInfo.objects.get(id='1')
    park = mapin.map.split('s')
    soon = ''
    t = request.POST['aaa']
    z = request.POST['bbb']
    park2 = [[0 for x in range(20)] for y in range(20)]
    for x in range(20):
        park2[x] = park[x].split(', ')
    # park2[1][1] = '0'
    # park2[1][2] = '0'
    # park2[1][3] = '0'
    park2[int(t)-1][int(z)-1] = '5'
    for x in range(20):
        for y in range(20):
            soon += park2[x][y]
            soon += ', '
        soon += 's'
    mapin.map = soon
    mapin.save()
    return HttpResponse('')

# @csrf_exempt
# def bfs(request):
#     # 맵의 가로세로. 맵 수정 시 변경
#     visit = [[0] * 20 for _ in range(20)]
#     # start1 = request.POST['']
#     # start2 = request.POST['']
#     # goal1 = request.POST['']
#     # goal2 = request.POST['']
#     start = [2][2]
#     goal = [10][10]
#     queue = []
#     path = []
#     path_real = []
#     dir = [[0, 1], [1, 0], [0, -1], [-1, 0]]
#     queue.append(start)
#     while queue:
#         node = queue.pop(0)
#         if node == goal:
#             path.reverse()
#             temp = path[0][0]
#             path_real.append(path[0][1])
#             for i in range(len(path)):
#                 if path[i][1] == temp:
#                     path_real.append(path[i][1])
#                     temp = path[i][0]
#             path_real.append(start)
#             path_real.reverse()
#             print(path_real)
#
#         x = node[0]
#         y = node[1]
#         visit[x][y] = 1
#         for i in range(4):
#             wx = x + dir[i][0]
#             wy = y + dir[i][1]
#             if visit[wx][wy] == 0 and map[wx][wy] == 1:
#                 visit[wx][wy] = 1
#                 queue.append([wx, wy])
#                 # 부모노드, 현재위치
#                 path.append([node, [wx, wy]])
#     return HttpResponse('')