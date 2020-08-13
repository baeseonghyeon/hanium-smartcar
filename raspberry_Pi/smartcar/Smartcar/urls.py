from django.contrib import admin
from django.urls import path, include
from .models import emergency
from . import views

urlpatterns = [
    path('', views.main, name='main'),
    path('handling_car', views.handling_car, name='handling_car'),
    path('OpenCV', views.OpenCV, name='OpenCV'),
]
