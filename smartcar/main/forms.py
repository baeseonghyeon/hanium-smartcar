from .models import CarInfo
from django.forms import ModelForm
from django import forms


class CarInputForm(ModelForm):
    class Meta:
        model = CarInfo
        fields = ['car_name', 'container_number', 'route', 'speed', 'battery', 'communication', 'driving_mode']


