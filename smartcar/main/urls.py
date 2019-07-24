from django.views.generic.base import TemplateView
from django.urls import path
from . import views
app_name = 'main'

urlpatterns = [
    path('', TemplateView.as_view(template_name='main.html'), name='main'),
    path('car_input/', TemplateView.as_view(template_name='car_input.html'), name='car_input'),
    path('car_detail', views.Car_detail, name='car_detail'),
    path('car_input', views.Car_input, name='carinput'),
    path('main_input', views.Main_input, name='maininput'),
    path('xy_input', views.XY_input, name='xy_input')
]