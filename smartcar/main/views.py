from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from .forms import CarInputForm
from .models import CarInfo
from django.http import HttpResponseRedirect, HttpResponse
import tkinter
from tkinter import messagebox

@csrf_exempt
def Car_input(request):
    carname = request.POST['carname']
    container = request.POST['container']
    speed = request.POST['speed']
    battery = request.POST['battery']
    communication = request.POST['communication']
    drivingmode = request.POST['drivingmode']
    carin = CarInfo(carname=carname, container=container, speed=speed, battery=battery,
                    communication=communication, drivingmode=drivingmode)
    carin.save()
    return HttpResponseRedirect('/')

@csrf_exempt
def Car_detail(request):
    num = request.POST['carNumber']
    return render(request, 'car_detail.html', {'carNumber': num})


