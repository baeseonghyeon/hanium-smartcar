from django.shortcuts import render
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from . import split_test

# Create your views here.
def main(request):
    #a = turn.kimtest()
    #a
    return render(request, 'main.html')
@csrf_exempt
def kimtest1(request):
    a = split_test.kimtest()
    a
    print('num1 ok')
    return render(request, 'main.html')

@csrf_exempt
def kimtest2(request):
    print('num2 ok')
    return render(request, '')