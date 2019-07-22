from django.shortcuts import render
from .models import MapInfo
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse
from django.http import JsonResponse
from django.views.generic import ListView

@csrf_exempt
def map(request):
    mapin = MapInfo.objects.get(id='1')
    park = mapin.map.split('s')
    soon = ''
    t = request.POST['xxx']
    z = request.POST['yyy']
    park2 = [[0 for x in range(20)] for y in range(20)]
    for x in range(20):
        park2[x] = park[x].split(', ')
    # park2[18][18] = '0'
    # park2[1][1] = '0'
    park2[int(t)-1][int(z)-1] = '3'
    for x in range(20):
        for y in range(20):
            soon += park2[x][y]
            soon += ', '
        soon += 's'
    mapin.map = soon
    mapin.save()
    return HttpResponse('')