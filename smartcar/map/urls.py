from django.urls import path
from . import views

urlpatterns = [
    path('car_point', views.car_point, name='car_point'),
    path('destination_point', views.destination_point, name='destination_point'),
    # path('path', views.bfs, name='path'),
]