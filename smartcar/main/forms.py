from .models import CarInfo, MainInfo
from django.forms import ModelForm
from django import forms


class CarInputForm(ModelForm):
    class Meta:
        model = CarInfo
        fields = ['container', 'destination', 'route', 'speed', 'battery', 'communication', 'drivingmode', 'carnumber']

class MainInputForm(ModelForm):
    class Meta:
        model = MainInfo
        fields = ['portinfo', 'portmap']
