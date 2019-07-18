from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from .forms import CarInputForm, MainInputForm
from .models import CarInfo, MainInfo
from django.http import HttpResponseRedirect

@csrf_exempt
def Car_input(request):
    form = CarInputForm(request.POST)
    if form.is_valid():
        carin = CarInfo.objects.filter(container=request.POST['container'])
        if len(carin) == 0:
            form.save()
        else:
            carin = CarInfo.objects.get(container=request.POST['container'])
            carin.container = request.POST['container']
            carin.destination = request.POST['destination']
            carin.route = request.POST['route']
            carin.speed = request.POST['speed']
            carin.battery = request.POST['battery']
            carin.communication = request.POST['communication']
            carin.drivingmode = request.POST['drivingmode']
            carin.carnumber = request.POST['carnumber']
            carin.save()
    return HttpResponseRedirect('/')

@csrf_exempt
def Main_input(request):
    form = MainInputForm(request.POST)
    print(form)
    if form.is_valid():
        mainin = MainInfo.objects.filter(portinfo=request.POST['portinfo'])
        print(mainin)
        if len(mainin) == 0:
            form.save()
        else:
            mainin = MainInfo.objects.get(portinfo=request.POST['portinfo'])
            mainin.portinfo = request.POST['portinfo']
            mainin.portmap = request.POST['portmap']
            mainin.save()
    return HttpResponseRedirect('/')

@csrf_exempt
def Car_detail(request):
    num = request.POST['carNumber']
    return render(request, 'car_detail.html', {'carNumber': num})

def bfs(start, goal):
    # 맵의 가로세로. 맵 수정 시 변경
    visit = [[0] * 8 for _ in range(8)]
    queue = []
    path = []
    path_real = []
    dir = [[0, 1], [1, 0], [0, -1], [-1, 0]]
    queue.append(start)
    while queue:
        node = queue.pop(0)
        if node == goal:
            path.reverse()
            temp = path[0][0]
            path_real.append(path[0][1])
            for i in range(len(path)):
                if path[i][1] == temp:
                    path_real.append(path[i][1])
                    temp = path[i][0]
            path_real.append(start)
            path_real.reverse()
            print(path_real)

        x = node[0]
        y = node[1]
        visit[x][y] = 1
        for i in range(4):
            wx = x + dir[i][0]
            wy = y + dir[i][1]
            if visit[wx][wy] == 0 and map[wx][wy] == 1:
                visit[wx][wy] = 1
                queue.append([wx, wy])
                # 부모노드, 현재위치
                path.append([node, [wx,wy]])
