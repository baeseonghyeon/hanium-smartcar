from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from .forms import CarInputForm
from .models import CarInfo, PiInfo, ContainerInfo
from django.http import HttpResponseRedirect, HttpResponse

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