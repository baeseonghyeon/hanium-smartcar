from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from .forms import CarInputForm
from .models import CarInfo
from django.http import HttpResponseRedirect, HttpResponse
import tkinter
from tkinter import messagebox

@csrf_exempt
def Car_input(request):
    form = CarInputForm(request.POST)
    if form.is_valid():
        carin = CarInfo.objects
        # else:
        #     carin = CarInfo.objects.get(container=request.POST['container'])
        #     carin.container = request.POST['container']
        #     carin.destination = request.POST['destination']
        #     carin.route = ''
        #     carin.speed = request.POST['speed']
        #     carin.battery = request.POST['battery']
        #     carin.communication = request.POST['communication']
        #     carin.drivingmode = request.POST['drivingmode']
        #     carin.carnumber = request.POST['carnumber']
        #     carin.save()
    return HttpResponseRedirect('/')

# @csrf_exempt
# def Main_input(request):
#     form = MainInputForm(request.POST)
#     if form.is_valid():
#         mainin = MainInfo.objects.filter(portinfo=request.POST['portinfo'])
#         if len(mainin) == 0:
#             form.save()
#         else:
#             mainin = MainInfo.objects.get(portinfo=request.POST['portinfo'])
#             mainin.portinfo = request.POST['portinfo']
#             mainin.save()
#     return HttpResponseRedirect('/')

@csrf_exempt
def Car_detail(request):
    num = request.POST['carNumber']
    return render(request, 'car_detail.html', {'carNumber': num})


