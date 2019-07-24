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
    # park2[18][18] = '0'
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
    park2[int(t)-1][int(z)-1] = '5'
    for x in range(20):
        for y in range(20):
            soon += park2[x][y]
            soon += ', '
        soon += 's'
    mapin.map = soon
    mapin.save()
    return HttpResponse('')

@csrf_exempt
def bfs(request):
    db_map = MapInfo.objects.get(id='1')
    park = db_map.map.split('s')
    park2 = [[0 for x in range(20)] for y in range(20)]
    start1 = ''
    start2 = ''
    destination1 = ''
    destination2 = ''
    for x in range(20):
        park2[x] = park[x].split(', ')
    for x in range(20):
        for y in range(20):
            if park2[x][y] == '3':
                start1 = x
                start2 = y
            if park2[x][y] == '5':
                destination1 = x
                destination2 = y
    print(park2)
    print(start1)
    print(start2)
    print(destination1)
    print(destination2)
    return HttpResponse('')