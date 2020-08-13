from .models import CarInfo, PiInfo, ContainerInfo

from rest_framework import serializers, viewsets

class CarSerialalizer(serializers.ModelSerializer):
    class Meta:
        model = CarInfo
        fields = '__all__'


class CarViewSet(viewsets.ModelViewSet):
    queryset = CarInfo.objects.all()
    serializer_class = CarSerialalizer


class PiSerialalizer(serializers.ModelSerializer):
    class Meta:
        model = PiInfo
        fields = '__all__'


class PiViewSet(viewsets.ModelViewSet):
    queryset = PiInfo.objects.all()
    serializer_class = PiSerialalizer


class ContainerSerialalizer(serializers.ModelSerializer):
    class Meta:
        model = ContainerInfo
        fields = '__all__'


class ContainerViewSet(viewsets.ModelViewSet):
    queryset = ContainerInfo.objects.all()
    serializer_class = ContainerSerialalizer