from .models import CarInfo
from django.forms import ModelForm
from django import forms


class CarInputForm(ModelForm):

    class Meta:
        model = CarInfo
        fields = ['carname', 'container', 'route', 'speed', 'battery', 'communication', 'drivingmode']


