from django.urls import path
from . import views

urlpatterns = [
    path('mapinfo', views.map, name='mapinfo'),
    # path('path', views.bfs, name='path'),
]