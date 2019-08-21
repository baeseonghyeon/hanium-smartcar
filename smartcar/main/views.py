from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from .forms import CarInputForm
from .models import CarInfo, PiInfo, ContainerInfo
from django.http import HttpResponseRedirect, HttpResponse

from django.shortcuts import render_to_response
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
def pi_test(request):
    route = request.POST['bbb']
    print(route)
    route1 = route.split(']')
    route2 = [[0 for x in range(len(route1)-1)] for y in range(len(route1)-1)]
    for x in range(len(route1)-1):
        route2[x] = route1[x].split('a')
    index = 0
    i = 0
    move = [0 for x in range(len(route1)-1)]
    for x in range(len(route1)-1):
        for y in range(2):
            route2[x][y] = int(route2[x][y])
    try:
        while True:
            if route2[index + 2][0] == route2[index][0] +1:
                if route2[index + 2][1] == route2[index][1] + 1:
                    if route2[index + 1][0] == route2[index][0]:
                        move[i]='21'
                        index +=2
                        i +=1
                        continue
                    elif route2[index + 1][1] == route2[index][1]:
                        move[i] = '33'
                        index += 2
                        i += 1
                        continue
            if route2[index + 2][0] == route2[index][0] - 1:
                if route2[index + 2][1] == route2[index][1] +1:
                    if route2[index][0] == route2[index + 1][0]:
                        move[i]='31'
                        index +=2
                        i+=1
                        continue
                    elif route2[index +1][1] == route2[index][1]:
                        move[i]='23'
                        index+=2
                        i+=1
                        continue
            if route2[index + 2][0] == route2[index][0] - 1:
                if route2[index + 2][1] == route2[index][1] - 1:
                    if route2[index][0] == route2[index + 1][0]:
                        move[i]='22'
                        index +=2
                        i+=1
                        continue
                    elif route2[index][1] == route2[index + 1][1]:
                        move[i]='34'
                        index+=2
                        i+=1
                        continue
            if route2[index + 2][0] == route2[index][0] + 1:
                if route2[index + 2][1] == route2[index][1] - 1:
                    if route2[index + 1][1] == route2[index][1]:
                        move[i]='24'
                        index += 2
                        i+=1
                        continue
                    elif route2[index + 1][0] == route2[index][0]:
                        move[i]='32'
                        index+=2
                        i+=1
                        continue
            if route2[index][0] == route2[index + 1][0]:
                if route2[index][1] > route2[index + 1][1]:
                    move[i]='13'
                    index +=1
                    i+=1
                    continue
                elif route2[index][1] < route2[index + 1][1]:
                    move[i]='11'
                    index+=1
                    i+=1
                    continue
            if route2[index][1] == route2[index + 1][1]:
                if route2[index + 1][0] > route2[index][0]:
                    move[i]='12'
                    index+=1
                    i+=1
                    continue
                elif route2[index][0] > route2[index + 1][0]:
                    move[i]='14'
                    index+=1
                    i+=1
                    continue
    except IndexError:
        pass
    for x in range(len(move)):
        pi_test2(move[x], request)
        time.sleep(1)
    print("끝")
    return HttpResponseRedirect('/')

def pi_test2(i):
    aa = i
    print(aa)
    return HttpResponseRedirect('/')

@csrf_exempt
def Container_input(request):
    car_id = request.POST['id']
    container_id = request.POST['container_id']
    carin = CarInfo.objects.get(id=car_id)
    carin.container_id = ContainerInfo.objects.get(container_id=container_id)
    carin.save()
    return HttpResponseRedirect('/')

@csrf_exempt
def Car_detail(request):
    num = request.POST['carNumber']
    return render(request, 'car_detail.html', {'carNumber': num})

@csrf_exempt
def position(request):
    carin = CarInfo.objects.get(id=request.POST['car_number'])
    carin.position = request.POST['position']
    print(request.POST['position'])
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