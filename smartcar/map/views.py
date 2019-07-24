from django.shortcuts import render
from .models import MapInfo
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse

@csrf_exempt
def car_point(request):
    mapin = MapInfo.objects.get(id='1')
    park = mapin.map.split('s')
    soon = ''
    xxxx = request.POST['xxx']
    yyyy = request.POST['yyy']
    aaaa = request.POST['aaa']
    bbbb = request.POST['bbb']
    park2 = [[0 for x in range(12)] for y in range(12)]
    for x in range(12):
        park2[x] = park[x].split(', ')
    # park2[0][0] = '0'
    # park2[2][2] = '1'
    # park2[9][9] = '0'
    # park2[11][11] = '0'
    park2[int(xxxx)-1][int(yyyy)-1] = '3'
    park2[int(aaaa)-1][int(bbbb)-1] = '5'
    for x in range(12):
        for y in range(12):
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
    park2 = [[0 for x in range(12)] for y in range(12)]
    for x in range(12):
        park2[x] = park[x].split(', ')
    park2[int(t)-1][int(z)-1] = '5'
    for x in range(12):
        for y in range(12):
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
    park2 = [[0 for x in range(12)] for y in range(12)]
    start1 = ''
    start2 = ''
    destination1 = ''
    destination2 = ''
    for x in range(12):
        park2[x] = park[x].split(', ')
    for x in range(12):
        for y in range(12):
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