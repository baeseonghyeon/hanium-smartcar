from django.contrib import admin
from django.urls import path, include
from . import views

urlpatterns = [
    path('', views.main, name='main'),
    path('kimtest1', views.kimtest1, name='kimtest1'),
    path('kimtest2', views.kimtest2, name='kimtest2'),
]
