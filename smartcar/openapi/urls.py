from django.urls import path
from . import views
urlpatterns = [
    path('img', views.img, name='img'),
    path('img2', views.img2, name='img2'),
    path('result_ai', views.result_ai, name='result_ai'),
    path('camera', views.camera, name='camera'),
]