from django.shortcuts import render
from .models import MapInfo
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse
from django.http import JsonResponse
from django.views.generic import ListView

@csrf_exempt
def map():
    mapin = MapInfo.objects.get(id='1')
    park = mapin.map.split('s')
    fa = []
    for sex in park:
        fa.append(sex)
    print(fa)

