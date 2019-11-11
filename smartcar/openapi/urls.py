from django.urls import path
from . import views
urlpatterns = [
    path('img', views.img, name='img'),
    path('result_ai', views.result_ai, name='result_ai'),
]