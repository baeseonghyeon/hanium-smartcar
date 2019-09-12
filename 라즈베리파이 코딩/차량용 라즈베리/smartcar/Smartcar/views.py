from django.shortcuts import render
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
#from . import split_test
from . import threading_line

# Create your views here.
@csrf_exempt
def main(request):
#    aaa=request.POST['bbb']
#    aaa = '1 1 1 1 1 2 1 1 2 1 1 1 2 1 2 1 1 1 '
    #a = turn.kimtest()
    aaa = '1 1 '
    a = threading_line.kimtest(aaa)
    a
    return render(request, 'main.html')

@csrf_exempt
def test(request):
    bbb = request.POST['data']
    aaa = '1 '
    a = threading_line.kimtest(aaa)
    a
    return HttpResponse('')


#@csrf_exempt
#def kimtest1(request):
#    a = split_test.kimtest()
#    a
#    print('num1 ok')
#    return render(request, 'main.html')
#
#@csrf_exempt
#def kimtest2(request):
#    print('num2 ok')
#    return render(request, '')