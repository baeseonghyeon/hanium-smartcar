from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect
from django.views.decorators.csrf import csrf_exempt
from .models import emergency
from . import car_main
import requests, json


@csrf_exempt
def main(request):
    print('main on')
    path=request.POST['code']
    car_id = request.POST['car_id']
    emer = request.POST['emergency']
    a = car_main.main(path, car_id, emer)
    a
    return render(request, 'main.html')


@csrf_exempt
def handling_car(request):
    path = request.POST['code']
    a = car_main.handling_car(path)
    a
    return HttpResponseRedirect('/')

@csrf_exempt
def OpenCV(request):
    data = request.GET
    ir_remote = data.dict()
    controll = ir_remote['data']
    a = car_main.change_OpenCV_flag(controll)
    a
    return HttpResponse('/')