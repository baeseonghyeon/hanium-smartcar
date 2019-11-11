from .models import MapInfo
from rest_framework import serializers, viewsets

class MapSerialalizer(serializers.ModelSerializer):

    class Meta:
        model = MapInfo
        fields = '__all__'

class MapViewSet(viewsets.ModelViewSet):
    queryset = MapInfo.objects.all()
    serializer_class = MapSerialalizer