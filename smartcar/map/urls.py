from django.urls import path
from . import views

urlpatterns = [
    path('reset', views.reset_xy, name='reset'),
    path('reset2', views.reset_xy2, name='reset2'),
    path('path', views.bfs, name='path'),
    path('refresh', views.refresh, name='refresh'),
]