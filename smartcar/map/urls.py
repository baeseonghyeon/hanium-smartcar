from django.urls import path
from . import views

urlpatterns = [
    path('car_point', views.car_point, name='car_point'),
    path('reset', views.reset_xy, name='reset'),
    path('path', views.bfs, name='path'),
    path('refresh', views.refresh, name='refresh'),
]