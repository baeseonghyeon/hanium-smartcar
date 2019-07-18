from .models import MainInfo, CarInfo

from rest_framework import serializers, viewsets

class MainSerialalizer(serializers.ModelSerializer):

    class Meta:
        model = MainInfo
        fields = '__all__'

class MainViewSet(viewsets.ModelViewSet):
    queryset = MainInfo.objects.all()
    serializer_class = MainSerialalizer


class CarSerialalizer(serializers.ModelSerializer):
    class Meta:
        model = CarInfo
        fields = '__all__'


class CarViewSet(viewsets.ModelViewSet):
    queryset = CarInfo.objects.all()
    serializer_class = CarSerialalizer
