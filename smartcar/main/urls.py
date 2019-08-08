from django.views.generic.base import TemplateView
from django.urls import path
from . import views
app_name = 'main'

urlpatterns = [
    path('', TemplateView.as_view(template_name='main.html'), name='main'),
    path('car_input/', TemplateView.as_view(template_name='car_input.html'), name='car_input'),
    path('car_detail', views.Car_detail, name='car_detail'),
    path('car_input', views.Car_input, name='carinput'),
    path('container_input', views.Container_input, name='container_input'),
]