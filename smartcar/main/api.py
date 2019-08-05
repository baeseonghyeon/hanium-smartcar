from .models import CarInfo

from rest_framework import serializers, viewsets

class CarSerialalizer(serializers.ModelSerializer):
    class Meta:
        model = CarInfo
        fields = '__all__'


class CarViewSet(viewsets.ModelViewSet):
    queryset = CarInfo.objects.all()
    serializer_class = CarSerialalizer
